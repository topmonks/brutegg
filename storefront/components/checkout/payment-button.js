import { Button } from "@mui/material";
import { Fragment, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import useBruteContract from "../../hooks/use-brute-contract";
import useCartPrice from "../../hooks/use-cart-price";
import useGetCart from "../../hooks/use-get-cart";
import useHasEnoughFunds from "../../hooks/use-has-enough-funds";
import useWatchTx from "../../hooks/use-watch-tx";
import getWeb3 from "../../libs/web3";
import { ethereumState } from "../../state/ethereum";
import { snackbarState } from "../../state/snackbar";
import { pendingTxsState, TX_STATES } from "../../state/tx";
import PriceTag from "../price-tag";

export default function PaymentButton() {
  const { t } = useTranslation("PaymentDialog");
  const [bruteContract, treasuryAddress] = useBruteContract();
  const [, setSnackbar] = useRecoilState(snackbarState);
  const ethereum = useRecoilValue(ethereumState);

  const [, setPendingTxs] = useRecoilState(pendingTxsState(ethereum.account));
  const [watchingTxs, setWatcherTxs] = useWatchTx(
    ethereum.account,
    bruteContract?.options?.address,
    "payment"
  );

  const { data: cart, isLoading: cartIsLoading } = useGetCart();

  const totalPrice = useCartPrice();

  const pay = useCallback(async () => {
    const web3 = getWeb3();
    if (!web3) {
      return;
    }

    if (!bruteContract) {
      return;
    }

    if (!totalPrice) {
      return;
    }

    if (!cart) {
      return;
    }

    const totalPriceInWei = web3.utils.toWei(totalPrice, "ether");

    const gasPrice = await web3.eth.getGasPrice();

    bruteContract.methods
      .transferWithNonce(
        treasuryAddress,
        totalPriceInWei,
        web3.utils.fromUtf8(cart.id)
      )
      .send({ from: ethereum.account, gasPrice }, (error, transactionHash) => {
        if (transactionHash) {
          console.log({ transactionHash });
          setPendingTxs((v) => v.concat([transactionHash]));
          setWatcherTxs(transactionHash, {
            createdAt: new Date().toISOString(),
          });
        }
        if (error) {
          setSnackbar({
            message: t(error.code || error.message, { ns: "MetamaskErrors" }),
          });
        }
      });
  }, [
    ethereum.account,
    setPendingTxs,
    setWatcherTxs,
    bruteContract,
    treasuryAddress,
    totalPrice,
    setSnackbar,
    t,
    cart,
  ]);

  const hasEnoughtFunds = useHasEnoughFunds(totalPrice);

  if (watchingTxs?.state === TX_STATES.PENDING) {
    return (
      <Button disableElevation disabled size="large" variant="contained">
        {t("Payment is being processed")}
      </Button>
    );
  }

  return (
    <Button
      disableElevation
      disabled={cartIsLoading || !hasEnoughtFunds}
      onClick={pay}
      size="large"
      sx={{ fontWeight: "bold" }}
      variant="contained"
    >
      {hasEnoughtFunds ? (
        <Fragment>
          {t("Pay")} <PriceTag amount={totalPrice?.toString()} sx={{ ml: 1 }} />
        </Fragment>
      ) : (
        t("Not enough Brute tokens")
      )}
    </Button>
  );
}
