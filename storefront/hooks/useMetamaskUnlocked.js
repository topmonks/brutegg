import { useRecoilValue } from "recoil";
import { ethereumState } from "../state/ethereum";

export default function useMetamaskUnlocked(sessionAddress) {
  const ethereum = useRecoilValue(ethereumState);

  return sessionAddress && ethereum.account === sessionAddress;
}
