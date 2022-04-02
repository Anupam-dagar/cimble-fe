import axios from "axios";
import api from "../constants/api";
import { constructAuthHeader } from "../utils/auth";

export const getConfigurationsApi = (
  projectId: string,
  offset: number,
  token: string
) => {
  return axios.get(
    `${api.CONFIGURATIONS_ROUTE}${projectId}?offset=${offset}&limit=10`,
    constructAuthHeader(token)
  );
};
