import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { BRUTE_ADDRESS, BRUTE_TREASURY_ADDRESS } from "../libs/constants";
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

  const treasury = useMemo(() => {
    return BRUTE_TREASURY_ADDRESS[ethereum.chainId];
  }, [ethereum]);

  return [bruteContract, treasury];
}
