import { ProjectModel } from "./project";

export interface OrganisationModel {
  id: string;
  name: string;
  projects?: ProjectModel[];
}
