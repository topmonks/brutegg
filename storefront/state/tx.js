import { atomFamily, selectorFamily } from "recoil";
import window from "../libs/window";

const LOCAL_STORAGE_PENDING_TXS_PREFIX = "brutegg-pending-txs-v1:";
const LOCAL_STORAGE_WATCHER_TXS_PREFIX = "brutegg-watcher-txs-v1:";

const localStorageEffect =
  (_key, prefix = "") =>
  ({ setSelf, onSet }) => {
    if (!_key) {
      return;
    }

    const key = prefix + _key;

    const savedValue = window.localStorage?.getItem(key);

    if (savedValue != null) {
      try {
        const value = JSON.parse(savedValue);
        setSelf(value);
      } catch (e) {
        window.localStorage?.removeItem(key);
      }
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? window.localStorage?.removeItem(key)
        : window.localStorage?.setItem(key, JSON.stringify(newValue));
    });
  };

/**
 * @type {() => import("recoil").RecoilState<string[]>}
 */
export const pendingTxsState = atomFamily({
  key: "pendingTxsState",
  default: [],
  effects: (account) => {
    return [localStorageEffect(account, LOCAL_STORAGE_PENDING_TXS_PREFIX)];
  },
});

export const TX_STATES = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
};

export const TX_FINAL_STATES = [TX_STATES.SUCCESS, TX_STATES.FAILED];

/**
 * @type {EVENT_TYPES[keyof EVENT_TYPES]}
 */
export const txLastState = atomFamily({
  key: "txLastState",
  default: undefined,
});

const clearWatcherIfNotInPending =
  (_key, prefix = "", account) =>
  ({ resetSelf, getPromise }) => {
    if (!_key || !account) {
      return;
    }

    const key = prefix + _key;

    let savedValue = window.localStorage?.getItem(key);
    if (savedValue != null) {
      savedValue = JSON.parse(savedValue);

      getPromise(pendingTxsState(account)).then((pendingTxs) => {
        if (!pendingTxs.includes(savedValue)) {
          resetSelf();
        }
      });
    }
  };

/**
 * @type {() => import("recoil").RecoilState<string[]>}
 */
export const watcherTxsState = atomFamily({
  key: "watcherTxsState",
  default: null,
  effects: ([account, contractAddress, method]) => {
    if (!account || !contractAddress || !method) {
      return [];
    }

    const key = `${account}:${contractAddress}:${method}`;
    return [
      localStorageEffect(key, LOCAL_STORAGE_WATCHER_TXS_PREFIX),
      clearWatcherIfNotInPending(
        key,
        LOCAL_STORAGE_WATCHER_TXS_PREFIX,
        account
      ),
    ];
  },
});

/**
 * @type {() => import("recoil").RecoilState<{transactionHash: string, state:string} | null>}
 */
export const watchingTxsState = selectorFamily({
  key: "watchingTxsState",
  default: null,
  get:
    ([account, contractAddress, method]) =>
    async ({ get }) => {
      const transactionHash = get(
        watcherTxsState([account, contractAddress, method])
      );

      if (!transactionHash) {
        return null;
      }

      const state = get(txLastState(transactionHash));

      return { transactionHash, state };
    },
});
