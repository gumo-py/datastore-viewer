import base64
import json
import os
from collections import defaultdict
from typing import Optional
from logging import getLogger

import google.auth
import requests
from google.cloud import datastore

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

    def fetch_parent_properties(self):
        properties_by_kind = {}

        for kind, props in self.fetch_properties().items():
            result = []
            for prop in props:
                if prop.find('.') >= 0:
                    result.append(prop.split('.')[0])
                else:
                    result.append(prop)
            properties_by_kind[kind] = list(set(result))

        return properties_by_kind

    def fetch_entities(self, kind: str, limit: int = 20, cursor=None):
        query = self.datastore_client.query(kind=kind)
        query_iter = query.fetch(start_cursor=cursor, limit=limit)

        entities = []
        for entity in query_iter:
            entity._serialized_key = base64.b64encode(json.dumps(entity.key.flat_path).encode('utf-8')).decode('utf-8')
            entities.append(entity)

        next_cursor = query_iter.next_page_token
        if len(list(query.fetch(start_cursor=next_cursor, limit=1))) == 0:
            next_cursor = b''

        return (entities, next_cursor)

    def fetch_entity(self, key: datastore.Key):
        return self.datastore_client.get(key)

    def delete(self, key: datastore.Key):
        self.datastore_client.delete(key=key)
        logger.info(f'key = {key} is deleted.')

    def delete_all(self, kind: str):
        query = self.datastore_client.query(kind=kind)
        query.keys_only()

        while True:
            keys = [d.key for d in query.fetch(limit=100)]
            logger.info(keys)
            if len(keys) == 0:
                break
            self.datastore_client.delete_multi(keys)
            logger.info(f'kind={kind} keys ({len(keys)} items) deleted.')
