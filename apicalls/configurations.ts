import axios from "axios";
import api from "../constants/api";
import { constructAuthHeader } from "../utils/auth";

export const getConfigurationsApi = async (
  projectId: string,
  offset: number,
  token: string
) => {
  return axios.get(
    `${api.CONFIGURATIONS_ROUTE}${projectId}?offset=${offset}&limit=10`,
    constructAuthHeader(token)
  );
};

export const deleteConfigurationsApi = async (
  projectId: string,
  id: string,
  token: string
) => {
  return axios.delete(
    `${api.CONFIGURATIONS_ROUTE}${projectId}/${id}`,
    constructAuthHeader(token)
  );
};
