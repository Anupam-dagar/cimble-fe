import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import theme from "../theme/theme";
import { OrganisationsContextProvider } from "../store/organisationsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <OrganisationsContextProvider>
        <Component {...pageProps} />
      </OrganisationsContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
