import "../styles/globals.css";
import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
// This is so the Chakra UI components can properly take effect
import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head></Head>
      {/* The Chakra documentation states that you need to wrap everything in a ChakraProvider so we did just that */}
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
