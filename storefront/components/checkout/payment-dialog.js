import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  keyframes,
  LinearProgress,
  Link,
  Typography,
} from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslation } from "react-i18next";

import PaymentButton from "./payment-button";
import useWatchPayment from "../../hooks/use-watch-payment";
import { withLocale } from "../../libs/router";
import { LINKS, USER_LINKS } from "../navbar";
import { useRouter } from "next/router";
import { POLYGON_EXPLORER } from "../../libs/constants";
import { useRecoilValue } from "recoil";
import { ethereumState } from "../../state/ethereum";
import useHasEnoughFunds from "../../hooks/use-has-enough-funds";
import useCartPrice from "../../hooks/use-cart-price";
import { bruteState } from "../../state/brute-token";
import PriceTag from "../price-tag";
import { style as doubleBorderBoxStyle } from "../double-border-box";

const helmetAnimation = keyframes`
  0%   {opacity: 1}
  25%  {opacity: 0.6}
  50%  {opacity: 1}
  100% {opacity: 0.9}
`;

function DialogLayout({ children, open, handleClose }) {
  return (
    <Dialog
      PaperProps={{
        sx: {
          ...doubleBorderBoxStyle,
        },
      }}
      fullWidth
      maxWidth="md"
      onClose={handleClose}
      open={open}
      scroll="paper"
    >
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: {
              xs: "300px",
              sm: "300px",
            },
          }}
        >
          {children[0]}
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: { sm: 2 }, pr: { sm: 2 } }}>
        {children[1]}
      </DialogActions>
    </Dialog>
  );
}

DialogLayout.propTypes = {
  children: PropTypes.node,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};

