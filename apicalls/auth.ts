import axios from "axios";
import api from "../constants/api";

export const refreshLogin = async (refreshToken: string) => {
  return axios.post(api.REFRESH_TOKEN_ROUTE, null, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
};
