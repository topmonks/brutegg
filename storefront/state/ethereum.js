import { atom } from "recoil";
import window from "../libs/window";

export const ethereumState = atom({
  key: "ethereumState",
  default: (async () => {
    /**
     * @type {string}
     */
    let chainId;
    if (window.ethereum) {
      chainId = await window.ethereum.request({ method: "eth_chainId" });
    }

    let isConnected = Boolean(window.ethereum?.isConnected());

    /**
     * @type {string}
     */
    let account = window.ethereum?.selectedAddress;

    return {
      isInstalled: Boolean(window.ethereum),
      isConnected,
      chainId,
      account,
    };
  })(),
});
