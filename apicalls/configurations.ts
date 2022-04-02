import axios from "axios";
import api from "../constants/api";
import { ConfigurationsModel } from "../models/configurations";
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

export const createConfigurationsApi = async (
  projectId: string,
  data: any,
  token: string
) => {
  return axios.post<ConfigurationsModel>(
    `${api.CONFIGURATIONS_ROUTE}${projectId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const editConfigurationsApi = async (
  projectId: string,
  id: string,
  data: any,
  token: string
) => {
  return axios.put<ConfigurationsModel>(
    `${api.CONFIGURATIONS_ROUTE}${projectId}/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
