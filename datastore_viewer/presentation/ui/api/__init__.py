import base64
import datetime
import json
import os
import uuid
from collections import defaultdict

import flask.views

from datastore_viewer.infrastructure import DatastoreViewerRepository
from datastore_viewer.infrastructure import get_client
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
                    property_names=current_kind_properties
                )
            )

        entities_json = defaultdict(list)
        entities_json['entityResults'] = entities_array

        property_names = set()
        for entity in entities:
            property_names.update(entity.keys())

        property_names = sorted(property_names)

        entity_properties = []
        for name in property_names:
            entity_properties.append({
                "name": name,
                "index": name in current_kind_properties,
            })

        return flask.jsonify({
            'entityResults': entities_array,
            'pageNumber': page_number,
            'perPage': per_page,
            'totalCount': total_count,
            'properties': entity_properties,
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
                    property_names=current_kind_properties
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


class SampleDataAPIView(flask.views.MethodView):
    @staticmethod
    def _serialized_doc(doc) -> str:
        doc_ = {}
        for k, v in doc.items():
            doc_[k] = repr(v)
        return json.dumps(doc_, ensure_ascii=True, indent=4)

    def post(self):
        from google.cloud import datastore

        client = get_client(project_name=os.environ.get('GOOGLE_CLOUD_PROJECT', ''))

        user1 = datastore.Entity(key=client.key("User"))
        user1.update({
            "name": "User Name",
            "float": 3.141592,
            "int": 42,
            "false": False,
            "true": True,
            "null": None,
            "datetime": datetime.datetime.utcnow(),
        })
        user1["serialized"] = self._serialized_doc(user1)
        client.put(user1)

        user2 = datastore.Entity(key=client.key("User", str(uuid.uuid4())))
        user2.update({
            "full_name": "User Full Name",
            "birthday": datetime.datetime.utcnow(),
        })
        user2["serialized"] = self._serialized_doc(user2)
        client.put(user2)

        profile1 = datastore.Entity(key=client.key("Profile"), exclude_from_indexes=("description",))
        profile1.update({
            "user_key": user2.key,
            "description": "this is description text"
        })
        profile1["serialized"] = self._serialized_doc(profile1)
        client.put(profile1)

        bulk_objects = []
        for i in range(100):
            bulk = datastore.Entity(key=client.key("Bulk", str(uuid.uuid4())))
            bulk.update({
                "value": str(uuid.uuid4()),
                "timestamp": datetime.datetime.utcnow(),
            })
            bulk["serialized"] = self._serialized_doc(bulk)
            bulk_objects.append(bulk)
        client.put_multi(bulk_objects)

        setting = datastore.Entity(key=client.key("Setting", str(uuid.uuid4())), exclude_from_indexes=("value",))
        setting.update({"value": "this is excluded from indexes"})
        client.put(setting)

        embedded = datastore.Entity(key=client.key("Embedded", str(uuid.uuid4())))
        embedded.update({
            "embedded_property": {
                "name": "NAME",
                "integer": 42,
                "float": 3.141592,
                "datetime": datetime.datetime.utcnow(),
            }
        })
        embedded["serialized"] = self._serialized_doc(embedded)
        client.put(embedded)

        array = datastore.Entity(key=client.key("SampleArray", str(uuid.uuid4())))
        array.update({
            "string_array": ["this", "is", "a", "pen"],
            "integer_array": [1, 2, 3, 5, 7, 11],
            "float_array": [1.41421, 2.2362],
        })
        embedded["serialized"] = self._serialized_doc(array)
        client.put(array)

        new_kind = datastore.Entity(key=client.key(f"z{datetime.datetime.utcnow().strftime('%Y%m%d-%H%M%S')}"))
        new_kind.update({"value": datetime.datetime.utcnow()})
        client.put(new_kind)

        return flask.jsonify({"ok": True})
