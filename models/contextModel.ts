import { ConfigurationsModel } from "./configurations";
import { OrganisationModel } from "./organisation";
import { ProjectModel } from "./project";

export interface OrganisationContextModel {
  organisations: OrganisationModel[];
  addOrganisation(organisation: OrganisationModel): void;
  setOrganisations(organisations: OrganisationModel[]): void;
  editOrganisation(organisation: OrganisationModel): void;
}

export interface ProjectContextModel {
  projects: ProjectModel[];
  addProject(project: ProjectModel): void;
  setProjects(projects: ProjectModel[]): void;
  editProject(project: ProjectModel): void;
}

export interface ConfigurationContextModel {
  configurations: ConfigurationsModel[];
  addConfiguration(configuration: ConfigurationsModel): void;
  setConfigurations(configurations: ConfigurationsModel[]): void;
  editConfiguration(configuration: ConfigurationsModel): void;
}
