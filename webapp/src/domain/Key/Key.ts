import { Domain } from '../../api-types';
import { Kind } from './Kind';

export interface KeyObject extends Domain.Key {
  getKind(): string;
  getIdOrName(): string | number;
  getParent(): Kind[];
  toString(): string;
  toLiteral(): string;
}

export class Key implements KeyObject {
  readonly path: Kind[] = [];

  readonly partitionId: Domain.Key['partitionId'];

  constructor(key: Domain.Key) {
    this.partitionId = key.partitionId;

    for (const path of key.path) {
      this.path.push(new Kind(path));
    }
  }

  getKind(): string {
    const key = this.path.slice(-1)[0];
    return key.kind;
  }

  getIdOrName(): string | number {
    const key = this.path.slice(-1)[0];
    return key.getIdOrName();
  }

  getParent(): Kind[] {
    const keys = this.path.slice();
    keys.pop();
    return keys;
  }

  toString(): string {
    const key = this.path.slice(-1)[0];
    return key.toString();
  }

  toLiteral(): string {
    let keyLiterals = '';
    if (this.path.length > 1) {
      const literals = this.path.map((path) => {
        return path.toLiteral();
      });
      keyLiterals = literals.join(', ');
    } else {
      keyLiterals = this.path[0].toLiteral();
    }
    return `Key(${keyLiterals})`;
  }
}
