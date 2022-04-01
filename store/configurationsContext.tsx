import React, { createContext, useState } from "react";
import { ConfigurationsModel } from "../models/configurations";
import { ConfigurationContextModel } from "../models/contextModel";

const ConfigurationsContext = createContext<ConfigurationContextModel>({
  configurations: [] as ConfigurationsModel[],
  addConfiguration: (configuration: ConfigurationsModel) => {},
  setConfigurations: (configurations: ConfigurationsModel[]) => {},
  editConfiguration: (configuration: ConfigurationsModel) => {},
});

export const ConfigurationsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [configurations, setConfigurations] = useState<ConfigurationsModel[]>(
    []
  );

  const addConfiguration = (configuration: ConfigurationsModel) => {
    setConfigurations((previousConfigurations: ConfigurationsModel[]) => [
      ...previousConfigurations,
      configuration,
    ]);
  };

  const editConfiguration = (configuration: ConfigurationsModel) => {
    const configs = [...configurations];
    const configIndex = configs.findIndex(
      (config) => config.id === configuration.id
    );
    if (configIndex !== -1) {
      configs[configIndex] = configuration;
      setConfigurations(configs);
    }
  };

  const context = {
    configurations,
    addConfiguration,
    setConfigurations,
    editConfiguration,
  };
  return (
    <ConfigurationsContext.Provider value={context}>
      {children}
    </ConfigurationsContext.Provider>
  );
};

export default ConfigurationsContext;
