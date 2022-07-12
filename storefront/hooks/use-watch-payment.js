import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ethereumState } from "../state/ethereum";
import { TX_STATES } from "../state/tx";
import useBruteContract from "./use-brute-contract";
import useWatchTx from "./use-watch-tx";

export default function useWatchPayment() {
  const [bruteContract] = useBruteContract();
  const ethereum = useRecoilValue(ethereumState);

  const [paymentTx, setWatcherTxs, removeWatcherTxs] = useWatchTx(
    ethereum.account,
    bruteContract?.options?.address,
    "payment"
  );

  const isTxPending = useMemo(
    () => paymentTx?.state === TX_STATES.PENDING,
    [paymentTx]
  );
  const isTxSuccess = useMemo(
    () => paymentTx?.state === TX_STATES.SUCCESS,
    [paymentTx]
  );
  const isTxFailed = useMemo(
    () => paymentTx?.state === TX_STATES.FAILED,
    [paymentTx]
  );

  return [
    paymentTx,
    isTxPending,
    isTxSuccess,
    isTxFailed,
    setWatcherTxs,
    removeWatcherTxs,
  ];
}
