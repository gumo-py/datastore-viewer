export namespace Domain {
  export type URLSafeKey = string;
  export type Entity = {
    key: Domain.Key;
    properties: Domain.Property[];
  };

  export type Key = {
    partitionId: { projectId: string };
    path: Domain.Kind[];
  };

  export type Kind = {
    kind: string;
    name?: string;
    id?: number;
  };

  export type Property = {
    index: boolean;
    property_name: string;
    value: string;
    value_type: string;
  };

  export type IndexedProperty = {
    property_name: Exclude<Domain.Property, "index" | "value" | "value_type">;
  };

  export type Project = {
    project_name: string;
  };

  export type EntityResult = {
    URLSafeKey: Domain.URLSafeKey;
    entity: Domain.Entity;
  };

  export type KindResult = {
    indexed_properties: Domain.IndexedProperty[];
    kind: string;
  };
}
