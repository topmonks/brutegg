import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import swell from "swell-js";

import useBruteContract from "../../hooks/use-brute-contract";
import { ethereumState } from "../../state/ethereum";
import { useRecoilValue } from "recoil";
import PaymentButton from "./payment-button";
import useWatchTx from "../../hooks/use-watch-tx";
import { TX_STATES } from "../../state/tx";
import { checkoutFormState } from "../../state/checkout";
import { useQuery } from "react-query";
import useGetCart from "../../hooks/use-get-cart";
import window from "../../libs/window";
import fetchThrowHttpError from "../../libs/fetch-throw-http-error.mjs";

export default function PaymentDialog({ handleClose, open }) {
  const { t } = useTranslation("PaymentDialog");

  const [bruteContract] = useBruteContract();
  const ethereum = useRecoilValue(ethereumState);
  const checkoutForm = useRecoilValue(checkoutFormState);

  const { data: cart } = useGetCart({
    staleTime: Infinity,
  });

  const [watchingTxs] = useWatchTx(
    ethereum.account,
    bruteContract?.options?.address,
    "payment"
  );

  const isTxPending = useMemo(
    () => watchingTxs?.state === TX_STATES.PENDING,
    [watchingTxs]
  );
  const isTxSuccess = useMemo(
    () => watchingTxs?.state === TX_STATES.SUCCESS,
    [watchingTxs]
  );
  const isTxFailed = useMemo(
    () => watchingTxs?.state === TX_STATES.FAILED,
    [watchingTxs]
  );

  const { data: cartUpdatedData, isFetched: cartIsUpdated } = useQuery(
    ["/swell.cart.update/", cart?.id, watchingTxs],
    () =>
      swell.cart.update({
        metadata: {
          transactionHash: watchingTxs.transactionHash,
          state: watchingTxs.state,
          [[watchingTxs.transactionHash, watchingTxs.state].join("_")]:
            new Date().toISOString(),
        },
      }),
    {
      enabled:
        Boolean(watchingTxs) &&
        Boolean(watchingTxs?.state) &&
        Boolean(cart?.id),
    }
  );

  // const { data: createdOrder } = useQuery(
  //   ["/swell.cart.update/", cart?.id, watchingTxs],
  //   () =>
  //     window
  //       ?.fetch("/api/swell/create-order", {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         method: "POST",
  //         body: JSON.stringify({
  //           transactionHash: watchingTxs.transactionHash,
  //           cartId: cart.id,
  //           test: ethereum.chainId === POLYGON.testChainId,
  //         }),
  //       })
  //       .then(fetchThrowHttpError)
  //       .then((res) => res.json()),
  //   {
  //     enabled: isTxSuccess && cartIsUpdated,
  //   }
  // );

  const check = useCallback(() => {
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
      .then((res) => res.json());
  });

  let content = (
    <Box>
      <Typography display="block" variant="subtitle1">
        {t("Items will be shipped to")}
      </Typography>
      <Box
        sx={{ my: 1, p: 3, border: "1px solid gray", display: "inline-block" }}
      >
        <Typography fontWeight="bold" variant="body1">
          {checkoutForm.firstName} {checkoutForm.lastName}
        </Typography>
        <Typography fontWeight="bold" variant="body1">
          {checkoutForm.address1}
        </Typography>
        <Typography fontWeight="bold" variant="body1">
          {checkoutForm.address2}
        </Typography>
        <Typography fontWeight="bold" variant="body1">
          {checkoutForm.city}, {checkoutForm.zip}
        </Typography>
        <Typography fontWeight="bold" variant="body1">
          {checkoutForm.country}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        open={open}
        scroll="paper"
      >
        <DialogTitle>{t("Order summary")}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={check} variant="text">
            {t("Check", { ns: "Common" })}
          </Button>
          <Button onClick={handleClose} variant="text">
            {t("Cancel", { ns: "Common" })}
          </Button>
          <PaymentButton />
        </DialogActions>
      </Dialog>
    </div>
  );
}

PaymentDialog.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};
