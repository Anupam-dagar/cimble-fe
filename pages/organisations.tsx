import {
  Box,
  Center,
  Divider,
  Heading,
  SimpleGrid,
  StackDivider,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import cookie from "cookie";
import Router from "next/router";
import OrganisationGridBox from "../components/OrganisationGrid/OrganisationGridBox";
import OrganisationGridCreateBox from "../components/OrganisationGrid/OrganisationGridCreateBox";
import Separator from "../components/Separator/separator";
import api from "../constants/api";

const OrganisationsPage = ({ organisations }: { organisations: any[] }) => {
  return (
    <Center
      bgGradient="linear(to-tr, #7AE7C7, #FFD3BA)"
      w="100%"
      maxWidth="100%"
      h="100vh"
    >
      <Box boxShadow="dark-lg" bg="gray.50" w="6xl" h="3xl" m={4}>
        <Center m={4}>
          <Heading as="h3" size="lg">
            Your Organisations
          </Heading>
        </Center>
        <Separator />
        <Box maxH="90%" overflow={"scroll"}>
          <SimpleGrid
            m={8}
            minChildWidth={180}
            spacing={12}
            overflow={"scroll"}
          >
            {organisations.map((organisation) => {
              return (
                <Box boxShadow="outline" m={2} bg="gray.50" height={180}>
                  <OrganisationGridBox
                    organisationName={organisation.name}
                    numProjects={0}
                  />
                </Box>
              );
            })}
            <Box boxShadow="outline" m={2} bg="gray.50" height={180}>
              <OrganisationGridCreateBox />
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Center>
  );
};

export const getServerSideProps = async (context: {
  req: { headers: { cookie: string } };
}) => {
  let isAuthenticated = false;
  let token = null;
  let refreshToken = null;
  if (context.req.headers.cookie) {
    ({ token, refreshToken } = cookie.parse(context.req.headers.cookie));
    isAuthenticated = !!token;
  }

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const organisations = (
    await axios.get(api.GET_ORGANISATIONS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
  console.log(organisations);
  return {
    props: {
      token,
      refreshToken,
      organisations,
    },
  };
};

export default OrganisationsPage;
