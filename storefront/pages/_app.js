import PropTypes from "prop-types";
import "../styles/globals.css";
import "../libs/swell";
import "../translation/i18n";

import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import theme from "../libs/theme";
import { Fragment, Suspense } from "react";
import Layout from "../components/layout";
import { RecoilRoot } from "recoil";
import GlobalHead from "../components/global-head";
import MetamaskWatcher from "../components/web3/metamask-watcher";
import Snackbar from "../components/snackbar";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <RecoilRoot>
        <GlobalHead />

        <Suspense fallback="Loading">
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                body: {
                  backgroundColor: "black",
                  overflowY: "scroll",
                },
              }}
            />
            <Suspense>
              <MetamaskWatcher />
            </Suspense>
            <Snackbar />
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
