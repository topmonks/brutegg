import Head from "next/head";
import { Fragment } from "react";
import { useRecoilState } from "recoil";
import { ethereumState } from "../state/ethereum";
import Script from "next/script";

export default function Web3Loader() {
  const [, setEthereum] = useRecoilState(ethereumState);
  return (
    <Fragment>
      <Script
        onLoad={() => setEthereum((e) => ({ ...e, web3Loaded: true }))}
        src="https://unpkg.com/web3@latest/dist/web3.min.js"
        strategy="lazyOnload"
      />
    </Fragment>
  );
}
