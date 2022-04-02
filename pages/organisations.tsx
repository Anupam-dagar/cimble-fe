import {
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import { ReactElement, useContext, useEffect, useState } from "react";
import { refreshLogin, refreshNextLogin } from "../apicalls/auth";
import {
  deleteOrganisationsApi,
  getOrganisationsApi,
} from "../apicalls/organisations";
import CreateOrganisationModal from "../components/Modal/CreateOrganisationModal";
import PaginationBar from "../components/Pagination/PaginationBar";
import ActionColumn from "../components/Tables/ActionColumn";
import { TableType } from "../constants/enum";
import HomeLayout from "../layouts/HomeLayout";
import { OrganisationModel } from "../models/organisation";
import OrganisationsContext from "../store/organisationsContext";
import {
  invalidateUserAuthentication,
  parseDataFromCookie,
  setAuthCookies,
} from "../utils/auth";

const Organisations = ({
  organisations,
  currentPage,
  totalPages,
}: {
  organisations: OrganisationModel[];
  currentPage: number;
  totalPages: number;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stateOrganisations, setStateOrganisations] = useState(organisations);
  const organisationContext = useContext(OrganisationsContext);

  useEffect(() => {
    organisationContext.setOrganisations(organisations);
  }, [organisations]);

  useEffect(() => {
    setStateOrganisations(organisationContext.organisations);
  }, [organisationContext]);

  const selectOrganisation = (id: string) => {
    Cookies.set("organisation", id);
    Cookies.remove("projectId");
    Router.push("/projects");
  };

  const deleteOrganisation = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    try {
      await deleteOrganisationsApi(id, Cookies.get("token") ?? "");
    } catch (err: any) {
      console.log(err.response.status);
      if (err.response.status === 403) {
        try {
          const refreshLoginResult = (await refreshNextLogin()).data;
          await deleteOrganisationsApi(id, refreshLoginResult.refreshToken);
        } catch (err: any) {
          throw err;
        }
      }
    }
    const organisations = stateOrganisations.filter((organisation) => {
      return organisation.id !== id;
    });
    setStateOrganisations(organisations);
  };

  const changePage = (
    e: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => {
    e.stopPropagation();
    Router.push(`/organisations?page=${newPage}`);
  };

  return (
    <>
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
        <Table variant="unstyled" size={"lg"}>
          <TableCaption>
            Total {stateOrganisations.length} Organisations
          </TableCaption>
          <Thead>
            <Tr>
              <Th>S. No.</Th>
              <Th>Name</Th>
              <Th isNumeric>Projects</Th>
              <Th>Date of Creation</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stateOrganisations.map((organisation, index) => {
              return (
                <Tr
                  _hover={{ bg: "gray.100", cursor: "pointer" }}
                  onClick={() => selectOrganisation(organisation.id)}
                >
                  <Td>{index + 1}</Td>
                  <Td>{organisation.name}</Td>
                  <Td isNumeric>{organisation.projectsCount ?? 0}</Td>
                  <Td>{new Date(organisation.createdAt).toDateString()}</Td>
                  <Td>
                    <ActionColumn
                      id={organisation.id}
                      onDelete={deleteOrganisation}
                      type={TableType.ORGANISATIONS}
                      name={organisation.name}
                    />
                  </Td>
                </Tr>
              );
            })}
            <Tr>
              <Td
                bg={"teal.200"}
                borderRadius={16}
                colSpan={5}
                _hover={{ bg: "teal.300", cursor: "pointer" }}
                textAlign="center"
                onClick={onOpen}
              >
                Create Organisation
              </Td>
            </Tr>
            <Tr>
              <Td colSpan={5} textAlign="center">
                <PaginationBar
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={changePage}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
      <CreateOrganisationModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};

Organisations.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout projectId={page.props.projectId}>{page}</HomeLayout>;
};

export const getServerSideProps = async (context: any) => {
  const { token, refreshToken } = parseDataFromCookie(
    context.req.headers.cookie
  );

  if (!token || !refreshToken) {
    return invalidateUserAuthentication();
  }

  let page = context.query.page;
  let offset = 0;
  if (page) {
    page = parseInt(page);
    offset = (page - 1) * 10;
  }

  let result;
  let isError = false;
  try {
    result = (await getOrganisationsApi(offset, token)).data;
  } catch (err: any) {
    if (err.response.status === 403) {
      try {
        const refreshLoginResult = (await refreshLogin(refreshToken)).data;
        setAuthCookies(
          context.res,
          refreshLoginResult.token,
          refreshLoginResult.refreshToken
        );
        result = (await getOrganisationsApi(offset, refreshLoginResult.token))
          .data;
      } catch (err: any) {
        isError = true;
      }
    }
  }

  return {
    props: {
      token,
      refreshToken,
      organisations: result?.organisations ?? [],
      currentPage: page ?? 1,
      totalPages: result?.page?.totalPages ?? 1,
      isError,
    },
  };
};

export default Organisations;
