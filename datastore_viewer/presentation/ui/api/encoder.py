import base64
import datetime

from google.cloud import datastore


class DataStoreEntityJSONEncoder:
    def _property_type_checker(self, prop):
        # TODO: Handling Geographical points, Array, Object
        if isinstance(prop, str):
            return "string"
        elif isinstance(prop, int):
            return "integer"
        elif isinstance(prop, float):
            return "float"
        elif isinstance(prop, bool):
            return "boolean"
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

    def encode(self, entity, properties):
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

        for property in properties:
            if self._property_type_checker(entity[property]) == "key":
                value = entity[property].path
            elif self._property_type_checker(entity[property]) == "blob":
                value = base64.b64encode(entity[property]).decode('utf-8')
            else:
                value = entity[property]

            entity_dict['entity']['properties'].append(
                {
                    "property_name": property,
                    "value_type": self._property_type_checker(entity[property]),
                    "value": value,
                    "index": True,
                },
            )

        return entity_dict
