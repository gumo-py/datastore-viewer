import axios from "axios"
import { EntityResult, EntityResults } from "../EntityInterface"
import { Entity } from '../../domain/Entity'
import { Factory } from '../Entity'

export async function getEntityList(projectName: string, kind: string) {
    const url = `http://127.0.0.1:48080/datastore_viewer/api/projects/${projectName}/kind/${kind}/entities`;
    const res = await axios.get<EntityResults>(url);
    const EntityList: Array<Entity> = res.data.entityResults.map(
            entityResult => { return Factory(entityResult) }
        );

    return EntityList;
}

export async function getEntity(projectName: string, encoded_key: string) {
    const url = `http://127.0.0.1:48080/datastore_viewer/api/projects/${projectName}/entity/${encoded_key}`;
    const res = await axios.get<EntityResult>(url);
    return Factory(res.data.entityResult);
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