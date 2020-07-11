import axios from "axios";
import { Response } from "../../api-types/response";
import { Request } from "../../api-types/request";

export type FetchKindsParams = Request.Kind.FetchAll;
export type FetchKindsResponse = Response.Kind.FetchAll;

export async function fetchKinds(params: FetchKindsParams) {
  const url = `/datastore_viewer/api/projects/${params.projectName}/kinds`;
  const { data } = await axios.get<FetchKindsResponse>(url);
  return data;
}
