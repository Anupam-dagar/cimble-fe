import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Skeleton,
  Spinner,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import Router from "next/router";
import { ReactElement, useEffect, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import {
  invalidateUserAuthentication,
  parseDataFromCookie,
} from "../../utils/auth";

const Configurations = () => {
  return (
    <Alert
      status="warning"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      position={"absolute"}
      boxShadow="md"
      borderColor="transparent"
      borderWidth="1.5px"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      borderRadius="16px"
      display="flex"
      minH="65px"
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
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        No project selected!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        <Link href={"/projects"}>
          <Button colorScheme={"teal"} mt={2}>
            Select a project to continue
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
};

Configurations.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout projectId={page.props.projectId}>{page}</HomeLayout>;
};

export const getServerSideProps = async (context: {
  query: any;
  req: { headers: { cookie: string } };
}) => {
  const { token, refreshToken, projectId } = parseDataFromCookie(context);

  if (!token) {
    return invalidateUserAuthentication();
  }

  if (projectId) {
    return {
      redirect: {
        destination: `/configurations/${projectId}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Configurations;
