import { default as Entity } from "./Entity";

interface PropertyIndex {
  index: boolean;
  name: string;
}
export default class EntityCollection implements EntityCollectionObject {
  readonly projectId: string;
  readonly kind: string;
  readonly entities: Array<Entity>;
  readonly totalCount: number;
  readonly pageNumber: number;
  readonly properties: Array<PropertyIndex>;

  constructor(
    projectId: string,
    kind: string,
    entities: Array<Entity>,
    totalCount: number,
    pageNumber: number,
    properties: Array<PropertyIndex>
  ) {
    this.projectId = projectId;
    this.kind = kind;
    this.entities = entities;
    this.totalCount = totalCount;
    this.pageNumber = pageNumber;
    this.properties = properties;
  }
}
