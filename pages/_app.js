import "../styles/globals.css";
import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
// This is so the Chakra UI components can properly take effect
import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  // This is what implements the loading from page to page
  NProgress.configure({ showSpinner: false });

  // Anytime a route begins to change, go from page to page, a callback function will be called that'll
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  return (
    <>
      <Head>
        {/* This is what completes the loading bar at the top. Works together with the Router and NProgress to do so */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
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
