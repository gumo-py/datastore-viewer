// Entity
declare interface EntityObject {
    projectId: string;
    version: number;
    key: KeyObject;
    properties: Array<any>;
}


// Key
declare interface Path {
    readonly kind: string;
    readonly name?: string;
    readonly id?: number;
    getIdOrName(): string | number;
    toString(): string;
    toLiteral(): string;
}

declare interface KeyObject {
    _paths: Array<Path>;
    toString(): string;
    toLiteral(): string;
    getParent(): Array<Path>;
    getIdOrName(): string | number;
}

// Property
declare interface Property<T> {
    toString(): string;
    readonly value: T;
}
