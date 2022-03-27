import {
  Box,
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
import Router from "next/router";
import { ReactElement } from "react";
import api from "../constants/api";
import HomeLayout from "../layouts/HomeLayout";
import { ProjectModel } from "../models/project";
import {
  constructAuthHeader,
  parseTokenFromCookie,
  invalidateUserAuthentication,
} from "../utils/auth";

const Projects = ({ projects }: { projects: ProjectModel[] }) => {
  const totalConfigurations = projects.reduce(
    (total, curr) => total + curr.configurationsCount,
    0
  );

  const selectProject = (projectId: string) => {
    localStorage.setItem("projectId", projectId);
    Router.push("/configurations");
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
            Total {totalConfigurations} Configurations in {projects.length}{" "}
            Projects
          </TableCaption>
          <Thead>
            <Tr>
              <Th>S. No.</Th>
              <Th>Name</Th>
              <Th isNumeric>Configurations</Th>
              <Th>Date of Creation</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((project, index) => {
              return (
                <Tr
                  _hover={{ bg: "gray.100", cursor: "pointer" }}
                  onClick={() => selectProject(project.id)}
                >
                  <Td>{index + 1}</Td>
                  <Td>{project.name}</Td>
                  <Td isNumeric>{project.configurationsCount}</Td>
                  <Td>{new Date(project.createdAt).toDateString()}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export const getServerSideProps = async (context: {
  req: { headers: { cookie: string } };
}) => {
  const { token, refreshToken } = parseTokenFromCookie(context);

  if (!token) {
    return invalidateUserAuthentication();
  }

  const projects = (
    await axios.get<ProjectModel[]>(
      api.PROJECTS_ROUTE,
      constructAuthHeader(token)
    )
  ).data;

  return {
    props: {
      token,
      refreshToken,
      projects,
    },
  };
};

export default Projects;
