import { atom } from "recoil";

export const ethereumState = atom({
  key: "ethereumState",
  default: {
    initialized: false,
    isInstalled: false,
    isConnected: false,
    web3Loaded: false,
    chainId: null,
    account: null,
  },
});
