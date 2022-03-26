import { OrganisationModel } from "./organisation";

export interface OrganisationContextModel {
  organisations: OrganisationModel[];
  addOrganisation(organisation: OrganisationModel): void;
  setOrganisations(organisations: OrganisationModel[]): void;
}
