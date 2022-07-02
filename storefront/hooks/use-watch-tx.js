import { useRecoilState, useRecoilValue } from "recoil";
import { watcherTxsState, watchingTxsState } from "../state/tx";

/**
 *
 * @param {string} account
 * @param {string} contractAddress
 * @param {string} method
 */
export default function useWatchTx(account, contractAddress, method) {
  const [, setWatcherTxs] = useRecoilState(
    watcherTxsState([account, contractAddress, method])
  );

  const watchingTxs = useRecoilValue(
    watchingTxsState([account, contractAddress, method])
  );

  return [watchingTxs, setWatcherTxs];
}
