import React, { createContext, useState } from "react";
import { OrganisationContextModel } from "../models/contextModel";
import { OrganisationModel } from "../models/organisation";

const OrganisationsContext = createContext<OrganisationContextModel>({
  organisations: [] as OrganisationModel[],
  addOrganisation: (organisation: OrganisationModel) => {},
  setOrganisations: (organisations: OrganisationModel[]) => {},
  editOrganisation: (organisation: OrganisationModel) => {},
});

export const OrganisationsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [organisations, setOrganisations] = useState<OrganisationModel[]>([]);

  const addOrganisation = (organisation: OrganisationModel) => {
    setOrganisations((previousOrganisations: OrganisationModel[]) => [
      ...previousOrganisations,
      organisation,
    ]);
  };

  const editOrganisation = (organisation: OrganisationModel) => {
    const orgs = [...organisations];
    const organisationIndex = orgs.findIndex(
      (org) => org.id === organisation.id
    );
    if (organisationIndex !== -1) {
      orgs[organisationIndex] = organisation;
      setOrganisations(orgs);
    }
  };

  const context = {
    organisations,
    addOrganisation,
    setOrganisations,
    editOrganisation,
  };
  return (
    <OrganisationsContext.Provider value={context}>
      {children}
    </OrganisationsContext.Provider>
  );
};

export default OrganisationsContext;
