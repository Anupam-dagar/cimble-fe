import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import theme from "../theme/theme";
import { OrganisationsContextProvider } from "../store/organisationsContext";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { ProjectsContextProvider } from "../store/projectsContext";
import { ConfigurationsContextProvider } from "../store/configurationsContext";
import { ApiKeysContextProvider } from "../store/apikeysContext";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      <OrganisationsContextProvider>
        <ProjectsContextProvider>
          <ConfigurationsContextProvider>
            <ApiKeysContextProvider>
              {getLayout(<Component {...pageProps} />)}
            </ApiKeysContextProvider>
          </ConfigurationsContextProvider>
        </ProjectsContextProvider>
      </OrganisationsContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
