import "../styles/globals.css";
import "../libs/swell";

import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../libs/theme";
import { Fragment } from "react";
import Script from "next/script";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Script
        onLoad={() => console.log("web3 loaded")}
        src="https://unpkg.com/web3@latest/dist/web3.min.js"
        strategy="afterInteractive"
      />
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Fragment>
  );
}

export default MyApp;
