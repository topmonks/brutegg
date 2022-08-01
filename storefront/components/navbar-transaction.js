import { LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

import useWatchPayment from "../hooks/use-watch-payment";
import { withLocale } from "../libs/router";
import { eventTargetState, NAVBAR_CHANGE } from "../state/event-target";
import { USER_LINKS } from "./navbar";

export default function NavbarTransaction() {
  const [, isTxPending, isTxSuccess] = useWatchPayment();
  const { t } = useTranslation("Navbar");
  const router = useRouter();

  const eventTarget = useRecoilValue(eventTargetState);
  const redirectToCheckout = useCallback(() => {
    if (eventTarget && window.CustomEvent) {
      eventTarget.dispatchEvent(
        new window.CustomEvent(NAVBAR_CHANGE, {
          detail: {
            target: USER_LINKS.CHECKOUT,
          },
        })
      );
    }

    router.push(withLocale(router.locale, USER_LINKS.CHECKOUT));
  }, [router, eventTarget]);

  if (isTxPending) {
    return (
      <Box
        onClick={redirectToCheckout}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          flexWrap: "wrap",
          cursor: "pointer",
        }}
      >
        <Typography
          component="span"
          sx={{ fontWeight: "bold", fontFamily: "Monospace" }}
          variant="caption"
        >
          {t("Reward mining in progress")}
        </Typography>
        <LinearProgress
          sx={{
            width: "100%",
            "& .MuiLinearProgress-bar": {
              animationDuration: "4s",
            },
          }}
        />
      </Box>
    );
  }

  if (isTxSuccess) {
    return (
      <Box
        onClick={redirectToCheckout}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <Typography
          component="span"
          sx={{ fontWeight: "bold", fontFamily: "Monospace" }}
          variant="caption"
        >
          {t("Reward mined")}
        </Typography>
        <img
          alt="BRUTE helmet logo"
          height={20}
          src="https://res.cloudinary.com/brutegg/image/upload/v1657626779/brutegg-swell/chest_tf2blb.png"
        />
      </Box>
    );
  }

  return null;
}
