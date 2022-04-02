import cookie from "cookie";
import Cookies from "js-cookie";

export const parseDataFromCookie = (reqCookie?: any) => {
  let isAuthenticated = false;
  let token = null;
  let refreshToken = null;
  let organisation = null;
  let projectId = null;
  let projectName = null;
  let organisationName = null;
  if (reqCookie) {
    ({
      token,
      refreshToken,
      organisation,
      projectId,
      projectName,
      organisationName,
    } = cookie.parse(reqCookie));
    isAuthenticated = !!token;
  }

  return {
    token,
    refreshToken,
    organisation,
    projectId,
    projectName,
    organisationName,
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

export const clearCookies = () => {
  Cookies.remove("projectId");
  Cookies.remove("organisation");
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  Cookies.remove("projectName");
  Cookies.remove("organisationName");
};

export const clearCookiesServerSide = (res: any) => {
  res.setHeader("Set-Cookie", [
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    }),
    cookie.serialize("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    }),
    cookie.serialize("organisation", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    }),
    cookie.serialize("projectId", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    }),
    cookie.serialize("projectName", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    }),
    cookie.serialize("organisationName", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    }),
  ]);
};
