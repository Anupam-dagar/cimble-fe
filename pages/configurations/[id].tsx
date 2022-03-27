import {
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { ReactElement } from "react";
import api from "../../constants/api";
import HomeLayout from "../../layouts/HomeLayout";
import { ConfigurationsModel } from "../../models/configurations";
import {
  constructAuthHeader,
  invalidateUserAuthentication,
  parseTokenFromCookie,
} from "../../utils/auth";

const ProjectConfigurations = ({
  configurations,
}: {
  configurations: ConfigurationsModel[];
}) => {
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
      top="120px"
      w={{ sm: "calc(100vw - 50px)", xl: "calc(100vw - 75px - 275px)" }}
    >
      <Table variant="unstyled" size={"lg"}>
        <TableCaption>Total X Configurations</TableCaption>
        <Thead>
          <Tr>
            <Th>S. No.</Th>
            <Th>Name</Th>
            <Th isNumeric>Value</Th>
            <Th>Last Updated</Th>
          </Tr>
        </Thead>
        <Tbody>
          {configurations.map((configuration, index) => {
            return (
              <Tr>
                <Td>{index + 1}</Td>
                <Td>{configuration.name}</Td>
                <Td isNumeric>{configuration.info}</Td>
                <Td>{new Date(configuration.updatedAt).toDateString()}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Flex>
  );
};

ProjectConfigurations.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export const getServerSideProps = async (context: {
  query: any;
  req: { headers: { cookie: string } };
}) => {
  const { token, refreshToken } = parseTokenFromCookie(context);

  if (!token) {
    return invalidateUserAuthentication();
  }

  const { id: projectId }: { id: string } = context.query;
  const configurations = (
    await axios.get<ConfigurationsModel[]>(
      `${api.CONFIGURATIONS_ROUTE}${projectId}`,
      constructAuthHeader(token)
    )
  ).data;

  return {
    props: {
      token,
      refreshToken,
      configurations,
    },
  };
};

export default ProjectConfigurations;
