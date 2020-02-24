// Entity
declare interface EntityObject {
    projectId: string;
    version: number;
    key: KeyObject;
    properties: Array<Property>;
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
    getKind(): string;
}

// Property
declare interface Property {
    value: any;
    name: string;
    index: boolean;
    toStr(): string;
    getType(): string;
}
