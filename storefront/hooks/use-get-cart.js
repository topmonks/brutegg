import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import swell from "swell-js";

import { ethereumState } from "../state/ethereum";

export default function useGetCart(opts) {
  const ethereum = useRecoilValue(ethereumState);

  return useQuery(
    ["/swell.cart.get/", ethereum.account],
    /**
     * @returns {Promise<import("../types/swell").Cart>}
     */
    () => swell.cart.get(),
    { enabled: Boolean(ethereum.account), ...opts }
  );
}
