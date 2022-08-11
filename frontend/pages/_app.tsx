import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthProvider from "../contexts/AuthContext";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { CanvasProvider } from "../contexts/CanvasContext";
import { wrapper } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CanvasProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </CanvasProvider>
    </AuthProvider>
  );
}

export default wrapper.withRedux(MyApp);
