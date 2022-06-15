import { Button } from "@mui/material";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import window from "../libs/window";
import { ethereumState } from "../state/ethereum";
import { snackbarState } from "../state/snackbar";
import { useTranslation } from "react-i18next";
import { sessionState } from "../state/session";
import getWeb3, { composeNonce } from "../libs/web3";

export default function UnlockButton() {
  const { t } = useTranslation("UnlockButton");
  const ethereum = useRecoilValue(ethereumState);
  const [, setSnackbar] = useRecoilState(snackbarState);
  const [, setSession] = useRecoilState(sessionState);

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
            setSnackbar({
              message: t("Account successfully unlocked"),
            });
            setSession(await res.json());
          } else {
            setSnackbar({
              message: t("Error response ") + (await res.text()),
            });
          }
        });
    },
    [t, setSnackbar, setSession, ethereum]
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
    <Button disabled={!ethereum.web3Loaded} onClick={sign}>
      Unlock
    </Button>
  );
}
