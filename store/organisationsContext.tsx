import React, { createContext, useState } from "react";
import { OrganisationContextModel } from "../models/contextModel";
import { OrganisationModel } from "../models/organisation";

const OrganisationsContext = createContext<OrganisationContextModel>({
  organisations: [] as OrganisationModel[],
  addOrganisation: (organisation: OrganisationModel) => {},
  setOrganisations: (organisations: OrganisationModel[]) => {},
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

  const context = {
    organisations,
    addOrganisation,
    setOrganisations,
  };
  return (
    <OrganisationsContext.Provider value={context}>
      {children}
    </OrganisationsContext.Provider>
  );
};

export default OrganisationsContext;
