import { useCallback } from "react";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import {
  metadataTxState,
  txLastState,
  watcherTxsState,
  watchingTxsState,
} from "../state/tx";

/**
 *
 * @param {string} account
 * @param {string} contractAddress
 * @param {string} method
 */
export default function useWatchTx(account, contractAddress, method) {
  const removeWatcherTxs = useResetRecoilState(
    watcherTxsState([account, contractAddress, method])
  );

  const [, setWatcherTxs] = useRecoilState(
    watcherTxsState([account, contractAddress, method])
  );

  const watchingTxs = useRecoilValue(
    watchingTxsState([account, contractAddress, method])
  );

  const setMetadata = useRecoilCallback(
    ({ set }) =>
      (tx, newMetadata) => {
        set(metadataTxState(tx), (currentMetadata) => ({
          ...currentMetadata,
          ...newMetadata,
        }));
      },
    []
  );

  const removeTx = useRecoilCallback(
    ({ reset }) =>
      () => {
        if (watchingTxs == null) {
          return;
        }

        const tx = watchingTxs.transactionHash;
        reset(metadataTxState(tx));
        reset(txLastState(tx));
        removeWatcherTxs();
      },
    [watchingTxs, removeWatcherTxs]
  );

  const setWatcherAndMetadata = useCallback(
    (account, metadata) => {
      setWatcherTxs(account);

      if (metadata) {
        setMetadata(account, metadata);
      }
    },
    [setWatcherTxs, setMetadata]
  );

  return [watchingTxs, setWatcherAndMetadata, removeTx];
}
