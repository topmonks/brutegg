import { Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import { useTranslation } from "react-i18next";
import { ethereumState } from "../../state/ethereum";
import useDisconnectWallet from "../../hooks/use-disconnect-wallet";

export default function DisconnectButton(props) {
  const { t } = useTranslation();
  const ethereum = useRecoilValue(ethereumState);

  const disconnectWallet = useDisconnectWallet();

  return (
    <Button
      disableElevation
      disabled={!ethereum.web3Loaded}
      onClick={disconnectWallet}
      variant="contained"
      {...props}
    >
      {t("Disconnect wallet", { ns: "Common" })}
    </Button>
  );
}
