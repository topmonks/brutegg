import PropTypes from "prop-types";
import "../styles/globals.css";
import "../libs/swell";
import "../translation/i18n";

import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { RecoilRoot } from "recoil";
import { Fragment, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "../libs/theme";
import Layout from "../components/layout";
import GlobalHead from "../components/global-head";
import MetamaskWatcher from "../components/web3/metamask-watcher";
import Snackbar from "../components/snackbar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <RecoilRoot>
        <GlobalHead />

        <Suspense fallback="Loading">
          <QueryClientProvider client={queryClient}>
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
          </QueryClientProvider>
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
