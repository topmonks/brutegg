import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { ethereumState } from "../state/ethereum";
import { sessionState } from "../state/session";
import { snackbarState } from "../state/snackbar";

function clearAccountLocalStorage(account) {
  const items = { ...window.localStorage };

  Object.keys(items)
    .filter((k) => k.includes(account))
    .forEach((k) => {
      window.localStorage?.removeItem(k);
    });
}

export default function useDisconnectWallet() {
  const { t } = useTranslation("MetamaskButton");
  const [ethereum, setEthereum] = useRecoilState(ethereumState);
  const [, setSnackbar] = useRecoilState(snackbarState);
  const [, setSession] = useRecoilState(sessionState);

  const disconnect = useCallback(() => {
    clearAccountLocalStorage(ethereum.account);
    setEthereum((e) => ({ ...e, account: undefined }));
    setSnackbar({
      message: t("Wallet successfully disconnected", { ns: "Common" }),
    });
    window?.fetch("/api/logout", {
      method: "POST",
    });
    setSession(null);
  }, [setEthereum, setSnackbar, setSession, ethereum, t]);

  return disconnect;
}
