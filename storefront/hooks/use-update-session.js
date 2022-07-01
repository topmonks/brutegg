import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { sessionState } from "../state/session";

export default function useUpdateSession(prop, propName) {
  const [session, setSession] = useRecoilState(sessionState);

  useEffect(() => {
    setSession((s) => ({ ...s, [propName]: prop }));
  }, [prop, propName, setSession]);

  useEffect(() => {
    // console.log(session);
  }, [session]);

  return [session, setSession];
}
