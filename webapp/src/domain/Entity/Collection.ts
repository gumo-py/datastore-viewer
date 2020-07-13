import { EntityObject } from './Entity';

type PropertyIndex = { index: boolean; name: string };
export class EntityCollection {
  readonly projectId: string;

  readonly kind: string;

  readonly entities: EntityObject[];

  readonly totalCount: number;

  readonly pageNumber: number;

  readonly properties: PropertyIndex[];

  constructor(
    projectId: string,
    kind: string,
    entities: EntityObject[],
    totalCount: number,
    pageNumber: number,
    properties: PropertyIndex[],
  ) {
    this.projectId = projectId;
    this.kind = kind;
    this.entities = entities;
    this.totalCount = totalCount;
    this.pageNumber = pageNumber;
    this.properties = properties;
  }
}
