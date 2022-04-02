import axios from "axios";
import api from "../constants/api";
import { ProjectModel } from "../models/project";
import { constructAuthHeader } from "../utils/auth";

export const getProjectsApi = async (
  organisationId: string,
  offset: number,
  token: string
) => {
  return axios.get(
    `${api.PROJECTS_ROUTE}${organisationId}?offset=${offset}&limit=10`,
    constructAuthHeader(token)
  );
};

export const deleteProjectsApi = (id: string, token: string) => {
  return axios.delete(`${api.PROJECTS_ROUTE}${id}`, constructAuthHeader(token));
};

export const createProjectApi = (data: any, token: string) => {
  return axios.post<ProjectModel>(api.PROJECTS_ROUTE, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editProjectApi = (data: any, id: string, token: string) => {
  return axios.put<ProjectModel>(`${api.PROJECTS_ROUTE}${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
