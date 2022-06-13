import { atom } from "recoil";
import window from "../libs/window";

export const NAVBAR_CHANGE = "navbar-change";
export const STORE_ITEM_CHANGE = "store-item-change";

export const eventTargetState = atom({
  key: "eventTargetState",
  default: (() => {
    /**
     * @type {EventTarget | undefined}
     */
    const possibleEventTarget = window.EventTarget
      ? new window.EventTarget()
      : undefined;

    return possibleEventTarget;
  })(),
});
