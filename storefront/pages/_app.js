import "../styles/globals.css";
import "../libs/swell";
import "../translation/i18n";

import { CssBaseline, ThemeProvider } from "@mui/material";
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
      <CssBaseline />
      <RecoilRoot>
        <Suspense fallback="Loading">
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </Suspense>
      </RecoilRoot>
    </Fragment>
  );
}

export default MyApp;
