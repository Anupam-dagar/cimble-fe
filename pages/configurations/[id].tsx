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
import { ReactElement, useContext, useEffect, useState } from "react";
import CreateConfigurationModal from "../../components/Modal/CreateConfigurationModal";
import ActionColumn from "../../components/Tables/ActionColumn";
import api from "../../constants/api";
import { TableType } from "../../constants/enum";
import HomeLayout from "../../layouts/HomeLayout";
import { ConfigurationsModel } from "../../models/configurations";
import ConfigurationsContext from "../../store/configurationsContext";
import {
  constructAuthHeader,
  invalidateUserAuthentication,
  parseDataFromCookie,
} from "../../utils/auth";

const ProjectConfigurations = ({
  configurations,
}: {
  configurations: ConfigurationsModel[];
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [stateConfigurations, setStateConfigurations] =
    useState(configurations);
  const configurationsContext = useContext(ConfigurationsContext);

  useEffect(() => {
    configurationsContext.setConfigurations(configurations);
  }, []);

  useEffect(() => {
    setStateConfigurations(configurationsContext.configurations);
  }, [configurationsContext]);

  const deleteConfiguration = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    const projectId = Cookies.get("projectId");
    await axios.delete(
      `${api.CONFIGURATIONS_ROUTE}${projectId}/${id}`,
      constructAuthHeader(localStorage.getItem("token") ?? "")
    );
    const configurations = stateConfigurations.filter((configuration) => {
      return configuration.id !== id;
    });
    setStateConfigurations(configurations);
  };

  const editConfiguration = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {};

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
                      onEdit={editConfiguration}
                      onDelete={deleteConfiguration}
                      type={TableType.CONFIGURATIONS}
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

export const getServerSideProps = async (context: {
  query: any;
  req: { headers: { cookie: string } };
}) => {
  const { token, refreshToken, projectId } = parseDataFromCookie(context);

  if (!token) {
    return invalidateUserAuthentication();
  }

  const { id: selectedProjectId }: { id: string } = context.query;
  const configurations = (
    await axios.get<ConfigurationsModel[]>(
      `${api.CONFIGURATIONS_ROUTE}${selectedProjectId}`,
      constructAuthHeader(token)
    )
  ).data;

  return {
    props: {
      token,
      refreshToken,
      configurations,
      projectId: projectId ?? null,
    },
  };
};

export default ProjectConfigurations;
