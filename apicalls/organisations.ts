import axios from "axios";
import api from "../constants/api";
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
