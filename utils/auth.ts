import cookie from "cookie";

export const parseDataFromCookie = (context: {
  query: any;
  req: { headers: { cookie: string } };
}) => {
  let isAuthenticated = false;
  let token = null;
  let refreshToken = null;
  let organisation = null;
  let projectId = null;
  if (context.req.headers.cookie) {
    ({ token, refreshToken, organisation, projectId } = cookie.parse(
      context.req.headers.cookie
    ));
    isAuthenticated = !!token;
  }

  return {
    token,
    refreshToken,
    organisation,
    projectId,
  };
};

export const invalidateUserAuthentication = () => {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

export const validateUserAuthentication = () => {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export const constructAuthHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
