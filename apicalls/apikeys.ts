import axios from "axios";
import api from "../constants/api";

export const getApiKeysApi = (
  organisationId: string,
  token: string,
  offset: number
) => {
  return axios.get(
    `${api.API_KEYS_ROUTE}${organisationId}?offset=${offset}&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const revokeApiKeysApi = (
  organisationId: string,
  id: string,
  token: string
) => {
  return axios.delete(`${api.API_KEYS_ROUTE}${organisationId}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createApiKeyApi = (organisationId: string, token: string) => {
  const data = {
    organisationId,
  };
  return axios.post(`${api.API_KEYS_ROUTE}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
