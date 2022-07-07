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
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Fragment, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { keyframes } from "@emotion/react";
import {
  isCorrectChain,
  optionallySwitchToPolygonChain,
  requestAccounts,
} from "../../libs/metamask";
import { ethereumState } from "../../state/ethereum";
import { snackbarState } from "../../state/snackbar";
import window from "../../libs/window";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import PriceTag from "../price-tag";
import { useRouter } from "next/router";
import { withLocale } from "../../libs/router";
import { sessionState } from "../../state/session";
import { bruteState } from "../../state/brute-token";
import { USER_LINKS } from "../navbar";

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
            {e.message}
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

function clearAccountLocalStorage(account) {
  const items = { ...window.localStorage };

  Object.keys(items)
    .filter((k) => k.includes(account))
    .forEach((k) => {
      window.localStorage?.removeItem(k);
    });
}

function ConnectedButton() {
  const router = useRouter();
  const { t } = useTranslation("MetamaskButton");
  const [ethereum, setEthereum] = useRecoilState(ethereumState);
  const anchorEl = useRef();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [, setSnackbar] = useRecoilState(snackbarState);
  const [, setSession] = useRecoilState(sessionState);
  const brute = useRecoilValueLoadable(bruteState);

  const disconnect = () => {
    handleClose();
    clearAccountLocalStorage(ethereum.account);
    setEthereum((e) => ({ ...e, account: undefined }));
    setSnackbar({
      message: t("Wallet successfully disconnected"),
    });
    window?.fetch("/api/logout", {
      method: "POST",
    });
    setSession(null);
  };

  const changeToPolygon = () => {
    handleClose();
    optionallySwitchToPolygonChain();
  };

  const goToProfile = () => {
    handleClose();
    router.push(withLocale(router.locale, USER_LINKS.PROFILE));
  };

  return (
    <Fragment>
      <Menu
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{ sx: { width: anchorEl.current?.offsetWidth } }}
        anchorEl={anchorEl.current}
        disableScrollLock
        id="basic-menu"
        onClose={handleClose}
        open={open}
      >
        {!isCorrectChain(ethereum.chainId) && (
          <MenuItem onClick={changeToPolygon}>
            <ListItemIcon>
              <LinkIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              {t("Change to Polygon", { ns: "Common" })}
            </ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={goToProfile}>
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("Profile", { ns: "Common" })}</ListItemText>
        </MenuItem>
        <MenuItem onClick={disconnect}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("Disconnect", { ns: "Common" })}</ListItemText>
        </MenuItem>
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
