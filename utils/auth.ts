import cookie from "cookie";

export const parseDataFromCookie = (reqCookie?: any) => {
  let isAuthenticated = false;
  let token = null;
  let refreshToken = null;
  let organisation = null;
  let projectId = null;
  if (reqCookie) {
    ({ token, refreshToken, organisation, projectId } =
      cookie.parse(reqCookie));
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

export const setAuthCookies = (
  res: any,
  token: string,
  refreshToken: string
) => {
  res.setHeader("Set-Cookie", [
    cookie.serialize("token", String(token), {
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
    }),
    cookie.serialize("refreshToken", String(refreshToken), {
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
    }),
  ]);
};
