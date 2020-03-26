import base64
import datetime
from typing import List
from typing import Optional

from google.cloud import datastore
from google.cloud.datastore import Entity


class DataStoreEntityJSONEncoder:
    def _property_type_checker(self, prop):
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
        elif isinstance(prop, list) or isinstance(prop, set):
            return "array"
        elif isinstance(prop, dict):
            return "embedded"
        elif prop is None:
            return "null"
        else:
            return "unknown"

    def _array_value_encode(self, value):
        value_type, value = self._property_encode(value)
        return {"value_type": value_type, "value": value}

    def _property_encode(self, property_value):
        value = property_value
        value_type = self._property_type_checker(property_value)

        if value_type == "key":
            value = property_value.path
        elif value_type == "blob":
            value = base64.b64encode(property_value).decode('utf-8')
        elif value_type == "array":
            value = [self._array_value_encode(v) for v in value]
        elif value_type == "embedded":
            value = {
                "properties": DataStoreEntityJSONEncoder().encode(value, None)["entity"]["properties"]
            }

        return value_type, value

    def encode(self, entity: Entity, property_names: Optional[List[str]]):
        entity_dict = {
            "entity": {
                "key": {
                    "partitionId": {
                        "projectId": entity.key.project if entity and entity.key else None,
                    },
                    "path": entity.key.path if entity and entity.key else None,
                },
                "properties": [],
            },
            "URLSafeKey": entity._serialized_key if hasattr(entity, "_serialized_key") else None
        }

        for prop_name in entity.keys():
            value_type, value = self._property_encode(entity.get(prop_name))

            entity_dict['entity']['properties'].append(
                {
                    "property_name": prop_name,
                    "value_type": value_type,
                    "value": value,
                    "index": prop_name in property_names if property_names else None,
                },
            )

        return entity_dict
