import PropTypes from "prop-types";
import {
  Alert,
  alpha,
  Button,
  CircularProgress,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LinkIcon from "@mui/icons-material/Link";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Fragment, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { keyframes } from "@emotion/react";
import {
  addToken,
  isCorrectChain,
  optionallySwitchToPolygonChain,
  requestAccounts,
} from "../../libs/metamask";
import { ethereumState } from "../../state/ethereum";
import { snackbarState } from "../../state/snackbar";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import PriceTag from "../price-tag";
import { useRouter } from "next/router";
import { withLocale } from "../../libs/router";
import { bruteState } from "../../state/brute-token";
import { USER_LINKS } from "../navbar";
import DoubleBorderBox from "../double-border-box";
import useDisconnectWallet from "../../hooks/use-disconnect-wallet";

const buttonAnimation = (color) => keyframes`
  from {
    border: 1px solid ${alpha(color, 0.2)};
  }
  to {
    border: 1px solid ${alpha(color, 1)};
  }
`;

const BaseButton = styled(Button)(({ theme }) => ({
  "&.MuiButton-outlined": {
    animation: `${buttonAnimation(
      theme.palette.primary.main
    )} 2s ease-out infinite alternate`,
  },

  "&:hover": {
    border: "1px solid " + theme.palette.primary.main,
    animation: "none",
  },
}));

function InstallButton({ children }) {
  const { t } = useTranslation("MetamaskButton");

  return (
    <BaseButton
      href="https://metamask.io/"
      rel="noreferrer"
      startIcon={
        <img
          alt="Metamask logo"
          height={40}
          src="https://res.cloudinary.com/brutegg/image/upload/v1657234745/brutegg-swell/metamask-logo_xok53j.svg"
          width={40}
        />
      }
      target="_blank"
      variant="outlined"
    >
      {children ?? <span>{t("Install MetaMask")}</span>}
    </BaseButton>
  );
}

InstallButton.propTypes = {
  children: PropTypes.node,
};

function ConnectButton({ children }) {
  const { t } = useTranslation("MetamaskButton");
  const ethereum = useRecoilValue(ethereumState);
  const [, setEthereum] = useRecoilState(ethereumState);
  const [, setSnackbar] = useRecoilState(snackbarState);

  const connectWallet = useCallback(async () => {
    if (!ethereum.isInstalled) {
      return;
    }

    try {
      await optionallySwitchToPolygonChain();
    } catch (e) {
      console.error(e);
    }

    try {
      const account = await requestAccounts();

      setEthereum((e) => ({
        ...e,
        account,
      }));
      setSnackbar({
        message: t("Wallet successfully connected"),
      });
    } catch (e) {
      setSnackbar({
        getChildren: (handleClose) => (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {t(e.message, { ns: "MetamaskErrors" })}
          </Alert>
        ),
      });
    }
  }, [t, ethereum.isInstalled, setEthereum, setSnackbar]);

  return (
    <BaseButton
      onClick={connectWallet}
      startIcon={
        <img
          alt="Metamask logo"
          height={40}
          src="https://res.cloudinary.com/brutegg/image/upload/v1657234745/brutegg-swell/metamask-logo_xok53j.svg"
          width={40}
        />
      }
      variant="outlined"
    >
      {children ?? <span>{t("Connect wallet")}</span>}
    </BaseButton>
  );
}

ConnectButton.propTypes = {
  children: PropTypes.node,
};

function ConnectedButton() {
  const router = useRouter();
  const { t } = useTranslation("MetamaskButton");
  const [ethereum] = useRecoilState(ethereumState);
  const anchorEl = useRef();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const brute = useRecoilValueLoadable(bruteState);

  const disconnectWallet = useDisconnectWallet();

  const disconnect = () => {
    handleClose();
    disconnectWallet();
  };

  const changeToPolygon = () => {
    handleClose();
    optionallySwitchToPolygonChain();
  };

  const goToWallet = () => {
    handleClose();
    router.push(withLocale(router.locale, USER_LINKS.WALLET));
  };

  const addBruteTokenToMetamask = () => {
    if (!brute.contents?.public) {
      return;
    }

    const tokenImage =
      "https://res.cloudinary.com/brutegg/image/upload/v1658926189/brutegg-swell/helmet-token-logo_gwvlpe.png";

    const { address, decimals, symbol } = brute.contents.public;
    addToken(address, symbol, parseInt(decimals), tokenImage);
  };

  return (
    <Fragment>
      <Menu
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { p: "2px" },
        }}
        PaperProps={{
          sx: {
            width: anchorEl.current?.offsetWidth,
            borderRadius: 0,
            background: "black",
          },
        }}
        anchorEl={anchorEl.current}
        disableScrollLock
        id="basic-menu"
        onClose={handleClose}
        open={open}
      >
        <DoubleBorderBox sx={{ py: "5px !important" }}>
          {!isCorrectChain(ethereum.chainId) && (
            <MenuItem onClick={changeToPolygon} sx={{ whiteSpace: "normal" }}>
              <ListItemIcon>
                <LinkIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                {t("Change to Polygon", { ns: "Common" })}
              </ListItemText>
            </MenuItem>
          )}
          <MenuItem onClick={goToWallet}>
            <ListItemIcon>
              <AccountBalanceWalletIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{t("Wallet", { ns: "Common" })}</ListItemText>
          </MenuItem>
          <MenuItem
            disabled={brute.state === "loading"}
            onClick={addBruteTokenToMetamask}
            sx={{ whiteSpace: "normal" }}
          >
            <ListItemIcon>
              <img
                alt="Brutecoin logo"
                height={18}
                src="https://res.cloudinary.com/brutegg/image/upload/v1657558525/brutegg-swell/helmet_pldqf4.svg"
                width={18}
              />
            </ListItemIcon>
            <ListItemText>{t("Add Brute token to Metamask")}</ListItemText>
          </MenuItem>
          <MenuItem onClick={disconnect}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              {t("Disconnect wallet", { ns: "Common" })}
            </ListItemText>
          </MenuItem>
        </DoubleBorderBox>
      </Menu>
      <BaseButton
        onClick={() => setOpen(true)}
        ref={anchorEl}
        sx={{
          width: {
            sm: 250,
            height: 52,
          },
          maxWidth: "100%",
        }}
        variant="text"
      >
        <Box alignItems="center" display="flex" justifyContent="center">
          <Box
            sx={{
              pr: 1.5,
              mr: 1.5,
              borderRight: "1px solid white",
            }}
          >
            <PriceTag
              amount={brute.contents?.account?.balance || ""}
              sx={{ fontWeight: "bold" }}
            >
              {brute.state === "loading" && <CircularProgress size={15} />}
            </PriceTag>
          </Box>
          <span>
            {ethereum.account?.substring(0, 5)}...
            {ethereum.account?.substring(ethereum.account?.length - 4)}
          </span>
        </Box>
      </BaseButton>
    </Fragment>
  );
}

ConnectedButton.propTypes = {};

export default function MetamaskButton({
  hideStateMask = { withoutExt: false, isConnected: false, withExt: false },
  installText,
  connectText,
}) {
  const ethereum = useRecoilValue(ethereumState);

  if (!ethereum.initialized) {
    return null;
  }

  if (!ethereum.isInstalled) {
    if (!hideStateMask.withoutExt) {
      return <InstallButton>{installText}</InstallButton>;
    }
  } else {
    if (ethereum.account) {
      if (!hideStateMask.isConnected) {
        return <ConnectedButton />;
      }
    } else {
      if (!hideStateMask.withExt) {
        return <ConnectButton>{connectText}</ConnectButton>;
      }
    }
  }

  return null;
}

MetamaskButton.propTypes = {
  connectText: PropTypes.node,
  hideStateMask: PropTypes.object,
  installText: PropTypes.node,
};
