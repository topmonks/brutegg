import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { BRUTE_ADDRESS } from "../libs/constants";
import { getBruteContract } from "../state/brute-token";
import { ethereumState } from "../state/ethereum";

export default function useBruteContract() {
  const ethereum = useRecoilValue(ethereumState);

  const bruteContract = useMemo(() => {
    const bruteContractAddress = BRUTE_ADDRESS[ethereum.chainId];

    if (!bruteContractAddress) {
      return null;
    }

    if (!ethereum.web3Loaded) {
      return null;
    }

    return getBruteContract(bruteContractAddress);
  }, [ethereum]);

  return bruteContract;
}
