import { Domain } from "../../api-types";

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
    this.name = path.name ? path.name : "";
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

export interface KeyObject extends Domain.Key {
  getKind(): string;
  getIdOrName(): string | number;
  getParent(): Kind[];
  toString(): string;
  toLiteral(): string;
}

export class Key implements KeyObject {
  readonly path: Kind[] = [];
  readonly partitionId: Domain.Key["partitionId"];

  constructor(key: Domain.Key) {
    this.partitionId = key.partitionId;

    for (let path of key.path) {
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
    let keyLiterals = "";
    if (this.path.length > 1) {
      const literals = this.path.map((path) => {
        return path.toLiteral();
      });
      keyLiterals = literals.join(", ");
    } else {
      keyLiterals = this.path[0].toLiteral();
    }
    return `Key(${keyLiterals})`;
  }
}
