import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { eventTargetState } from "../state/event-target";

export default function useEventTarget(type, callback) {
  const eventTarget = useRecoilValue(eventTargetState);

  useEffect(() => {
    if (!eventTarget || !callback || !type) {
      return;
    }

    eventTarget.addEventListener(type, callback);

    return () => eventTarget.removeEventListener(type, callback);
  }, [eventTarget, callback, type]);
}
