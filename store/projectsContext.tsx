import React, { createContext, useState } from "react";
import { ProjectContextModel } from "../models/contextModel";
import { ProjectModel } from "../models/project";

const ProjectsContext = createContext<ProjectContextModel>({
  projects: [] as ProjectModel[],
  addProject: (project: ProjectModel) => {},
  setProjects: (projects: ProjectModel[]) => {},
  editProject: (project: ProjectModel) => {},
});

export const ProjectsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<ProjectModel[]>([]);

  const addProject = (project: ProjectModel) => {
    setProjects((previousProjects: ProjectModel[]) => [
      ...previousProjects,
      project,
    ]);
  };

  const editProject = (project: ProjectModel) => {
    const contextProjects = [...projects];
    const projectIndex = contextProjects.findIndex(
      (contextProject) => contextProject.id === project.id
    );
    if (projectIndex !== -1) {
      contextProjects[projectIndex] = project;
      setProjects(contextProjects);
    }
  };

  const context = {
    projects,
    addProject,
    setProjects,
    editProject,
  };
  return (
    <ProjectsContext.Provider value={context}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContext;
