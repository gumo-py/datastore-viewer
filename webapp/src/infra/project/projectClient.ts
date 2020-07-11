import axios from "axios";
import { Response } from "../../api-types/response";

export type FetchProjectResponse = Response.Project.Fetch;

export async function fetchProject() {
  const url = `/datastore_viewer/api/projects`;
  const { data } = await axios.get<FetchProjectResponse>(url);
  return data;
}
