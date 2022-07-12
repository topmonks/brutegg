import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import swell from "swell-js";

import useGetCart from "../../hooks/use-get-cart";
import useWatchPayment from "../../hooks/use-watch-payment";
import fetchThrowHttpError from "../../libs/fetch-throw-http-error.mjs";
import { ethereumState } from "../../state/ethereum";

export default function PaymentWatcher() {
  const [paymentTx, _isTxPending, isTxSuccess, _isTxFailed] = useWatchPayment();

  const ethereum = useRecoilValue(ethereumState);

  const { data: cart } = useGetCart();

  const { data: _cartUpdatedData, isFetched: cartIsUpdated } = useQuery(
    ["/swell.cart.update/", cart?.id, paymentTx],
    () =>
      swell.cart.update({
        metadata: {
          transactionHash: paymentTx.transactionHash,
          state: paymentTx.state,
          [[paymentTx.transactionHash, paymentTx.state].join("_")]:
            new Date().toISOString(),
        },
      }),
    {
      enabled:
        Boolean(paymentTx) && Boolean(paymentTx?.state) && Boolean(cart?.id),
    }
  );

  const { data: _createdOrder, isFetched: orderIsCreated } = useQuery(
    ["/api/swell/create-order", cart?.id, paymentTx],
    () =>
      window
        ?.fetch("/api/swell/create-order", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            cartId: cart.id,
            chainId: ethereum.chainId,
          }),
        })
        .then(fetchThrowHttpError)
        .then((res) => res.json()),
    {
      enabled: isTxSuccess && cartIsUpdated,
      refetchOnWindowFocus: false,
    }
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!orderIsCreated) {
      return;
    }

    queryClient.invalidateQueries(["/swell.cart.get/"]);
  }, [orderIsCreated, queryClient]);
}
