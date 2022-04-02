import axios from "axios";
import api from "../constants/api";
import { OrganisationModel } from "../models/organisation";
import { constructAuthHeader } from "../utils/auth";

export const getOrganisationsApi = async (offset: number, token: string) => {
  return axios.get(`${api.ORGANISATIONS_ROUTE}?offset=${offset}&limit=10`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteOrganisationsApi = async (id: string, token: string) => {
  return axios.delete(
    `${api.ORGANISATIONS_ROUTE}${id}`,
    constructAuthHeader(token)
  );
};

export const createOrganisationApi = async (data: any, token: string) => {
  return axios.post<OrganisationModel>(api.ORGANISATIONS_ROUTE, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editOrganisationApi = async (
  id: string,
  data: any,
  token: string
) => {
  return axios.put<OrganisationModel>(`${api.ORGANISATIONS_ROUTE}${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
