import axios from "axios";
import api from "../constants/api";
import { constructAuthHeader } from "../utils/auth";

export const getProjectsApi = (
  organisationId: string,
  offset: number,
  token: string
) => {
  return axios.get(
    `${api.PROJECTS_ROUTE}${organisationId}?offset=${offset}&limit=10`,
    constructAuthHeader(token)
  );
};
