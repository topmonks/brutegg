import { Button, CircularProgress } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import swell from "swell-js";
import useBruteContract from "../../hooks/use-brute-contract";
import useWatchTx from "../../hooks/use-watch-tx";
import { calculateCartPrice } from "../../libs/swell";
import getWeb3 from "../../libs/web3";
import { ethereumState } from "../../state/ethereum";
import { pendingTxsState, TX_STATES } from "../../state/tx";

export default function PaymentButton() {
  const { t } = useTranslation("PaymentDialog");
  const [bruteContract, treasuryAddress] = useBruteContract();
  const ethereum = useRecoilValue(ethereumState);

  const [, setPendingTxs] = useRecoilState(pendingTxsState(ethereum.account));
  const [watchingTxs, setWatcherTxs] = useWatchTx(
    ethereum.account,
    bruteContract?.options?.address,
    "payment"
  );

  const { data: cart, isLoading: cartIsLoading } = useQuery(
    ["/swell.cart.get/", ethereum.account],
    () => swell.cart.get(),
    { enabled: !!ethereum.account }
  );

  const pay = useCallback(async () => {
    const web3 = getWeb3();
    if (!web3) {
      return;
    }

    if (!bruteContract) {
      return;
    }

    const totalPrice = web3.utils.toWei(calculateCartPrice(cart), "ether");

    bruteContract.methods
      .transfer(treasuryAddress, totalPrice)
      .send({ from: ethereum.account }, (error, transactionHash) => {
        setPendingTxs((v) => v.concat([transactionHash]));
        setWatcherTxs(transactionHash);
      });
  }, [
    ethereum.account,
    setPendingTxs,
    setWatcherTxs,
    bruteContract,
    treasuryAddress,
    cart,
  ]);

  if (watchingTxs?.state === TX_STATES.PENDING) {
    return (
      <Button
        disableElevation
        disabled
        startIcon={<CircularProgress size={20} />}
        variant="contained"
      >
        {t("Payment is being processed")}
      </Button>
    );
  }

  return (
    <Button
      disableElevation
      disabled={cartIsLoading}
      onClick={pay}
      variant="contained"
    >
      {t("Pay")}
    </Button>
  );
}
