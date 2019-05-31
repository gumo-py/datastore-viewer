import flask.views
from collections import defaultdict
from typing import Optional

from google.cloud import datastore


class DatastoreViewerRepository:
    def __init__(self, project_name: str, namespace: Optional[str] = None):
        self._project_name = project_name
        self._namespace = namespace
        self._datastore_client = datastore.Client(
            project=self._project_name,
            namespace=self._namespace
        )

    @property
    def datastore_client(self) -> datastore.Client:
        return self._datastore_client

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


class DatastoreViewer(flask.views.MethodView):
    def get(self):
        repository = DatastoreViewerRepository(
            project_name='jiji-reform'
        )
        return flask.jsonify({
            'project': repository.fetch_project_name(),
            'namespaces': repository.fetch_namespaces(),
            'current_namespace': repository.current_namespace(),
            'kinds': repository.fetch_kinds(),
            'properties': repository.fetch_properties(),
        })


def register_views(blueprint):
    blueprint.add_url_rule(
        '/',
        view_func=DatastoreViewer.as_view(name='dashboard'),
        methods=['GET']
    )
