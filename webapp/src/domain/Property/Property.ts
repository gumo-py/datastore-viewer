import { Moment } from 'moment';
import moment from 'moment-timezone';
import { Domain } from '../../api-types';
import { KeyProperty } from './KeyProperty';

type ArrayPropertyMember = Exclude<Domain.Property, 'index' | 'roperty_name'>;

export interface PropertyObject extends Domain.Property {
  getType(): string;
  toStr(): string;
}

export class Property implements PropertyObject {
  index: boolean;

  property_name: string;

  value: any;

  value_type: string;

  constructor(property: Domain.Property) {
    this.index = property.index;
    this.property_name = property.property_name;
    this.value = Property.setValue(property.value, property.value_type);
    this.value_type = property.value_type;
  }

  static setValue(value: any, value_type: string): any {
    switch (value_type) {
      case 'integer':
        return parseInt(value, 10);
      case 'float':
        return parseFloat(value);
      case 'boolean':
        return value === 'true';
      case 'timestamp':
        return moment(value).tz(moment.tz.guess());
      case 'key':
        return new KeyProperty(value);
      case 'array':
        return value.map((prop: ArrayPropertyMember) => {
          return prop.value;
        });
      case 'null':
        return 'Null';
      default:
        return value;
    }
  }

  // TODO: Handling Geographical points, Array, Object
  getType(): string {
    switch (this.value_type) {
      case 'integer':
        return 'Integer';
      case 'float':
        return 'Float';
      case 'boolean':
        return 'Boolean';
      case 'timestamp':
        return 'Date';
      case 'key':
        return 'Key';
      case 'string':
        return 'String';
      case 'blob':
        return 'Blob';
      case 'array':
        return 'Array';
      case 'embedded':
        return 'Embedded';
      case 'null':
        return 'Null';
      default:
        return 'Unknown';
    }
  }

  toStr(): string {
    switch (this.value_type) {
      case 'timestamp':
        return (this.value as Moment).format('YYYY-MM-DD (hh:mm:ss.SSS) z');
      case 'key':
        return (this.value as KeyProperty).toLiteral();
      case 'string':
        return this.value;
      case 'array':
        return String(`[${this.value.join(',')}]`);
      case 'embedded':
        return JSON.stringify(this.value);
      case 'null':
        return 'Null';
      default:
        return String(this.value);
    }
  }
}
