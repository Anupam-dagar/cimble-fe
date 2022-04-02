import axios from "axios";
import api from "../constants/api";

export const getOrganisationsApi = async (offset: number, token: string) => {
  return axios.get(`${api.ORGANISATIONS_ROUTE}?offset=${offset}&limit=10`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
