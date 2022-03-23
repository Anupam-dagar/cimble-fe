import axios from "axios";
import api from "../../constants/api";
import cookie from "cookie";

export default async function handler(
  req: { method: string; body: { email: any; password: any } },
  res: {
    setHeader: (arg0: string, arg1: any) => void;
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: any): void; new (): any };
    };
  }
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
    return;
  }

  const { email, password } = req.body;
  let result;
  try {
    result = (await axios.post(api.LOGIN_URL, { email, password })).data;
  } catch (error: any) {
    res.status(500).json({
      message: error.response?.data?.message ?? `Something went wrong.`,
    });
    return;
  }

  res.setHeader("Set-Cookie", [
    cookie.serialize("token", String(result.token), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
    }),
    cookie.serialize("refreshToken", String(result.refreshToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      path: "/",
    }),
  ]);

  res.status(200).json(result);
}
