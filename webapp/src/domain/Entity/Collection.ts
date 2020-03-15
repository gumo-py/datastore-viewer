import { default as Entity } from "./Entity";

export default class EntityCollection implements EntityCollectionObject {
    readonly projectId: string;
    readonly kind: string;
    readonly entities: Array<Entity>;
    readonly totalCount: number;
    readonly pageNumber: number;

    constructor( projectId: string, kind: string, entities: Array<Entity>, totalCount: number, pageNumber: number) {
        this.projectId = projectId;
        this.kind = kind;
        this.entities = entities;
        this.totalCount = totalCount;
        this.pageNumber = pageNumber;
    }
}
