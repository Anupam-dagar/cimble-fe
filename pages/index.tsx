import HomeLayout from "../layouts/HomeLayout";
import { ReactElement } from "react";
import { Flex } from "@chakra-ui/react";

const Home = () => {
  return (
    <Flex
      bg={"white"}
      position={"absolute"}
      boxShadow="md"
      borderColor="transparent"
      borderWidth="1.5px"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      borderRadius="16px"
      display="flex"
      minH="65px"
      justifyContent={{ xl: "left" }}
      lineHeight="25.6px"
      mx="auto"
      pb="8px"
      right={{
        sm: "20px",
        xl: "30px",
      }}
      px={{
        sm: "15px",
        md: "30px",
      }}
      ps={{
        xl: "12px",
      }}
      pt={{
        sm: "16px",
        xl: "8px",
      }}
      top="120px"
      w={{ sm: "calc(100vw - 50px)", xl: "calc(100vw - 75px - 275px)" }}
    >
      Dashboard
    </Flex>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
