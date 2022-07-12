import { atomFamily, selectorFamily } from "recoil";
import window from "../libs/window";

const LOCAL_STORAGE_PREFIX = "brutegg:";
const LOCAL_STORAGE_PENDING_TXS_PREFIX =
  LOCAL_STORAGE_PREFIX + "pending-txs-v1:";
const LOCAL_STORAGE_WATCHER_TXS_PREFIX =
  LOCAL_STORAGE_PREFIX + "watcher-txs-v1:";
const LOCAL_STORAGE_LAST_STATE_TXS_PREFIX =
  LOCAL_STORAGE_PREFIX + "last-state-txs-v1:";
const LOCAL_STORAGE_METADATA_TXS_PREFIX =
  LOCAL_STORAGE_PREFIX + "metadata-txs-v1:";

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
  default: () => null,
  effects: (tx) => {
    if (!tx) {
      return null;
    }

    const key = `${tx}`;
    return [localStorageEffect(key, LOCAL_STORAGE_LAST_STATE_TXS_PREFIX)];
  },
});

/**
 * @type {() => import("recoil").RecoilState<string[]>}
 */
export const watcherTxsState = atomFamily({
  key: "watcherTxsState",
  default: () => null,
  effects: ([account, contractAddress, method]) => {
    if (!account || !contractAddress || !method) {
      return [];
    }

    const key = `${account}:${contractAddress}:${method}`;
    return [localStorageEffect(key, LOCAL_STORAGE_WATCHER_TXS_PREFIX)];
  },
});

/**
 * @typedef {Object} Metadata
 * @property {string} createdAt - ISO date of created at timestamp
 */

/**
 * @type {() => import("recoil").RecoilState<{transactionHash: string, state:string, metadata: Metadata | null} | null>}
 */
export const watchingTxsState = selectorFamily({
  key: "watchingTxsState",
  default: () => null,
  get:
    ([account, contractAddress, method]) =>
    ({ get }) => {
      const transactionHash = get(
        watcherTxsState([account, contractAddress, method])
      );

      if (!transactionHash) {
        return null;
      }

      const state = get(txLastState(transactionHash));
      const metadata = get(metadataTxState(transactionHash));

      return { transactionHash, state, metadata };
    },
});

/**
 * @type {() => import("recoil").RecoilState<Metadata | null>}
 */
export const metadataTxState = atomFamily({
  key: "metadataTxState",
  default: () => null,
  effects: (tx) => {
    if (!tx) {
      return null;
    }

    const key = `${tx}`;
    return [localStorageEffect(key, LOCAL_STORAGE_METADATA_TXS_PREFIX)];
  },
});
