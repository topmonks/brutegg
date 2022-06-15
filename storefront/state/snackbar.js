import { atom } from "recoil";

/**
 * @type {import("recoil").RecoilState<import("../types/snackbar").SnackbarState>}
 */
export const snackbarState = atom({
  key: "snackbarState",
  default: undefined,
});
