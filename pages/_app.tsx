import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/saira";
import "@fontsource/saira-semi-condensed";
import { useRouter } from "next/router";

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
  const router = useRouter();
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} key={router.asPath} />
    </ChakraProvider>
  );
}

export default MyApp;
