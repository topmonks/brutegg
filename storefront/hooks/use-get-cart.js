import { useQuery } from "react-query";
import swell from "swell-js";

export default function useGetCart(opts) {
  return useQuery(
    ["/swell.cart.get/"],
    /**
     * @returns {Promise<import("../types/swell").Cart>}
     */
    () => swell.cart.get(),
    { ...opts }
  );
}
