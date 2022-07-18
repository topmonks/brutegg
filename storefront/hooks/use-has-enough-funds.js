import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import getWeb3 from "../libs/web3";
import { bruteState } from "../state/brute-token";

export default function useHasEnoughFunds(price) {
  const brute = useRecoilValue(bruteState);
  return useMemo(() => {
    if (brute?.account.balance == null || price == null) {
      return false;
    }
    const web3 = getWeb3();
    return web3.utils
      .toWei(web3.utils.toBN(brute.account.balance), "ether")
      .gte(web3.utils.toWei(price, "ether"));
  }, [brute, price]);
}
