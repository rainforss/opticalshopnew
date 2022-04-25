import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "urql";
import { client } from "../utils/urqlClient";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/saira";
import "@fontsource/saira-semi-condensed";

const theme = extendTheme({
  fonts: {
    heading: "Saira",
    body: "Saira Semi Condensed, sans-serif",
  },
  semanticTokens: {
    colors: {
      heading: {
        default: "#0a1070",
      },
      primary: {
        default: "#0a1070",
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
