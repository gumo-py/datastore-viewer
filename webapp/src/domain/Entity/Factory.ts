import Entity from './Entity'
import { Key } from '../Key'
import {
    IntegerProperty, FloatProperty, BooleanProperty,
    DateProperty, KeyProperty, StringProperty,
    NullProperty
} from '../Property'

function makeProperty(propertyJson: PropertyJson) {
    switch (propertyJson.value_type) {
        case 'integer':
            return new IntegerProperty(
                propertyJson.value,
                propertyJson.property_name,
                propertyJson.index
            );

        case 'float':
            return new FloatProperty(
                propertyJson.value,
                propertyJson.property_name,
                propertyJson.index
            );

        case 'boolean':
            return new BooleanProperty(
                propertyJson.value,
                propertyJson.property_name,
                propertyJson.index
            );

        case 'timestamp':
            return new DateProperty(
                propertyJson.value,
                propertyJson.property_name,
                propertyJson.index
            );

        case 'key':
            return new KeyProperty(
                propertyJson.value,
                propertyJson.property_name,
                propertyJson.index
            );

        case 'string':
            return new StringProperty(
                propertyJson.value,
                propertyJson.property_name,
                propertyJson.index
            );

        case 'null':
            return new NullProperty(
                propertyJson.property_name,
                propertyJson.index
            );
    }
}

export default function entityFactory(entityJson: EntityJson) {
    const projectId: string = entityJson.entity.key.partitionId.projectId;
    const version: number = entityJson.version;
    const key: KeyObject = new Key(entityJson.entity.key.path);
    const properties: Array<Property> = [];

    for(let property of entityJson.entity.properties) {
        const attachedProperty = makeProperty(property);
        if(attachedProperty) {
            properties.push(attachedProperty);
        }
    }

    return new Entity(projectId, version, key, properties);
}

