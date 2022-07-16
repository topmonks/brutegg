import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { ethereumState } from "../../state/ethereum";
import window from "../../libs/window";

export default function Web3Loader() {
  const [, setEthereum] = useRecoilState(ethereumState);

  useEffect(() => {
    if (!window.document) {
      return;
    }
    const script = window.document.createElement("script");

    script.src = "https://unpkg.com/web3@1.7.4/dist/web3.min.js";
    script.defer = true;
    script.onload = () => {
      setEthereum((e) => ({ ...e, web3Loaded: true }));
    };

    window.document.body.appendChild(script);
  }, [setEthereum]);

  return null;
}
