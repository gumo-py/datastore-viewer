import axios from "axios";
import { Response, Request } from "../../api-types";

export type FetchKindsParams = Request.Kind.FetchAll;
export type FetchKindsResponse = Response.Kind.FetchAll;

export async function fetchKinds(params: FetchKindsParams) {
  const url = `/datastore_viewer/api/projects/${params.projectName}/kinds`;
  const { data } = await axios.get<FetchKindsResponse>(url);
  return data;
}
