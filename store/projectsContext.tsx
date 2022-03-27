import React, { createContext, useState } from "react";
import { ProjectContextModel } from "../models/contextModel";
import { ProjectModel } from "../models/project";

const ProjectsContext = createContext<ProjectContextModel>({
  projects: [] as ProjectModel[],
  addProject: (project: ProjectModel) => {},
  setProjects: (projects: ProjectModel[]) => {},
});

export const ProjectsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<ProjectModel[]>([]);

  const addProject = (project: ProjectModel) => {
    console.log("addProject", project);
    setProjects((previousProjects: ProjectModel[]) => [
      ...previousProjects,
      project,
    ]);
  };

  const context = {
    projects,
    addProject,
    setProjects,
  };
  return (
    <ProjectsContext.Provider value={context}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContext;
