import PropTypes from "prop-types";
import "../styles/globals.css";
import "../libs/swell";
import "../translation/i18n";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { RecoilRoot } from "recoil";
import { Fragment, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import swell from "swell-js";
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
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const myErrorHandler = (error) => {
  window.Rollbar?.error(error);
};

function MyApp({ Component, pageProps }) {
  const Layout = Component.AppLayout ?? DefaultAppLayout;

  const { i18n } = useTranslation();
  const router = useRouter();

  if (i18n.language !== router.locale) {
    i18n.changeLanguage(router.locale);
  }

  if (swell.locale.selected() !== router.locale) {
    swell.locale.select(router.locale);
  }

  return (
    <Fragment>
      <RecoilRoot>
        <Head>
          <title>Brute.cz</title>
        </Head>
        <Web3Loader />

        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={myErrorHandler}
        >
          <QueryClientProvider state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
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
