import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { calculateCartPrice } from "../libs/swell";
import getWeb3 from "../libs/web3";
import { ethereumState } from "../state/ethereum";
import useGetCart from "./use-get-cart";

export default function useCartPrice(toWei = false) {
  const ethereum = useRecoilValue(ethereumState);
  const { data: cart } = useGetCart();

  return useMemo(() => {
    if (!cart) {
      return null;
    }

    let totalPrice = calculateCartPrice(cart);

    if (toWei) {
      if (!ethereum.web3Loaded) {
        return null;
      }

      const web3 = getWeb3();

      totalPrice = web3.utils.toWei(totalPrice, "ether");
    }

    return totalPrice;
  }, [cart, ethereum.web3Loaded, toWei]);
}
