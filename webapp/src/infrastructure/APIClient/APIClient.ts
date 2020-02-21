import axios from "axios"
import { Entity, entityFactory } from '../../domain/Entity'

export interface EntityJson {
    entity: {
        key: {
            partitionId: { projectId: string };
            path: Array<{ kind: string, name:string }>;
        };
        properties: Array<PropertyJson>;
    };
    version: number;
}

export interface PropertyJson {
    index: boolean;
    property_name: string;
    value: string;
    value_type: string;
}

export interface EntityResults {
    entityResults: Array<EntityJson>;
}

export async function getEntityList(projectName: string, kind: string) {
    const url = `http://127.0.0.1:48080/datastore_viewer/api/projects/${projectName}/kind/${kind}/entities`;
    const res = await axios.get<EntityResults>(url);
    const EntityList: Array<Entity> = res.data.entityResults.map(
            entityResult => { return entityFactory(entityResult) }
        );

    return EntityList;
}

export interface EntityResult {
    entityResult: EntityJson;
}

export async function getEntity(projectName: string, encoded_key: string) {
    const url = `http://127.0.0.1:48080/datastore_viewer/api/projects/${projectName}/entity/${encoded_key}`;
    const res = await axios.get<EntityResult>(url);
    return entityFactory(res.data.entityResult);
}


interface KindResults {
    entityResults: Array<{
        kind: string;
        indexed_properties: Array<{
            property_name: string;
            value_type: string;
        }>;
    }>;
}

export async function getKindList(projectName: string) {
    const url = `http://127.0.0.1:48080/datastore_viewer/api/projects/${projectName}/kinds`;
    const res = await axios.get<KindResults>(url);
    return res.data;
}


interface ProjectResults {
    projectResults: Array<{
        project_name: string;
    }>;
}

export async function getProjectList() {
    const url = `http://127.0.0.1:48080/datastore_viewer/api/projects`;
    const res = await axios.get<ProjectResults>(url);
    return res.data;
}