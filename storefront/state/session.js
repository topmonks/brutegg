import { atom } from "recoil";

/**
 * @type {import("recoil").RecoilState<import("../types/session").SessionState>}
 */
export const sessionState = atom({
  key: "sessionState",
  default: null,
});
