import PropTypes from "prop-types";
import "../styles/globals.css";
import "../libs/swell";
import "../translation/i18n";

import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import theme from "../libs/theme";
import { Fragment, Suspense } from "react";
import Script from "next/script";
import Layout from "../components/layout";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Script
        onLoad={() => console.log("web3 loaded")}
        src="https://unpkg.com/web3@latest/dist/web3.min.js"
        strategy="lazyOnload"
      />
      <RecoilRoot>
        <Suspense fallback="Loading">
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                body: { backgroundColor: "black" },
              }}
            />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Suspense>
      </RecoilRoot>
    </Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
};

export default MyApp;
