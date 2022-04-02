import env from "./env";

export default {
  NEXT_LOGIN_URL: "/api/login",
  NEXT_LOGOUT_URL: "/api/logout",
  LOGIN_URL: `${env.BACKEND_URL}/api/auth/login`,
  SIGNUP_URL: `${env.BACKEND_URL}/api/auth/signup`,
  ORGANISATIONS_ROUTE: `${env.BACKEND_URL}/api/organisation/`,
  PROJECTS_ROUTE: `${env.BACKEND_URL}/api/project/`,
  CONFIGURATIONS_ROUTE: `${env.BACKEND_URL}/api/configuration/`,
  REFRESH_TOKEN_ROUTE: `${env.BACKEND_URL}/api/auth/refreshToken/`,
};
