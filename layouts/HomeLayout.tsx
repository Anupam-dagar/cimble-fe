import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { parseDataFromCookie } from "../utils/auth";

const HomeLayout = ({
  children,
  projectId,
  projectName,
  organisationName,
}: {
  children: React.ReactNode;
  projectId: string;
  projectName: string;
  organisationName: string;
}) => {
  return (
    <>
      <Sidebar projectId={projectId} />
      <Navbar projectName={projectName} organisationName={organisationName} />
      {children}
    </>
  );
};

export default HomeLayout;
