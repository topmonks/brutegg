import { Alert, AlertTitle, Button } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { POLYGON_EXPLORER } from "../../libs/constants";
import getWeb3 from "../../libs/web3";
import { ethereumState } from "../../state/ethereum";
import { snackbarState } from "../../state/snackbar";
import { TX_STATES, pendingTxsState, txLastState } from "../../state/tx";

const EXPECTED_BLOCK_TIME = 3000;
const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

export default function PendingTxsWatcher() {
  const ethereum = useRecoilValue(ethereumState);
  const [pendingTxs, setPendingTxs] = useRecoilState(
    pendingTxsState(ethereum.account)
  );
  const [, setSnackbar] = useRecoilState(snackbarState);
  const { t } = useTranslation("PendingTxs");

  const watcherDispatchEvent = useRecoilCallback(
    /**
     *
     * @param {string} tx
     * @param {"success" | "failed" | "pending"} status
     */
    ({ set }) =>
      (tx, status) => {
        set(txLastState(tx), status);
      },
    []
  );

  const snackbarSuccessfullTx = useCallback(
    (receipt) => {
      setSnackbar({
        getAction: () => {
          return (
            <Button
              color="secondary"
              disableElevation
              href={
                (POLYGON_EXPLORER[ethereum.chainId] ||
                  "https://polygonscan.com/tx/") +
                receipt.value?.transactionHash
              }
              target="_blank"
              variant="contained"
            >
              {t("Check the polygonscan")}
            </Button>
          );
        },
        message: t("Transaction confirmed"),
      });
    },
    [setSnackbar, t, ethereum]
  );

  const snackbarFailedTx = useCallback(
    (receipt) => {
      setSnackbar({
        getChildren: (handleClose) => {
          return (
            <Alert
              action={
                <Button
                  color="error"
                  disableElevation
                  onClick={() => {
                    handleClose();
                  }}
                  variant="contained"
                >
                  {t("Close", { ns: "Common" })}
                </Button>
              }
              severity="error"
            >
              <AlertTitle>{receipt.reason?.message}</AlertTitle>
            </Alert>
          );
        },
      });
    },
    [setSnackbar, t]
  );

  useEffect(() => {
    if (!pendingTxs.length) {
      return;
    }
    let unmounted = false;

    async function updatePendingTxs(pendingTxs) {
      const web3 = getWeb3();

      if (!web3) {
        return [];
      }

      let receipts = await Promise.allSettled(
        pendingTxs.map((tx) => web3.eth.getTransactionReceipt(tx))
      );

      receipts = receipts.map((r, ix) => {
        r.value = r.value || {};
        r.value.transactionHash = r.value.transactionHash || pendingTxs[ix];

        return r;
      });

      const receiptsStatuses = receipts.map((r) => r?.value?.status === true);

      pendingTxs = pendingTxs.filter(
        (tx, ix) => receipts[ix].status === "fulfilled" && !receiptsStatuses[ix]
      );

      Promise.resolve().then(async () => {
        if (pendingTxs.length) {
          await delay(EXPECTED_BLOCK_TIME);
        }

        if (!unmounted) {
          setPendingTxs(pendingTxs);
        }
      });

      return receipts;
    }

    pendingTxs.forEach((tx) => watcherDispatchEvent(tx, TX_STATES.PENDING));

    updatePendingTxs([...pendingTxs]).then((receipts) => {
      console.log({ pendingTxs, receipts });
      const successReceipts = receipts.filter(
        (r) => r.status === "fulfilled" && r.value?.status === true
      );
      const failedReceipts = receipts.filter((r) => r.status === "rejected");

      successReceipts.forEach(snackbarSuccessfullTx);
      successReceipts.forEach((r) =>
        watcherDispatchEvent(r.value.transactionHash, TX_STATES.SUCCESS)
      );

      failedReceipts.forEach(snackbarFailedTx);
      failedReceipts.forEach((r) => {
        watcherDispatchEvent(r.value?.transactionHash, TX_STATES.FAILED);
      });
    });

    return () => (unmounted = true);
  }, [
    pendingTxs,
    setPendingTxs,
    snackbarSuccessfullTx,
    snackbarFailedTx,
    watcherDispatchEvent,
  ]);

  return null;
}
