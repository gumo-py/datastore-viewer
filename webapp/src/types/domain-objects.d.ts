// Entity
declare interface EntityObject {
    projectId: string;
    URLSafeKey: string;
    key: KeyObject;
    properties: Array<Property>;
}

declare interface EntityCollectionObject {
    projectId: string;
    kind: string;
    entities: Array<EntityObject>;
    totalCount: number;
    nextCursor?: string;
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
