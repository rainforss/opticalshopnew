import "../styles/globals.css";
import type { AppProps } from "next/app";
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
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
