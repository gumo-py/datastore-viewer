import json
import base64
import datetime
import os

import requests
import flask.views
import urllib.parse

from collections import defaultdict

from typing import Optional
from logging import getLogger

from google.cloud import datastore
import google.auth.credentials

logger = getLogger(__name__)


class EmulatorCreds(google.auth.credentials.Credentials):
    def __init__(self):
        self.token = b'secret'
        self.expiry = None

    @property
    def valid(self):
        return True

    def refresh(self, _):
        raise RuntimeError('Should never be refreshed.')


class DatastoreViewerRepository:
    def __init__(self, project_name: str, namespace: Optional[str] = None):
        self._project_name = project_name
        self._namespace = namespace
        self._datastore_client = self._build_client()

    def _build_client(self) -> datastore.Client:
        if 'DATASTORE_EMULATOR_HOST' in os.environ:
            emulator_credentials = EmulatorCreds()
            return datastore.Client(
                project=self._project_name,
                namespace=self._namespace,
                credentials=emulator_credentials,
                _http=requests.Session(),
            )
        else:
            return datastore.Client(
                project=self._project_name,
                namespace=self._namespace
            )

    @property
    def datastore_client(self) -> datastore.Client:
        return self._datastore_client

    def build_key_by_flat_path(self, key_path):
        return self.datastore_client.key(*key_path)

    def fetch_project_name(self):
        return self.datastore_client.project

    def fetch_namespaces(self):
        """fetch namespaces
        https://cloud.google.com/datastore/docs/concepts/metadataqueries#datastore-datastore-namespace-run-query-python
        :return:
        """
        query = self.datastore_client.query(kind='__namespace__')
        query.keys_only()

        all_namespaces = [
            entity.key.id_or_name if entity.key.id_or_name != 1 else None
            for entity in query.fetch()
        ]
        return all_namespaces

    def current_namespace(self):
        return self.datastore_client.namespace

    def fetch_kinds(self):
        query = self.datastore_client.query(kind='__kind__')
        query.keys_only()

        kinds = [entity.key.id_or_name for entity in query.fetch()]
        return kinds

    def fetch_properties(self):
        query = self.datastore_client.query(kind='__property__')
        query.keys_only()

        properties_by_kind = defaultdict(list)

        for entity in query.fetch():
            kind = entity.key.parent.name
            property_ = entity.key.id_or_name
            properties_by_kind[kind].append(property_)

        return properties_by_kind

    def fetch_entities(self, kind: str, limit: int = 20):
        query = self.datastore_client.query(kind=kind)

        entities = []
        for entity in query.fetch(limit=limit):
            entity._serialized_key = base64.b64encode(json.dumps(entity.key.flat_path).encode('utf-8')).decode('utf-8')
            entities.append(entity)

        return entities

    def delete(self, key: datastore.Key):
        self.datastore_client.delete(key=key)
        logger.info(f'key = {key} is deleted.')


class DashboardView(flask.views.MethodView):
    def get(self):
        project_name = flask.request.args.get('project_name')
        if project_name is not None and len(project_name) > 0:
            return flask.redirect(f'/projects/{project_name}')

        return flask.render_template(
            'dashboard.html'
        )


class ProjectView(flask.views.MethodView):
    def _build_redirect_path(self, **kwargs):
        doc = {}
        for k, v in flask.request.args.items():
            doc[k] = v
        doc.update(kwargs)

        return f'{flask.request.path}?{urllib.parse.urlencode(doc)}'

    def get(self, project_name: str):
        namespace = flask.request.args.get('namespace')
        repository = DatastoreViewerRepository(
            project_name=project_name,
            namespace=namespace,
        )

        current_namespace = repository.current_namespace()
        namespaces = repository.fetch_namespaces()
        kinds = repository.fetch_kinds()
        properties_by_kind = repository.fetch_properties()

        current_kind = flask.request.args.get('kind')
        if current_kind is None and len(kinds) > 0:
            return flask.redirect(self._build_redirect_path(
                kind=kinds[0],
            ))

        current_kind_properties = properties_by_kind[current_kind]

        entities = repository.fetch_entities(
            kind=current_kind,
            limit=20
        )

        return flask.render_template(
            'project_dashboard.html',
            project_name=project_name,
            namespaces=namespaces,
            current_namespace=current_namespace,
            kinds=kinds,
            current_kind=current_kind,
            current_kind_properties=current_kind_properties,
            entities=entities,
        )

    def post(self, project_name: str):
        namespace = flask.request.args.get('namespace')
        repository = DatastoreViewerRepository(
            project_name=project_name,
            namespace=namespace,
        )

        action = flask.request.form.get('action')
        serialized_key = flask.request.form.get('key')
        logger.info(f'action = {action}, key = {serialized_key}')
        if action == 'delete' and serialized_key is not None:
            self._delete_entity(
                repository=repository,
                serialized_key=serialized_key
            )

        return flask.redirect(self._build_redirect_path(t=datetime.datetime.utcnow().timestamp()))

    def _delete_entity(self, repository, serialized_key: str):
        key_path = json.loads(base64.b64decode(serialized_key))
        key = repository.build_key_by_flat_path(key_path=key_path)
        repository.delete(key)


def register_views(blueprint):
    blueprint.add_url_rule(
        '/',
        view_func=DashboardView.as_view(name='dashboard'),
        methods=['GET']
    )

    blueprint.add_url_rule(
        '/projects/<string:project_name>',
        view_func=ProjectView.as_view(name='project_view'),
        methods=['GET', 'POST']
    )
