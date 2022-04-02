import cookie from "cookie";
import { clearCookiesServerSide } from "../../utils/auth";

export default async (
  req: { method: string },
  res: {
    setHeader: (arg0: string, arg1: string[]) => void;
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): void; new (): any };
    };
  }
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
    return;
  }

  clearCookiesServerSide(res);

  res.status(200).json({ message: "Logout Successfully" });
};
