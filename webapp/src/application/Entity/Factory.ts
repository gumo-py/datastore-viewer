import { Entity } from '../../domain/Entity'
import { Key, KeyObject } from '../../domain/Key'
import {
    IntegerProperty, FloatProperty,
    BooleanProperty, DateProperty,
    KeyProperty
} from '../../domain/Property'


function makeProperty(propertyJson: any){
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
    }
}

export default function entityFactory(entityJson: any) {
    const projectId: string = entityJson.entity.key.partitionId.projectId;
    const version: number = entityJson.version;
    const key: KeyObject = new Key(entityJson.entity.path);
    const properties: Array<any> = [];

    for(let property of entityJson.entity.properties) {
        properties.push(makeProperty(property));
    }

    return new Entity(projectId, version, key, properties);
}

