import PropTypes from "prop-types";
import "../styles/globals.css";
import "../libs/swell";
import "../translation/i18n";

import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { RecoilRoot } from "recoil";
import { Fragment, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import theme from "../libs/theme";
import DefaultAppLayout from "../components/layout";
import QueryClientProvider from "../components/query-client-provider";
import MetamaskWatcher from "../components/web3/metamask-watcher";
import Snackbar from "../components/snackbar";
import PendingTxsWatcher from "../components/web3/pending-txs-watcher";
import SessionWatcher from "../components/session-watcher";
import Web3Loader from "../components//web3/web3-loader";
import Head from "next/head";
import ErrorFallback from "../components/error-fallback";
import window from "../libs/window";

const myErrorHandler = (error) => {
  window.Rollbar?.error(error);
};

function MyApp({ Component, pageProps }) {
  const Layout = Component.AppLayout ?? DefaultAppLayout;

  return (
    <Fragment>
      <RecoilRoot>
        <Head>
          <title>Brute merch shop</title>
        </Head>
        <Web3Loader />

        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={myErrorHandler}
        >
          <Suspense fallback="Loading">
            <QueryClientProvider>
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
                  <PendingTxsWatcher />
                  <SessionWatcher />
                </Suspense>
                <Snackbar />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ThemeProvider>
            </QueryClientProvider>
          </Suspense>
        </ErrorBoundary>
      </RecoilRoot>
    </Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
};

export default MyApp;
