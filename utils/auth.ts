import cookie from "cookie";

export const parseTokenFromCookie = (context: {
  query: any;
  req: { headers: { cookie: string } };
}) => {
  let isAuthenticated = false;
  let token = null;
  let refreshToken = null;
  if (context.req.headers.cookie) {
    ({ token, refreshToken } = cookie.parse(context.req.headers.cookie));
    isAuthenticated = !!token;
  }

  return {
    token,
    refreshToken,
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
