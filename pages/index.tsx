import type { NextPage } from "next";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Flex } from "@chakra-ui/react";
import HomeLayout from "../layouts/HomeLayout";
import { ReactElement } from "react";

const Home = () => {
  return (
    <>
      <span>hello</span>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
