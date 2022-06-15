import { atom } from "recoil";

/**
 * @type {import("recoil").RecoilState<import("../type/snackbar").SnackbarState>}
 */
export const snackbarState = atom({
  key: "snackbarState",
  default: undefined,
});
