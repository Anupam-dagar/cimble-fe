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
import { deleteProjectsApi, getProjectsApi } from "../apicalls/projects";
import AlertComponent from "../components/AlertComponent";
import HomeFlexCard from "../components/Cards/HomeFlexCard";
import CreateProjectModal from "../components/Modal/CreateProjectModal";
import PaginationBar from "../components/Pagination/PaginationBar";
import ActionColumn from "../components/Tables/ActionColumn";
import api from "../constants/api";
import { TableType } from "../constants/enum";
import HomeLayout from "../layouts/HomeLayout";
import { ProjectModel } from "../models/project";
import ProjectsContext from "../store/projectsContext";
import {
  constructAuthHeader,
  parseDataFromCookie,
  invalidateUserAuthentication,
  setAuthCookies,
  clearCookies,
  clearCookiesServerSide,
} from "../utils/auth";

const Projects = ({
  projects,
  organisationId,
  currentPage,
  totalPages,
}: {
  projects: ProjectModel[];
  organisationId: string;
  currentPage: number;
  totalPages: number;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stateProjects, setStateProjects] = useState(projects);
  const projectContext = useContext(ProjectsContext);

  useEffect(() => {
    projectContext.setProjects(projects);
  }, [projects]);

  useEffect(() => {
    setStateProjects(projectContext.projects);
  }, [projectContext]);

  if (!organisationId) {
    return (
      <AlertComponent
        title="No organisation selected!"
        link="/organisations"
        linkText="Select an organisation to continue"
      />
    );
  }

  const totalConfigurations = stateProjects.reduce(
    (total, curr) => total + curr.configurationsCount,
    0
  );

  const selectProject = (projectId: string, projectName: string) => {
    Cookies.set("projectId", projectId);
    Cookies.set("projectName", projectName);
    Router.push(`/configurations/${projectId}`);
  };

  const deleteProject = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    try {
      await deleteProjectsApi(id, Cookies.get("token") ?? "");
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
          await deleteProjectsApi(id, refreshLoginResult.refreshToken);
        } catch (err: any) {
          throw err;
        }
      }
    }
    const projects = stateProjects.filter((project) => {
      return project.id !== id;
    });
    setStateProjects(projects);
  };

  const changePage = (
    e: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => {
    e.stopPropagation();
    Router.push(`/projects?page=${newPage}`);
  };

  return (
    <>
      <HomeFlexCard>
        <TableContainer w="100%">
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
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stateProjects.map((project, index) => {
                return (
                  <Tr
                    _hover={
                      project.id === Cookies.get("projectId")
                        ? { bg: "orange.200", cursor: "pointer" }
                        : { bg: "gray.100", cursor: "pointer" }
                    }
                    bg={
                      project.id === Cookies.get("projectId")
                        ? "orange.100"
                        : ""
                    }
                    onClick={() => selectProject(project.id, project.name)}
                  >
                    <Td>{index + 1}</Td>
                    <Td>{project.name}</Td>
                    <Td isNumeric>{project.configurationsCount ?? 0}</Td>
                    <Td>{new Date(project.createdAt).toDateString()}</Td>
                    <Td>
                      <ActionColumn
                        id={project.id}
                        onDelete={deleteProject}
                        type={TableType.PROJECTS}
                        name={project.name}
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
                  Create Project
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
      <CreateProjectModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
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
    organisation,
    projectId,
    projectName,
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

  let projects;
  let isError = false;
  let refreshLoginFailed = false;
  if (organisation) {
    try {
      projects = (await getProjectsApi(organisation, offset, token)).data;
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

          projects = (
            await getProjectsApi(organisation, offset, refreshLoginResult.token)
          ).data;
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
      projects: projects?.projects ?? [],
      projectId: projectId ?? null,
      organisationId: organisation ?? null,
      totalPages: projects?.page?.totalPages ?? 1,
      currentPage: page ?? 1,
      isError,
      projectName: projectName ?? null,
      organisationName: organisationName ?? null,
    },
  };
};

export default Projects;
