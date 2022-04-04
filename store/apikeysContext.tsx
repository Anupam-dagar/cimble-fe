import React, { createContext, useState } from "react";
import { ApiKeysModel } from "../models/apikeys";
import { ApiKeysContextModel } from "../models/contextModel";

const ApiKeysContext = createContext<ApiKeysContextModel>({
  apikeys: [] as ApiKeysModel[],
  addApiKey: (apikey: ApiKeysModel) => {},
  setApiKeys: (apikeys: ApiKeysModel[]) => {},
  revokeApiKey: (apikey: ApiKeysModel) => {},
});

export const ApiKeysContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [apikeys, setApiKeys] = useState<ApiKeysModel[]>([]);

  const addApiKey = (apikey: ApiKeysModel) => {
    setApiKeys((previousApiKeys: ApiKeysModel[]) => [
      ...previousApiKeys,
      apikey,
    ]);
  };

  const revokeApiKey = (apikey: ApiKeysModel) => {
    const existingApiKeys = [...apikeys];
    const apiKeyIndex = existingApiKeys.findIndex(
      (existingApiKey) => existingApiKey.id === apikey.id
    );
    if (apiKeyIndex !== -1) {
      existingApiKeys[apiKeyIndex] = apikey;
      setApiKeys(existingApiKeys);
    }
  };

  const context = {
    apikeys,
    addApiKey,
    setApiKeys,
    revokeApiKey,
  };
  return (
    <ApiKeysContext.Provider value={context}>
      {children}
    </ApiKeysContext.Provider>
  );
};

export default ApiKeysContext;
