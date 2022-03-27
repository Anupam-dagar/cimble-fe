import {
  Box,
  Button,
  Center,
  Heading,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import cookie from "cookie";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import CreateOrganisationModal from "../components/Modal/CreateOrganisationModal";
import OrganisationGridBox from "../components/OrganisationGrid/OrganisationGridBox";
import OrganisationGridCreateBox from "../components/OrganisationGrid/OrganisationGridCreateBox";
import BlurOverlay from "../components/Overlays/BlurOverlay";
import Separator from "../components/Separator/separator";
import api from "../constants/api";
import { OrganisationModel } from "../models/organisation";
import OrganisationsContext from "../store/organisationsContext";
import {
  invalidateUserAuthentication,
  parseTokenFromCookie,
} from "../utils/auth";

const OrganisationsPage = ({
  organisations,
}: {
  organisations: OrganisationModel[];
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stateOrganisations, setStateOrganisations] = useState(organisations);
  const organisationContext = useContext(OrganisationsContext);

  useEffect(() => {
    organisationContext.setOrganisations(organisations);
  }, []);

  useEffect(() => {
    setStateOrganisations(organisationContext.organisations);
  }, [organisationContext]);

  const selectOrganisation = (id: string) => {
    localStorage.setItem("organisation", id);
    Router.push("/");
  };

  return (
    <>
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
              {stateOrganisations.map((organisation) => {
                return (
                  <Button
                    boxShadow="outline"
                    m={2}
                    bg="gray.50"
                    height={180}
                    _hover={{ bg: "gray.100" }}
                    onClick={() => selectOrganisation(organisation.id)}
                  >
                    <OrganisationGridBox
                      organisationName={organisation.name}
                      numProjects={organisation.projectsCount}
                    />
                  </Button>
                );
              })}
              <Button
                boxShadow="outline"
                m={2}
                bg="gray.50"
                height={180}
                _hover={{ bg: "gray.100" }}
                onClick={onOpen}
              >
                <OrganisationGridCreateBox />
              </Button>
            </SimpleGrid>
          </Box>
        </Box>
      </Center>
      <CreateOrganisationModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};

export const getServerSideProps = async (context: {
  query: any;
  req: { headers: { cookie: string } };
}) => {
  const { token, refreshToken } = parseTokenFromCookie(context);

  if (!token) {
    return invalidateUserAuthentication();
  }

  const organisations = (
    await axios.get(api.ORGANISATIONS_ROUTE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;

  return {
    props: {
      token,
      refreshToken,
      organisations,
    },
  };
};

export default OrganisationsPage;
