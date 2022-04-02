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
import { refreshLogin, refreshNextLogin } from "../../apicalls/auth";
import {
  deleteConfigurationsApi,
  getConfigurationsApi,
} from "../../apicalls/configurations";
import CreateConfigurationModal from "../../components/Modal/CreateConfigurationModal";
import PaginationBar from "../../components/Pagination/PaginationBar";
import ActionColumn from "../../components/Tables/ActionColumn";
import api from "../../constants/api";
import { TableType } from "../../constants/enum";
import HomeLayout from "../../layouts/HomeLayout";
import { ConfigurationsModel } from "../../models/configurations";
import ConfigurationsContext from "../../store/configurationsContext";
import {
  clearCookies,
  clearCookiesServerSide,
  constructAuthHeader,
  invalidateUserAuthentication,
  parseDataFromCookie,
  setAuthCookies,
} from "../../utils/auth";

const ProjectConfigurations = ({
  configurations,
  currentPage,
  totalPages,
}: {
  configurations: ConfigurationsModel[];
  currentPage: number;
  totalPages: number;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [stateConfigurations, setStateConfigurations] =
    useState(configurations);
  const configurationsContext = useContext(ConfigurationsContext);

  useEffect(() => {
    configurationsContext.setConfigurations(configurations);
  }, [configurations]);

  useEffect(() => {
    setStateConfigurations(configurationsContext.configurations);
  }, [configurationsContext]);

  const deleteConfiguration = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    const projectId = Cookies.get("projectId");
    try {
      await deleteConfigurationsApi(
        projectId ?? "",
        id,
        Cookies.get("token") ?? ""
      );
    } catch (err: any) {
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
          await deleteConfigurationsApi(
            projectId ?? "",
            id,
            refreshLoginResult.refreshToken
          );
        } catch (err: any) {
          throw err;
        }
      }
    }
    const configurations = stateConfigurations.filter((configuration) => {
      return configuration.id !== id;
    });
    setStateConfigurations(configurations);
  };

  const changePage = (
    e: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => {
    e.stopPropagation();
    Router.push(`/configurations/${Cookies.get("projectId")}?page=${newPage}`);
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
            Total {stateConfigurations.length} Configurations
          </TableCaption>
          <Thead>
            <Tr>
              <Th>S. No.</Th>
              <Th>Name</Th>
              <Th isNumeric>Value</Th>
              <Th>Last Updated</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stateConfigurations.map((configuration, index) => {
              return (
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td>{configuration.name}</Td>
                  <Td isNumeric>{configuration.info}</Td>
                  <Td>{new Date(configuration.updatedAt).toDateString()}</Td>
                  <Td>
                    <ActionColumn
                      id={configuration.id}
                      onDelete={deleteConfiguration}
                      type={TableType.CONFIGURATIONS}
                      name={configuration.name}
                      info={configuration.info}
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
                Create Configuration
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
      <CreateConfigurationModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};

ProjectConfigurations.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout projectId={page.props.projectId}>{page}</HomeLayout>;
};

export const getServerSideProps = async (context: any) => {
  const { token, refreshToken, projectId } = parseDataFromCookie(
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

  const { id: selectedProjectId }: { id: string } = context.query;
  let configurations;
  const a = (
    await axios.get(
      `${api.CONFIGURATIONS_ROUTE}${selectedProjectId}?offset=${offset}&limit=10`,
      constructAuthHeader(token)
    )
  ).data;

  let isError = false;
  let refreshLoginFailed = false;
  try {
    configurations = (
      await getConfigurationsApi(selectedProjectId, offset, token)
    ).data;
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
        }

        configurations = (
          await getConfigurationsApi(selectedProjectId, offset, token)
        ).data;
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
      configurations: configurations?.configurations ?? [],
      projectId: projectId ?? null,
      totalPages: configurations?.page?.totalPages ?? 1,
      currentPage: page ?? 1,
      isError,
    },
  };
};

export default ProjectConfigurations;
