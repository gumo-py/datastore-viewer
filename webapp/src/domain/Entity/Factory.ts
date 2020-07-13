import { Domain } from "../../api-types";
import { Entity } from "./Entity";
import { Key, KeyObject } from "../Key";
import { Property, PropertyObject } from "../Property";

export const entityFactory = (entityResult: Domain.EntityResult) => {
  const projectId: string = entityResult.entity.key.partitionId.projectId;
  const URLSafeKey: string = entityResult.URLSafeKey;
  const key: KeyObject = new Key(entityResult.entity.key);
  const properties: PropertyObject[] = [];

  for (let property of entityResult.entity.properties) {
    const attachedProperty = new Property(property);
    if (attachedProperty) {
      properties.push(attachedProperty);
    }
  }

  return new Entity(projectId, URLSafeKey, key, properties);
};
