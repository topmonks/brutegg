import { useEffect } from "react";
import { useRecoilState } from "recoil";
import window from "../../libs/window";
import { ethereumState } from "../../state/ethereum";

export default function MetamaskWatcher() {
  const [, setEthereum] = useRecoilState(ethereumState);

  useEffect(() => {
    (async () => {
      let chainId;
      if (window.ethereum) {
        chainId = await window.ethereum.request({ method: "eth_chainId" });
      }

      let isConnected = Boolean(window.ethereum?.isConnected());
      let account = window.ethereum?.selectedAddress;

      setEthereum((ethereum) => ({
        ...ethereum,
        initialized: true,
        isInstalled: Boolean(window.ethereum),
        isConnected,
        chainId,
        account,
      }));
    })();
  }, [setEthereum]);

  useEffect(() => {
    const connectListener = () => {
      setEthereum((e) => ({
        ...e,
        isConnected: true,
      }));
    };

    window.ethereum?.on("connect", connectListener);

    return () => window.ethereum?.removeListener("connect", connectListener);
  }, [setEthereum]);

  useEffect(() => {
    const disconnectListener = () => {
      setEthereum((e) => ({
        ...e,
        isConnected: false,
      }));
    };

    window.ethereum?.on("disconnect", disconnectListener);

    return () =>
      window.ethereum?.removeListener("disconnect", disconnectListener);
  }, [setEthereum]);

  useEffect(() => {
    const accountsChangedListener = (accounts) => {
      setEthereum((e) => ({
        ...e,
        account: accounts[0],
      }));
    };

    window.ethereum?.on("accountsChanged", accountsChangedListener);

    return () =>
      window.ethereum?.removeListener(
        "accountsChanged",
        accountsChangedListener
      );
  }, [setEthereum]);

  useEffect(() => {
    const chainChangedListener = (chainId) => {
      setEthereum((e) => ({
        ...e,
        chainId,
      }));
    };

    window.ethereum?.on("chainChanged", chainChangedListener);

    return () =>
      window.ethereum?.removeListener("chainChanged", chainChangedListener);
  }, [setEthereum]);

  return null;
}
