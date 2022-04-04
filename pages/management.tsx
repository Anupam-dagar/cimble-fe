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
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import Router from "next/router";
import { ReactElement, useContext, useEffect, useState } from "react";
import {
  createApiKeyApi,
  getApiKeysApi,
  revokeApiKeysApi,
} from "../apicalls/apikeys";
import { refreshLogin, refreshNextLogin } from "../apicalls/auth";
import AlertComponent from "../components/AlertComponent";
import InfoAlert from "../components/AlertComponent/InfoAlert";
import HomeFlexCard from "../components/Cards/HomeFlexCard";
import PaginationBar from "../components/Pagination/PaginationBar";
import ActionColumn from "../components/Tables/ActionColumn";
import { TableType } from "../constants/enum";
import HomeLayout from "../layouts/HomeLayout";
import { ApiKeysModel } from "../models/apikeys";
import ApiKeysContext from "../store/apikeysContext";
import {
  clearCookiesServerSide,
  parseDataFromCookie,
  invalidateUserAuthentication,
  setAuthCookies,
  clearCookies,
} from "../utils/auth";
import { createNotification, updateNotification } from "../utils/notification";

const Management = ({
  apiKeys,
  organisationId,
  totalPages,
  currentPage,
}: {
  apiKeys: ApiKeysModel[];
  organisationId: string;
  totalPages: number;
  currentPage: number;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stateApiKeys, setStateApiKeys] = useState(apiKeys);
  const apiKeyContext = useContext(ApiKeysContext);
  const toast = useToast();
  const [plaintextApiKey, setPlaintextApiKey] = useState("");

  useEffect(() => {
    apiKeyContext.setApiKeys(apiKeys);
  }, [apiKeys]);

  useEffect(() => {
    setStateApiKeys(apiKeyContext.apikeys);
  }, [apiKeyContext]);

  if (!organisationId) {
    return (
      <AlertComponent
        title="No organisation selected!"
        link="/organisations"
        linkText="Select an organisation to continue"
      />
    );
  }

  const revokeApiKey = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    try {
      await revokeApiKeysApi(organisationId, id, Cookies.get("token") ?? "");
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
          await revokeApiKeysApi(
            organisationId,
            id,
            Cookies.get("token") ?? ""
          );
        } catch (err: any) {
          throw err;
        }
      }
    }
    const apiKeys = stateApiKeys.filter((apikey) => {
      return apikey.id !== id;
    });
    // const apiKeys = stateApiKeys.filter((apikey) => {
    //   if (apikey.id === id) {
    //     apikey.revoked = 1;
    //   }
    //   return apikey;
    // });
    setStateApiKeys(apiKeys);
  };

  const createApiKey = async (
    e: React.MouseEvent<HTMLTableDataCellElement>
  ) => {
    e.stopPropagation();
    const notificationId = createNotification(toast, "Api Key", "Creating");
    let apikey;
    try {
      apikey = (
        await createApiKeyApi(organisationId, Cookies.get("token") ?? "")
      ).data;
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
          apikey = (
            await createApiKeyApi(organisationId, Cookies.get("token") ?? "")
          ).data;
        } catch (err: any) {
          throw err;
        }
      }
    }

    updateNotification(notificationId, toast, "Api Key", "create");
    if (apiKeys) {
      apiKeyContext.addApiKey(apikey);
    }
    setPlaintextApiKey(apikey.apiKey);
    onOpen();
  };

  const changePage = (
    e: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => {
    e.stopPropagation();
    Router.push(`/management?page=${newPage}`);
  };

  return (
    <>
      <HomeFlexCard>
        <TableContainer w="100%">
          <Table variant="unstyled" size={"lg"}>
            <TableCaption>Total {stateApiKeys.length} Api Keys</TableCaption>
            <Thead>
              <Tr>
                <Th>S. No.</Th>
                <Th>Id</Th>
                <Th>Api Key</Th>
                <Th>Date Created/Deleted</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stateApiKeys.map((apikey, index) => {
                return (
                  <Tr bg={apikey.revoked ? "red.100" : ""}>
                    <Td>{index + 1}</Td>
                    <Td>{apikey.id}</Td>
                    <Td>{[...Array(32)].map(() => "*")}</Td>
                    <Td>
                      {new Date(
                        apikey.revoked ? apikey.updatedAt : apikey.createdAt
                      ).toDateString()}
                    </Td>
                    <Td>
                      <ActionColumn
                        id={apikey.id}
                        onDelete={revokeApiKey}
                        type={TableType.APIKEYS}
                        revoked={apikey.revoked}
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
                  onClick={(e) => createApiKey(e)}
                >
                  Create Api Key
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
      <InfoAlert isOpen={isOpen} onClose={onClose} apiKey={plaintextApiKey} />
    </>
  );
};

Management.getLayout = function getLayout(page: ReactElement) {
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
  const {
    token,
    refreshToken,
    projectId,
    projectName,
    organisation,
    organisationName,
  } = parseDataFromCookie(context.req.headers.cookie);

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
  if (organisation) {
    try {
      result = (await getApiKeysApi(organisation, token, offset)).data;
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
          result = (await getApiKeysApi(organisation, token, offset)).data;
        } catch (err: any) {
          isError = true;
        }
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
      apiKeys: result?.apikeys ?? [],
      projectId: projectId ?? null,
      organisationId: organisation ?? null,
      totalPages: result?.page?.totalPages ?? 1,
      currentPage: page ?? 1,
      isError,
      projectName: projectName ?? null,
      organisationName: organisationName ?? null,
    },
  };
};

export default Management;
