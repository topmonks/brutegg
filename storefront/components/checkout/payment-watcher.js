import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import swell from "swell-js";

import useGetCart from "../../hooks/use-get-cart";
import useWatchPayment from "../../hooks/use-watch-payment";
import fetchThrowHttpError from "../../libs/fetch-throw-http-error.mjs";
import { bruteState } from "../../state/brute-token";
import { ethereumState } from "../../state/ethereum";

export default function PaymentWatcher() {
  const [paymentTx, isTxPending, isTxSuccess, _isTxFailed] = useWatchPayment();
  const wasTxPending = useRef(false);
  if (isTxPending) {
    wasTxPending.current = true;
  }

  const ethereum = useRecoilValue(ethereumState);

  const { data: cart } = useGetCart();

  const updateCart = useMutation(
    (paymentTx) =>
      swell.cart.update({
        metadata: {
          chainId: ethereum.chainId,
          transactionHash: paymentTx.transactionHash,
          state: paymentTx.state,
          [[paymentTx.transactionHash, paymentTx.state].join("_")]:
            new Date().toISOString(),
        },
      }),
    {
      onSuccess: () => {
        if (isTxSuccess) {
          createOrder.mutate();
        }
      },
    }
  );

  const updateCartMutate = updateCart.mutate;

  useEffect(() => {
    if (!paymentTx || !paymentTx.state) {
      return;
    }
    if (!cart?.id) {
      return;
    }

    updateCartMutate(paymentTx);
  }, [paymentTx, cart?.id, updateCartMutate]);

  const createOrder = useMutation(
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
      onSuccess: () => {
        queryClient.invalidateQueries(["/swell.cart.get/"]);
      },
    }
  );

  const queryClient = useQueryClient();

  const refreshBrute = useRecoilRefresher_UNSTABLE(bruteState);

  useEffect(() => {
    if (!isTxSuccess) {
      return;
    }

    refreshBrute();
  }, [isTxSuccess, refreshBrute]);
}
