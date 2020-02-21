interface Path {
    readonly kind: string;
    readonly name?: string;
    readonly id?: number;
    getIdOrName(): string | number;
    toString(): string;
    toLiteral(): string;
}

class KeyPath implements Path {
    readonly kind: string;
    readonly name: string;
    readonly id: number;

    constructor(path: any) {
        this.kind = path.kind;
        this.name = path.name ? path.name : null;
        this.id = path.id ? path.id : null;
    }

    getIdOrName(): string | number {
        if (this.name) {
            return this.name;
        } else {
            return this.id;
        }
    }

    toString(): string {
        if(this.name) {
            return `${this.kind} name:${this.name}`;
        }else {
            return `${this.kind} id:${this.id}`;
        }
    }

    toLiteral(): string {
        if(this.name) {
            return `${this.kind} ${this.name}`;
        }else {
            return `${this.kind} ${this.id}`;
        }
    }
}

export interface KeyObject {
    _paths: Array<Path>;
    toString(): string;
    toLiteral(): string;
    getParent(): Array<Path>;
    getIdOrName(): string | number;
}

export class Key implements KeyObject {
    _paths: Array<Path> = [];

    constructor(keyObject: any) {
        for(let path of keyObject) {
            this._paths.push(new KeyPath(path));
        }
    }

    getIdOrName(): string | number {
        const key = this._paths.slice(-1)[0];
        return key.getIdOrName();
    }

    getParent(): Array<Path> {
        const keys = this._paths.slice();
        keys.pop();
        return keys;
    }

    toString(): string {
        const key = this._paths.slice(-1)[0];
        return key.toString();
    }

    toLiteral(): string {
        let keyLiterals = '';
        if(this._paths.length > 1) {
            for(let path of this._paths) {
                keyLiterals += path.toLiteral();
            }
        }else {
            keyLiterals = this._paths[0].toLiteral();
        }
        return `Key(${keyLiterals})`;
    }
}
