import Head from "next/head";
import { Fragment } from "react";
import { useRecoilState } from "recoil";
import { ethereumState } from "../state/ethereum";
import Script from "next/script";

export default function GlobalHead() {
  const [, setEthereum] = useRecoilState(ethereumState);
  return (
    <Fragment>
      <Script
        onLoad={() => setEthereum((e) => ({ ...e, web3Loaded: true }))}
        src="https://unpkg.com/web3@latest/dist/web3.min.js"
        strategy="lazyOnload"
      />
      <Head>
        <title>Brute merch</title>
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/site.webmanifest" rel="manifest" />
        <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#b91d47" name="msapplication-TileColor" />
        <meta content="#333333" name="theme-color" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
    </Fragment>
  );
}
