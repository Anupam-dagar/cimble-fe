import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { parseDataFromCookie } from "../utils/auth";

const HomeLayout = ({
  children,
  projectId,
}: {
  children: React.ReactNode;
  projectId: string;
}) => {
  return (
    <>
      <Sidebar projectId={projectId} />
      <Navbar />
      {children}
    </>
  );
};

export default HomeLayout;
