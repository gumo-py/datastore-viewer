import base64
import datetime

from google.cloud import datastore


class DataStoreEntityJSONEncoder:
    def _property_type_checker(self, prop):
        # TODO: Handling Geographical points, Array, Object
        if isinstance(prop, str):
            return "string"
        elif isinstance(prop, bool):
            return "boolean"
        elif isinstance(prop, int):
            return "integer"
        elif isinstance(prop, float):
            return "float"
        elif isinstance(prop, datetime.datetime):
            return "timestamp"
        elif isinstance(prop, datastore.Key):
            return "key"
        elif isinstance(prop, bytes):
            return "blob"
        elif prop is None:
            return "null"
        else:
            return "unknown"

    def encode(self, entity, property_names):
        entity_dict = {
            "entity": {
                "key": {
                    "partitionId": {
                        "projectId": entity.key.project
                    },
                    "path": entity.key.path
                },
                "properties": [],
            },
            "URLSafeKey": entity._serialized_key
        }

        for prop_name in entity.keys():
            value = entity.get(prop_name)
            value_type = self._property_type_checker(entity.get(prop_name))

            if value_type == "key":
                value = entity[prop_name].path
            elif value_type == "blob":
                value = base64.b64encode(entity[prop_name]).decode('utf-8')

            entity_dict['entity']['properties'].append(
                {
                    "property_name": prop_name,
                    "value_type": value_type,
                    "value": value,
                    "index": prop_name in property_names,
                },
            )

        return entity_dict
