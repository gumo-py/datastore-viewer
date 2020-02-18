export interface EntityInterface {
    entity: {
        key: {
            partitionId: { projectId: string };
            path: Array<{ kind: string, name:string }>;
        };
        properties: Array<Property>;
    };

    version: number;
}

export interface Property {
    index: boolean;
    property_name: string;
    value: string;
    value_type: string;
}

export interface EntityResults {
    entityResults: Array<EntityInterface>;
}

export interface EntityResult {
    entityResult: EntityInterface;
}