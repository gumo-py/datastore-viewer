import { Domain } from '../../api-types';

export interface KindObject extends Domain.Kind {
  getIdOrName(): string | number;
  toString(): string;
  toLiteral(): string;
}

export class Kind implements KindObject {
  readonly kind: string;

  readonly name: string;

  readonly id: number;

  constructor(path: Domain.Kind) {
    this.kind = path.kind;
    this.name = path.name ? path.name : '';
    this.id = path.id ? path.id : 0;
  }

  getIdOrName(): string | number {
    return this.name ? this.name : this.id;
  }

  toString(): string {
    return this.name
      ? `${this.kind} name:${this.name}`
      : `${this.kind} id:${this.id}`;
  }

  toLiteral(): string {
    return this.name
      ? `${this.kind}, '${this.name}'`
      : `${this.kind}, ${this.id}`;
  }
}
