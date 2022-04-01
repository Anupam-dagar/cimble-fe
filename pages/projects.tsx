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
import api from "../constants/api";
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
}: {
  projects: ProjectModel[];
  organisationId: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stateProjects, setStateProjects] = useState(projects);
  const projectContext = useContext(ProjectsContext);

  useEffect(() => {
    projectContext.setProjects(projects);
  }, []);

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

  let projects: ProjectModel[] = [];
  if (organisation) {
    projects = (
      await axios.get<ProjectModel[]>(
        `${api.PROJECTS_ROUTE}${organisation}`,
        constructAuthHeader(token)
      )
    ).data;
  }

  return {
    props: {
      token,
      refreshToken,
      projects,
      projectId: projectId ?? null,
      organisationId: organisation ?? null,
    },
  };
};

export default Projects;
