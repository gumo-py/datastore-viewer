export namespace Domain {
  export type URLSafeKey = string;
  export interface Entity {
    key: Domain.Key;
    properties: Domain.Property[];
  }

  export interface Key {
    partitionId: { projectId: string };
    path: Domain.Kind[];
  }

  export interface Kind {
    kind: string;
    name?: string;
    id?: number;
  }

  export interface Property {
    index: boolean;
    property_name: string;
    value: any;
    value_type: string;
  }

  export interface IndexedProperty {
    property_name: Exclude<Domain.Property, "index" | "value" | "value_type">;
  }

  export interface Project {
    project_name: string;
  }

  export interface EntityResult {
    URLSafeKey: Domain.URLSafeKey;
    entity: Domain.Entity;
  }

  export interface KindResult {
    indexed_properties: Domain.IndexedProperty[];
    kind: string;
  }
}
