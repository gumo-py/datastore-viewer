import axios from "axios"
import { Entity, entityFactory, EntityCollection } from '../../domain/Entity'

export async function getEntityList(projectName: string, kind: string, pageNumber: number = 0, rowsPerPage: number = 25) {
    const params = new URLSearchParams();
    if (pageNumber > 0) {
        params.append('page', `${pageNumber + 1}`);
    }
    params.append('perPage', `${rowsPerPage}`);

    const url = `/datastore_viewer/api/projects/${projectName}/kinds/${kind}/entities?${params.toString()}`;
    const res = await axios.get<EntityResults>(url);
    const entities: Array<Entity> = res.data.entityResults.map(
            entityResult => { return entityFactory(entityResult) }
        );
    const entityCollection: EntityCollection = new EntityCollection(
        projectName,
        kind,
        entities,
        res.data.totalCount,
        res.data.pageNumber
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
