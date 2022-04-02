import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = ({
  projectName,
  organisationName,
}: {
  projectName: string;
  organisationName: string;
}) => {
  const router = useRouter();

  const getNavHeading = () => {
    let heading = "Viewing ";
    if (projectName && organisationName) {
      heading += `${projectName} project in ${organisationName} organisation`;
      return heading;
    }

    if (organisationName && !projectName) {
      heading += `organisation ${organisationName}`;
      return heading;
    }

    return `Welcome to Cimble`;
  };

  const getNavButton = () => {
    const route = router.pathname.split("/")[1];
    switch (route) {
      case "configurations":
        return (
          <Link href="/projects">
            <Button colorScheme="teal" size="md">
              Change Project
            </Button>
          </Link>
        );
      default:
        return (
          <Link href="/organisations">
            <Button colorScheme="teal" size="md">
              Change Organisation
            </Button>
          </Link>
        );
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
      <Heading as="h4" size="md">
        {getNavHeading()}
      </Heading>
      <Spacer />
      {getNavButton()}
    </Flex>
  );
};

export default Navbar;
