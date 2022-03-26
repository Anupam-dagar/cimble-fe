import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      <Navbar />
      {children}
    </>
  );
};

export default HomeLayout;
