import { Button } from "@mui/material";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import window from "../libs/window";
import { ethereumState } from "../state/ethereum";
import { snackbarState } from "../state/snackbar";
import { useTranslation } from "react-i18next";
import { sessionState } from "../state/session";
import getWeb3, { composeNonce } from "../libs/web3";
import useRefreshProps from "../hooks/use-refresh-props";

export default function UnlockButton(props) {
  const { t } = useTranslation("UnlockButton");
  const ethereum = useRecoilValue(ethereumState);
  const [, setSnackbar] = useRecoilState(snackbarState);
  const [, setSession] = useRecoilState(sessionState);
  const refreshProps = useRefreshProps();

  const login = useCallback(
    (signature, message, date) => {
      window
        ?.fetch("/api/login", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            address: ethereum.account,
            signature,
            message,
            date,
          }),
        })
        .then(async (res) => {
          if (res.status === 200) {
            await refreshProps();
            setSnackbar({
              message: t("Account successfully unlocked"),
            });
            const session = await res.json();
            setSession({ address: session?.user?.address });
          } else {
            setSnackbar({
              message:
                t("Error response", { ns: "Common" }) +
                " " +
                (await res.text()),
            });
          }
        });
    },
    [t, setSnackbar, setSession, ethereum, refreshProps]
  );

  const sign = useCallback(async () => {
    const date = new Date().toISOString();
    const message = t("Sign the login to brute-gg.web.app");
    const nonce = composeNonce(message, date);
    const web3 = getWeb3();
    const signature = await web3.eth.personal.sign(nonce, ethereum.account);

    login(signature, message, date);
  }, [ethereum, t, login]);

  return (
    <Button
      disableElevation
      disabled={!ethereum.web3Loaded}
      onClick={sign}
      startIcon={<LockOpenIcon />}
      variant="contained"
      {...props}
    >
      {t("Unlock your account")}
    </Button>
  );
}
