import { default as Entity } from "./Entity";

export default class EntityCollection implements EntityCollectionObject {
    readonly projectId: string;
    readonly kind: string;
    readonly entities: Array<Entity>;
    readonly totalCount: number;
    readonly nextCursor?: string;

    constructor( projectId: string, kind: string, entities: Array<Entity>, totalCount: number, nextCursor?: string ) {
        this.projectId = projectId;
        this.kind = kind;
        this.entities = entities;
        this.totalCount = totalCount;
        this.nextCursor = nextCursor;
    }
}
