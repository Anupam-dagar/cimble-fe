import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Portal,
} from "@chakra-ui/react";
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
      <Navbar
        projectId={projectId}
        projectName={projectName}
        organisationName={organisationName}
      />
      {children}
    </>
  );
};

export default HomeLayout;
