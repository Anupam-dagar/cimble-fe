import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const activeRoute = () => {
    const route = router.pathname;
    switch (route) {
      case "/":
        return "Dashboard";
      case "/projects":
        return "Projects";
      case "/configurations":
        return "Configurations";
      default:
        return null;
    }
  };

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
      top="18px"
      w={{ sm: "calc(100vw - 50px)", xl: "calc(100vw - 75px - 275px)" }}
    >
      <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink>Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="#">{activeRoute()}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
};

export default Navbar;
