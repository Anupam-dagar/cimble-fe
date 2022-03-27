import { OrganisationModel } from "./organisation";
import { ProjectModel } from "./project";

export interface OrganisationContextModel {
  organisations: OrganisationModel[];
  addOrganisation(organisation: OrganisationModel): void;
  setOrganisations(organisations: OrganisationModel[]): void;
}

export interface ProjectContextModel {
  projects: ProjectModel[];
  addProject(project: ProjectModel): void;
  setProjects(projects: ProjectModel[]): void;
}
