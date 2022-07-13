import { Box } from "@chakra-ui/react";
import Head from "next/head";

// This is the file that handles rendering the footer, navigation bar, and any content right in the middle
const Layout = ({ children }) => (
  <>
    <Head>
      <title>Real Estate</title>
    </Head>
    <Box maxWidth="1280px" m="auto">
      <header>Navbar goes here later</header>
      <main>
        {/* The children prop is equal to whatever is passed into the Layour component when it's called */}
        {children}
      </main>
      <footer>Footer goes here</footer>
    </Box>
  </>
);

export default Layout;
