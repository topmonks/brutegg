import { selector, selectorFamily } from "recoil";
import { ethereumState } from "./ethereum";
import ERC20 from "../abi/ERC20PresetMinterPauser.json";

import getWeb3 from "../libs/web3";
import { BRUTE_ADDRESS } from "../libs/constants";

export function getBruteContract(contractAddress) {
  const web3 = getWeb3();
  /**
   * @type {{methods: import("../types/ERC20PresetMinterPauser").ERC20PresetMinterPauser}}
   */
  const bruteContract = new web3.eth.Contract(ERC20.abi, contractAddress);

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

      return { symbol, totalSupply };
    },
});

export const bruteState = selector({
  key: "bruteState",
  get: async ({ get }) => {
    const ethereum = get(ethereumState);

    if (!ethereum.isInstalled) {
      return undefined;
    }

    if (!ethereum.web3Loaded) {
      return undefined;
    }

    console.log(ethereum);

    const bruteContractAddress = BRUTE_ADDRESS[ethereum.chainId];

    console.log(bruteContractAddress);

    if (!bruteContractAddress) {
      return undefined;
    }

    const account = get(_bruteAccountState([bruteContractAddress]));
    const _public = get(_brutePublicState([bruteContractAddress]));

    return { account, public: _public };
  },
});