function PaymentInProgress({ createdAt, open }) {
  const { t } = useTranslation("PaymentDialog");
  const [time, setTime] = useState();

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toISOString());
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const timePassed = useMemo(() => {
    let result = "00:00";

    if (createdAt && time) {
      let secs =
        (new Date(time).getTime() - new Date(createdAt).getTime()) / 1000;

      secs = Math.max(0, secs);

      const minutes = String(Math.floor(secs / 60)).padStart(2, "0");
      secs = String(Math.floor(secs % 60)).padStart(2, "0");

      result = `${minutes}:${secs}`;
    }

    return result;
  }, [createdAt, time]);

  return (
    <DialogLayout handleClose={() => false} open={open}>
      <Box>
        <Box
          sx={{
            mb: 2,
            height: "130px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography
            component="span"
            sx={{ fontWeight: "bold", fontFamily: "Monospace" }}
            variant="h2"
          >
            {timePassed}
          </Typography>
          <LinearProgress
            sx={{
              width: "100%",
              "& .MuiLinearProgress-bar": {
                animationDuration: "8s",
              },
            }}
          />
        </Box>
        <Typography variant="h5">
          {t(
            "We are in the process of extracting your bounty, it may take some time."
          )}
        </Typography>
        <Typography sx={{ mt: 1 }} variant="body1">
          {t("You can close the page and return later")}
        </Typography>
      </Box>

      <Fragment>
        <PaymentButton />
      </Fragment>
    </DialogLayout>
  );
}

PaymentInProgress.propTypes = {
  createdAt: PropTypes.string,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};

function PaymentSuccess({ open }) {
  const { t } = useTranslation("PaymentDialog");
  const ethereum = useRecoilValue(ethereumState);
  const [paymentTx, , , , , removeWatcherTxs] = useWatchPayment();
  const router = useRouter();

  const onClose = useCallback(() => {
    router
      .push(withLocale(router.locale, USER_LINKS.LIST_ORDERS))
      .then(removeWatcherTxs);
  }, [router, removeWatcherTxs]);

  return (
    <DialogLayout handleClose={() => false} open={open}>
      <Box>
        <Box
          sx={{
            mb: 2,
            height: "130px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <img
            alt="BRUTE helmet logo"
            height={120}
            src="https://res.cloudinary.com/brutegg/image/upload/v1657626779/brutegg-swell/chest_tf2blb.png"
          />
          <CheckCircleIcon
            sx={{
              color: (theme) => theme.palette.confirmGreen.main,
              position: "absolute",
              fontSize: 50,
              margin: "0 -9% -7% 0",
            }}
          />
        </Box>
        <Typography variant="h5">
          {t("Done! Check your email for further instructions.")}
        </Typography>
        <Typography sx={{ display: "inline", ml: 1 }} variant="link">
          <Link
            href={
              (POLYGON_EXPLORER[ethereum.chainId] ||
                "https://polygonscan.com/tx/") + paymentTx.transactionHash
            }
            target="_blank"
          >
            {t("Check the transaction on polygonscan.com")}
          </Link>
        </Typography>
      </Box>

      <Fragment>
        <Button disableElevation onClick={onClose} variant="contained">
          {t("Close", { ns: "Common" })}
        </Button>
      </Fragment>
    </DialogLayout>
  );
}

PaymentSuccess.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};

function PaymentNotInitialized({ handleClose, open }) {
  const { t } = useTranslation("PaymentDialog");

  return (
    <DialogLayout handleClose={handleClose} open={open}>
      <Box>
        <Box
          sx={{
            mb: 2,
            animation: `${helmetAnimation} 2.5s infinite alternate ease-out`,
          }}
        >
          <img
            alt="BRUTE helmet logo"
            height={130}
            src="https://res.cloudinary.com/brutegg/image/upload/v1657558525/brutegg-swell/helmet_pldqf4.svg"
          />
        </Box>
        <Typography variant="h5">{t("Continue by clicking on Pay")}</Typography>
      </Box>

      <Fragment>
        <Button onClick={handleClose} variant="text">
          {t("Back", { ns: "Common" })}
        </Button>
        <PaymentButton />
      </Fragment>
    </DialogLayout>
  );
}

PaymentNotInitialized.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};

function PaymentNotEnoughFunds({ handleClose, open }) {
  const { t } = useTranslation("PaymentDialog");
  const totalPrice = useCartPrice();
  const brute = useRecoilValue(bruteState);
  const router = useRouter();

  const goToQuests = useCallback(() => {
    router.push(withLocale(router.locale, LINKS.QUESTS));
  }, [router]);

  return (
    <DialogLayout handleClose={handleClose} open={open}>
      <Box>
        <Box
          sx={{
            mb: 2,
            animation: `${helmetAnimation} 2.5s infinite alternate ease-out`,
          }}
        >
          <img
            alt="BRUTE helmet logo"
            height={130}
            src="https://res.cloudinary.com/brutegg/image/upload/v1657558525/brutegg-swell/helmet_pldqf4.svg"
          />
        </Box>
        <Typography variant="h5">{t("Not enough BRUTE tokens")}</Typography>
        <Typography variant="subtitle1">
          {t("In your account you have")}{" "}
          <PriceTag
            amount={brute?.account?.balance || ""}
            displayLetter={false}
            displayLogo={false}
          />
          . {t("Purchased items cost")}{" "}
          <PriceTag
            amount={totalPrice?.toString() || ""}
            sx={{ fontWeight: "bold" }}
          />
        </Typography>
      </Box>

      <Fragment>
        <Button onClick={handleClose} variant="text">
          {t("Back", { ns: "Common" })}
        </Button>
        <Button disableElevation onClick={goToQuests} variant="contained">
          {t("Earn BRUTE for Quests")}
        </Button>
      </Fragment>
    </DialogLayout>
  );
}

PaymentNotEnoughFunds.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};

export default function PaymentDialog({ handleClose, open }) {
  const [watchingTxs, isTxPending, isTxSuccess, _isTxFailed] =
    useWatchPayment();

  const totalPrice = useCartPrice();
  const hasEnoughtFunds = useHasEnoughFunds(totalPrice);

  if (isTxPending) {
    return (
      <PaymentInProgress
        createdAt={watchingTxs?.metadata?.createdAt}
        handleClose={handleClose}
        open={open}
      />
    );
  }

  if (isTxSuccess) {
    return <PaymentSuccess handleClose={handleClose} open={open} />;
  }

  if (!hasEnoughtFunds) {
    return <PaymentNotEnoughFunds handleClose={handleClose} open={open} />;
  }

  return <PaymentNotInitialized handleClose={handleClose} open={open} />;
}

PaymentDialog.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};
