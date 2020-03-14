declare interface EntityJson {
    entity: {
        key: {
            partitionId: { projectId: string };
            path: Array<{ kind: string, name:string }>;
        };
        properties: Array<PropertyJson>;
    };
    URLSafeKey: string;
}

declare interface PropertyJson {
    index: boolean;
    property_name: string;
    value: string;
    value_type: string;
}

declare interface EntityResults {
    entityResults: Array<EntityJson>;
    totalCount: number;
    nextCursor?: string;
}

declare interface EntityResult {
    entityResult: EntityJson;
}

declare interface KindResults {
    kindResults: Array<KindResult>;
}

declare interface KindResult {
    kind: string;
    indexed_properties: Array<{
        property_name: string;
    }>;
}

declare interface Project {
    project_name: string;
}

declare interface ProjectResult {
    projectResult: Project;
}

