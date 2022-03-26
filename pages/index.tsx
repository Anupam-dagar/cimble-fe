import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Flex } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <>
      <Sidebar />
      <Navbar />
    </>
  );
};

export default Home;
