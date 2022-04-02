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

  const selectProject = (projectId: string) => {
    Cookies.set("projectId", projectId);
    Router.push(`/configurations/${projectId}`);
  };

  const deleteProject = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    await axios.delete(
      `${api.PROJECTS_ROUTE}${id}`,
      constructAuthHeader(localStorage.getItem("token") ?? "")
    );
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
                  _hover={{ bg: "gray.100", cursor: "pointer" }}
                  onClick={() => selectProject(project.id)}
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
      </HomeFlexCard>
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

  let page = context.query.page;
  let offset = 0;
  if (page) {
    page = parseInt(page);
    offset = (page - 1) * 1;
  }

  let projects;
  if (organisation) {
    projects = (
      await axios.get(
        `${api.PROJECTS_ROUTE}${organisation}?offset=${offset}&limit=1`,
        constructAuthHeader(token)
      )
    ).data;
  }

  return {
    props: {
      token,
      refreshToken,
      projects: projects.projects ?? [],
      projectId: projectId ?? null,
      organisationId: organisation ?? null,
      totalPages: projects.page.totalPages,
      currentPage: page ?? 1,
    },
  };
};

export default Projects;
