import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import HamburgerNavbar from "./HamburgetNavbar";

const Navbar = ({
  projectName,
  organisationName,
  projectId,
}: {
  projectName: string;
  organisationName: string;
  projectId: string;
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
          <Box display={{ base: "none", lg: "block" }}>
            <Link href="/projects">
              <Button colorScheme="teal" size="md">
                Change Project
              </Button>
            </Link>
          </Box>
        );
      default:
        return (
          <Box display={{ base: "none", lg: "block" }}>
            <Link href="/organisations">
              <Button colorScheme="teal" size="md">
                Change Organisation
              </Button>
            </Link>
          </Box>
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
        lg: "30px",
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
      w={{ base: "100%", lg: "calc(100vw - 75px - 265px)" }}
    >
      <Heading as="h4" size="md" display={{ base: "none", lg: "block" }}>
        {getNavHeading()}
      </Heading>
      <Heading as="h4" size="md" display={{ base: "block", lg: "none" }}>
        Cimble
      </Heading>
      <Spacer />
      {getNavButton()}
      <HamburgerNavbar projectId={projectId} />
    </Flex>
  );
};

export default Navbar;
