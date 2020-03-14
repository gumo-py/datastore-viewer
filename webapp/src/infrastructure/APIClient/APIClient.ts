import axios from "axios"
import { Entity, entityFactory, EntityCollection } from '../../domain/Entity'

export async function getEntityList(projectName: string, kind: string) {
    const url = `/datastore_viewer/api/projects/${projectName}/kinds/${kind}/entities`;
    const res = await axios.get<EntityResults>(url);
    const entities: Array<Entity> = res.data.entityResults.map(
            entityResult => { return entityFactory(entityResult) }
        );
    const entityCollection: EntityCollection = new EntityCollection(
        projectName,
        kind,
        entities,
        res.data.totalCount,
        res.data.nextCursor
    );

    return entityCollection;
}

export async function getEntity(projectName: string, kind: string, urlSafeKey: string) {
    const url = `/datastore_viewer/api/projects/${projectName}/kinds/${kind}/entities/${urlSafeKey}`;
    const res = await axios.get<EntityResult>(url);
    return entityFactory(res.data.entityResult);
}

export async function getKindList(projectName: string) {
    const url = `/datastore_viewer/api/projects/${projectName}/kinds`;
    const res = await axios.get<KindResults>(url);
    return res.data;
}

export async function getProject() {
    const url = `/datastore_viewer/api/projects`;
    const res = await axios.get<ProjectResult>(url);
    return res.data;
}
