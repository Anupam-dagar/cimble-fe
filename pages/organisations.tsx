import {
  Table,
  TableCaption,
  TableContainer,
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
import HomeFlexCard from "../components/Cards/HomeFlexCard";
import CreateOrganisationModal from "../components/Modal/CreateOrganisationModal";
import PaginationBar from "../components/Pagination/PaginationBar";
import ActionColumn from "../components/Tables/ActionColumn";
import { TableType } from "../constants/enum";
import HomeLayout from "../layouts/HomeLayout";
import { OrganisationModel } from "../models/organisation";
import OrganisationsContext from "../store/organisationsContext";
import {
  clearCookies,
  clearCookiesServerSide,
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

  const selectOrganisation = (id: string, organisationName: string) => {
    Cookies.set("organisation", id);
    Cookies.set("organisationName", organisationName);
    Cookies.remove("projectId");
    Cookies.remove("projectName");
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
          let refreshLoginResult;
          try {
            refreshLoginResult = (await refreshNextLogin()).data;
          } catch (err: any) {
            clearCookies();
            Router.replace("/login");
            return;
          }
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
      <HomeFlexCard>
        <TableContainer w="100%">
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
                    _hover={
                      organisation.id === Cookies.get("organisation")
                        ? { bg: "orange.200", cursor: "pointer" }
                        : { bg: "gray.100", cursor: "pointer" }
                    }
                    onClick={() =>
                      selectOrganisation(organisation.id, organisation.name)
                    }
                    bg={
                      organisation.id === Cookies.get("organisation")
                        ? "orange.100"
                        : ""
                    }
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
        </TableContainer>
      </HomeFlexCard>
      <CreateOrganisationModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};

Organisations.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomeLayout
      projectId={page.props.projectId}
      projectName={page.props.projectName}
      organisationName={page.props.organisationName}
    >
      {page}
    </HomeLayout>
  );
};

export const getServerSideProps = async (context: any) => {
  const { token, refreshToken, projectName, organisationName } =
    parseDataFromCookie(context.req.headers.cookie);

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
  let refreshLoginFailed = false;
  try {
    result = (await getOrganisationsApi(offset, token)).data;
  } catch (err: any) {
    if (err.response.status === 403) {
      try {
        let refreshLoginResult;
        try {
          refreshLoginResult = (await refreshLogin(refreshToken)).data;
          setAuthCookies(
            context.res,
            refreshLoginResult.token,
            refreshLoginResult.refreshToken
          );
        } catch (err: any) {
          refreshLoginFailed = true;
          throw err;
        }
        result = (await getOrganisationsApi(offset, refreshLoginResult.token))
          .data;
      } catch (err: any) {
        isError = true;
      }
    }
  }

  if (refreshLoginFailed) {
    clearCookiesServerSide(context.res);
    return invalidateUserAuthentication();
  }

  return {
    props: {
      token,
      refreshToken,
      organisations: result?.organisations ?? [],
      currentPage: page ?? 1,
      totalPages: result?.page?.totalPages ?? 1,
      isError,
      projectName: projectName ?? null,
      organisationName: organisationName ?? null,
    },
  };
};

export default Organisations;
