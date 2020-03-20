import base64
import datetime
import json
import os
from collections import defaultdict

import flask.views

from datastore_viewer.infrastructure import DatastoreViewerRepository
from datastore_viewer.presentation.ui.api.encoder import DataStoreEntityJSONEncoder


class EntityView(flask.views.MethodView):
    def get(self, project_name: str):
        namespace = flask.request.args.get('namespace')
        repository = DatastoreViewerRepository(
            project_name=project_name,
            namespace=namespace,
        )

        serialized_key = flask.request.args.get('key')
        key_path = json.loads(base64.b64decode(serialized_key))
        key = repository.build_key_by_flat_path(key_path=key_path)
        entity = repository.fetch_entity(key=key)

        return flask.jsonify({
            'project_name': project_name,
            'key':str(key),
            'entity': str(entity)
        })


class ProjectAPIView(flask.views.MethodView):
    def get(self, project_name: str, kind: str):
        per_page = int(flask.request.args.get('perPage', '25'))
        page_number = int(flask.request.args.get('page', '1'))

        encoder = DataStoreEntityJSONEncoder()
        repository = DatastoreViewerRepository(project_name=project_name)

        properties_by_kind = repository.fetch_parent_properties()
        current_kind = kind
        current_kind_properties = properties_by_kind.get(current_kind, [])

        entities, total_count = repository.fetch_entities(
            kind=current_kind,
            per_page=per_page,
            page_number=page_number,
        )

        entities_array = []
        for entity in entities:
            entities_array.append(
                encoder.encode(
                    entity=entity,
                    properties=current_kind_properties
                )
            )

        entities_json = defaultdict(list)
        entities_json['entityResults'] = entities_array

        return flask.jsonify({
            'entityResults': entities_array,
            'pageNumber': page_number,
            'perPage': per_page,
            'totalCount': total_count,
        })


class EntityAPIView(flask.views.MethodView):
    def get(self, project_name: str, kind: str, url_safe_key: str):
        encoder = DataStoreEntityJSONEncoder()
        repository = DatastoreViewerRepository(project_name=project_name)
        key_path = json.loads(base64.b64decode(url_safe_key))
        key = repository.build_key_by_flat_path(key_path=key_path)
        entity = repository.fetch_entity(key=key)

        properties_by_kind = repository.fetch_parent_properties()
        current_kind = kind
        current_kind_properties = properties_by_kind.get(current_kind, [])

        return flask.jsonify({
            "entityResult":
                encoder.encode(
                    entity=entity,
                    properties=current_kind_properties
                )
        })


class KindAPIView(flask.views.MethodView):
    def get(self, project_name: str):
        repository = DatastoreViewerRepository(project_name=project_name)
        properties_by_kind = repository.fetch_parent_properties()

        kinds_json = defaultdict(list)
        kinds_json['kindResults'] = []

        for kind in properties_by_kind:
            kind_properties = properties_by_kind.get(kind, [])
            kind_dict = {
                "kind": kind,
                "indexed_properties": list(map(lambda x: {"property_name": x}, kind_properties))}
            kinds_json['kindResults'].append(kind_dict)

        return flask.jsonify(kinds_json)


class ProjectListAPIView(flask.views.MethodView):
    def get(self):
        return flask.jsonify({
            "projectResult": {
                "project_name": os.environ.get('GOOGLE_CLOUD_PROJECT', '')
            }
        })
