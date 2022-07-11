import PropTypes from "prop-types";
import {
  alpha,
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

  const { data: cart } = useGetCart();

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

  const { data: createdOrder } = useQuery(
    ["/api/swell/create-order", cart?.id, watchingTxs],
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
  }, []);

  let content = (
    <Box>
      <img
        alt="Metamask logo"
        height={40}
        src="https://res.cloudinary.com/brutegg/image/upload/v1657234745/brutegg-swell/metamask-logo_xok53j.svg"
        width={40}
      />
    </Box>
  );

  return (
    <div>
      <Dialog
        PaperProps={{
          sx: {
            borderRadius: 0,
            border: "3px solid #101112",
            boxShadow: `inset 0 0 20px 0 ${alpha(
              "#000",
              0.8
            )}, inset 0 0 0 1px ${alpha("#fff", 0.3)}, 0 0 0 1px ${alpha(
              "#fff",
              0.3
            )}`,
            background: `linear-gradient(0deg, ${alpha(
              "#101112",
              1
            )} 0%, ${alpha("#111214", 1)} 100%)`,
          },
        }}
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        open={open}
        scroll="paper"
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: {
                xs: "300px",
                sm: "300px",
              },
            }}
          >
            {content}
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={check} variant="text">
            {t("Check", { ns: "Common" })}
          </Button> */}
          <Button onClick={handleClose} variant="text">
            {t("Back", { ns: "Common" })}
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
