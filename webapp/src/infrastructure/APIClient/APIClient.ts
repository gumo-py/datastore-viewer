import axios from "axios"
import { Entity, entityFactory } from '../../domain/Entity'

export async function getEntityList(projectName: string, kind: string) {
    const url = `http://127.0.0.1:48080/datastore_viewer/api/projects/${projectName}/kind/${kind}/entities`;
    const res = await axios.get<EntityResults>(url);
    const EntityList: Array<Entity> = res.data.entityResults.map(
            entityResult => { return entityFactory(entityResult) }
        );

    return EntityList;
}

export async function getEntity(projectName: string, kind: string, nameId: string) {
    const url = `http://127.0.0.1:48080/datastore_viewer/api/projects/${projectName}/kind/${kind}/entity/${nameId}`;
    const res = await axios.get<EntityResult>(url);
    return entityFactory(res.data.entityResult);
}

export async function getKindList(projectName: string) {
    const url = `http://127.0.0.1:48080/datastore_viewer/api/projects/${projectName}/kinds`;
    const res = await axios.get<KindResults>(url);
    return res.data;
}

export async function getProjectList() {
    const url = `http://127.0.0.1:48080/datastore_viewer/api/projects`;
    const res = await axios.get<ProjectResults>(url);
    return res.data;
}