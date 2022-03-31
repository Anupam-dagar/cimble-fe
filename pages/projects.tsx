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
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import { ReactElement, useContext, useEffect, useState } from "react";
import CreateProjectModal from "../components/Modal/CreateProjectModal";
import api from "../constants/api";
import HomeLayout from "../layouts/HomeLayout";
import { ProjectModel } from "../models/project";
import ProjectsContext from "../store/projectsContext";
import {
  constructAuthHeader,
  parseDataFromCookie,
  invalidateUserAuthentication,
} from "../utils/auth";

const Projects = ({ projects }: { projects: ProjectModel[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stateProjects, setStateProjects] = useState(projects);
  const projectContext = useContext(ProjectsContext);

  useEffect(() => {
    projectContext.setProjects(projects);
  }, []);

  useEffect(() => {
    setStateProjects(projectContext.projects);
  }, [projectContext]);

  const totalConfigurations = stateProjects.reduce(
    (total, curr) => total + curr.configurationsCount,
    0
  );

  const selectProject = (projectId: string) => {
    Cookies.set("projectId", projectId);
    Router.push(`/configurations/${projectId}`);
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
            {stateProjects.map((project, index) => {
              return (
                <Tr
                  _hover={{ bg: "gray.100", cursor: "pointer" }}
                  onClick={() => selectProject(project.id)}
                >
                  <Td>{index + 1}</Td>
                  <Td>{project.name}</Td>
                  <Td isNumeric>{project.configurationsCount ?? 0}</Td>
                  <Td>{new Date(project.createdAt).toDateString()}</Td>
                </Tr>
              );
            })}
            <Tr>
              <Td
                bg={"teal.200"}
                borderRadius={16}
                colSpan={4}
                _hover={{ bg: "teal.300", cursor: "pointer" }}
                textAlign="center"
                onClick={onOpen}
              >
                Create Project
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
      <CreateProjectModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <HomeLayout projectId={page.props.projectId}>{page}</HomeLayout>;
};

export const getServerSideProps = async (context: {
  query: any;
  req: { headers: { cookie: string } };
}) => {
  const { token, refreshToken, organisation, projectId } =
    parseDataFromCookie(context);

  if (!token) {
    return invalidateUserAuthentication();
  }

  const projects = (
    await axios.get<ProjectModel[]>(
      `${api.PROJECTS_ROUTE}${organisation}`,
      constructAuthHeader(token)
    )
  ).data;

  return {
    props: {
      token,
      refreshToken,
      projects,
      projectId: projectId ?? null,
    },
  };
};

export default Projects;
