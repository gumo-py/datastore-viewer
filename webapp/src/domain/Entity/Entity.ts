import { Domain } from "../../api-types";
import { KeyObject } from "../Key";
import { PropertyObject } from "../Property";

export interface EntityObject extends Domain.Entity {
  projectId: string;
  URLSafeKey: Domain.URLSafeKey;
  key: KeyObject;
  properties: PropertyObject[];
}
export class Entity implements EntityObject {
  readonly projectId: string;
  readonly URLSafeKey: Domain.URLSafeKey;
  readonly key: KeyObject;
  properties: PropertyObject[];

  constructor(
    projectId: string,
    URLSafeKey: Domain.URLSafeKey,
    key: KeyObject,
    properties: PropertyObject[]
  ) {
    this.projectId = projectId;
    this.URLSafeKey = URLSafeKey;
    this.key = key;
    this.properties = properties;
  }
}
