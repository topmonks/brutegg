import { atom } from "recoil";
import window from "../libs/window";

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
