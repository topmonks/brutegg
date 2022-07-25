import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { sessionState } from "../state/session";

export default function useUpdateSession(prop, propName) {
  const [session, setSession] = useRecoilState(sessionState);
  const updateSession = useCallback(
    (obj) => {
      setSession((s) => ({ ...s, ...obj }));
    },
    [setSession]
  );

  useEffect(() => {
    if (!propName) {
      return;
    }

    updateSession({ [propName]: prop });
  }, [prop, propName, updateSession]);

  return [session, updateSession, setSession];
}
