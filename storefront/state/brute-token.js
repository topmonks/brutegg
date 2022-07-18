import { selector, selectorFamily } from "recoil";
import { ethereumState } from "./ethereum";
import BruteTokenABI from "../abi/BruteToken.json";

import getWeb3 from "../libs/web3";
import { BRUTE_ADDRESS } from "../libs/constants";

export function getBruteContract(contractAddress) {
  const web3 = getWeb3();
  /**
   * @type {{methods: import("../types/BruteToken").BruteToken}}
   */
  const bruteContract = new web3.eth.Contract(
    BruteTokenABI.abi,
    contractAddress
  );

  return bruteContract;
}

const _bruteAccountState = selectorFamily({
  key: "_bruteAccountState",
  get:
    ([bruteContractAddress]) =>
    async ({ get }) => {
      const ethereum = get(ethereumState);

      if (!ethereum.account) {
        return undefined;
      }

      const bruteContract = getBruteContract(bruteContractAddress);

      let balance = await bruteContract.methods
        .balanceOf(ethereum.account)
        .call();

      const web3 = getWeb3();

      balance = web3.utils.fromWei(balance, "ether");

      return { balance };
    },
});

const _brutePublicState = selectorFamily({
  key: "_brutePublicState",
  get:
    ([bruteContractAddress]) =>
    async ({ get }) => {
      const ethereum = get(ethereumState);

      if (!ethereum.isInstalled) {
        return undefined;
      }

      const bruteContract = getBruteContract(bruteContractAddress);

      const symbol = await bruteContract.methods.symbol().call();
      const totalSupply = await bruteContract.methods.totalSupply().call();
      const decimals = await bruteContract.methods.decimals().call();

      return { address: bruteContractAddress, symbol, totalSupply, decimals };
    },
});

export const bruteState = selector({
  key: "bruteState",
  get: ({ get }) => {
    const ethereum = get(ethereumState);

    if (!ethereum.isInstalled) {
      return null;
    }

    if (!ethereum.web3Loaded) {
      return null;
    }

    const bruteContractAddress = BRUTE_ADDRESS[ethereum.chainId];

    if (!bruteContractAddress) {
      return null;
    }

    const account = get(_bruteAccountState([bruteContractAddress]));
    const _public = get(_brutePublicState([bruteContractAddress]));

    return { account, public: _public };
  },
});
