import axios from "axios";
import { Entity, entityFactory, EntityCollection } from "../../domain/Entity";
import { Response, Request } from "../../api-types";

export type FetchEntitiesParams = Request.Entity.FetchAll;
export type FetchEntitiesResponse = Response.Entity.FetchAll;

export async function fetchEntities(params: FetchEntitiesParams) {
  const defaultRowsPerPage = 25;
  const urlParams = new URLSearchParams();
  if (params.pageNumber) {
    urlParams.append("page", `${params.pageNumber + 1}`);
  }
  if (params.rowsPerPage) {
    urlParams.append("perPage", `${params.rowsPerPage}`);
  } else {
    urlParams.append("perPage", `${defaultRowsPerPage}`);
  }

  const url = `/datastore_viewer/api/projects/${params.projectName}/kinds/${
    params.kind
  }/entities?${urlParams.toString()}`;
  const { data } = await axios.get<FetchEntitiesResponse>(url);

  const entities: Array<Entity> = data.entityResults.map((entityResult) => {
    return entityFactory(entityResult);
  });
  const entityCollection: EntityCollection = new EntityCollection(
    params.projectName,
    params.kind,
    entities,
    data.totalCount,
    data.pageNumber,
    data.properties
  );

  return entityCollection;
}

export type FetchEntityParams = Request.Entity.Fetch;
export type FetchEntityResponse = Response.Entity.Fetch;

export async function fetchEntity(params: FetchEntityParams) {
  const url = `/datastore_viewer/api/projects/${params.projectName}/kinds/${params.kind}/entities/${params.urlSafeKey}`;
  const { data } = await axios.get<FetchEntityResponse>(url);
  return entityFactory(data.entityResult);
}
