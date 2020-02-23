import Entity from './Entity'
import { Key } from '../Key'
import {
    IntegerProperty, FloatProperty,
    BooleanProperty, DateProperty,
    KeyProperty, StringProperty
} from '../Property'

function makeProperty(propertyJson: PropertyJson){
    switch (propertyJson.value_type) {
        case 'integer':
            return  {
                name: propertyJson.property_name,
                index: propertyJson.index,
                value: new IntegerProperty(propertyJson.value)
            };
        case 'float':
            return  {
                name: propertyJson.property_name,
                index: propertyJson.index,
                value: new FloatProperty(propertyJson.value)
            };
        case 'boolean':
            return  {
                name: propertyJson.property_name,
                index: propertyJson.index,
                value: new BooleanProperty(propertyJson.value)
            };
        case 'timestamp':
            return  {
                name: propertyJson.property_name,
                index: propertyJson.index,
                value: new DateProperty(propertyJson.value)
            };
        case 'key':
            return  {
                name: propertyJson.property_name,
                index: propertyJson.index,
                value: new KeyProperty(propertyJson.value)
            };
        case 'null':
            return  {
                name: propertyJson.property_name,
                index: propertyJson.index,
                value: null
            };
        case 'string':
            return  {
                name: propertyJson.property_name,
                index: propertyJson.index,
                value: new StringProperty(propertyJson.value)
            };
    }
}

export default function entityFactory(entityJson: EntityJson) {
    const projectId: string = entityJson.entity.key.partitionId.projectId;
    const version: number = entityJson.version;
    const key: KeyObject = new Key(entityJson.entity.key.path);
    const properties: Array<any> = [];

    for(let property of entityJson.entity.properties) {
        properties.push(makeProperty(property));
    }

    return new Entity(projectId, version, key, properties);
}

