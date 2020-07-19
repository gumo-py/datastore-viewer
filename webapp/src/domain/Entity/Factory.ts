import { Domain } from '../../api-types';
import { Entity } from './Entity';
import { Key, KeyObject } from '../Key';
import { Property, PropertyObject } from '../Property';

export const entityFactory = (entityResult: Domain.EntityResult) => {
  const { projectId } = entityResult.entity.key.partitionId;
  const { URLSafeKey } = entityResult;
  const key: KeyObject = new Key(entityResult.entity.key);
  const properties: PropertyObject[] = [];

  for (const property of entityResult.entity.properties) {
    const attachedProperty = new Property(property);
    properties.push(attachedProperty);
  }

  return new Entity(projectId, URLSafeKey, key, properties);
};
