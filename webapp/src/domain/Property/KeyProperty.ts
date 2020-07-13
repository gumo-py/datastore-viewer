import { Kind, KeyObject } from "../Key";

type KeyProp = Omit<KeyObject, "partitionId">;

export class KeyProperty implements KeyProp {
  readonly path: Kind[] = [];

  constructor(value: Kind[]) {
    for (let path of value) {
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
