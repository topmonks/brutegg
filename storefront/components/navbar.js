import { Tab, Tabs, alpha, Grid, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import screenfull from "screenfull";

import { eventTargetState, NAVBAR_CHANGE } from "../state/event-target";
import { withLocale } from "../libs/router";
import window from "../libs/window";
import MetamaskButton from "./web3/metamask-button";
import { ethereumState } from "../state/ethereum";

const backgroundAnimation = keyframes`
  from {
    background-size:500% 200%;
  }
  to {
    background-size:100% 100%;
  }
`;

const CustomTab = styled(Tab)(({ theme }) => {
  const commonGradient = `linear-gradient(
    0deg,
    ${alpha(theme.palette.primary.main, 0.2)} 0%,
    rgba(0, 0, 0, 0) 100%
  ) center no-repeat`;

  return {
    "&:hover": {
      animation: `${backgroundAnimation} 1s ease-out infinite alternate-reverse`,
      background: `radial-gradient(ellipse at 50% 300%, ${
        theme.palette.primary.main
      }, ${alpha(
        theme.palette.primary.main,
        0
      )} 65%) center no-repeat, ${commonGradient}`,
    },
    "&.Mui-selected": {
      background: `radial-gradient(ellipse at 50% 200%, ${
        theme.palette.primary.main
      }, ${alpha(
        theme.palette.primary.main,
        0
      )} 70%) center no-repeat,  linear-gradient(
      0deg,
      ${alpha(theme.palette.primary.main, 0.5)} 0%,
      rgba(0, 0, 0, 0) 30%
    ) center no-repeat, ${commonGradient}`,
      animation: `${backgroundAnimation} 1s ease-out`,
      color: "white",
      borderImage: `linear-gradient(
      to top, 
      ${theme.palette.primary.main}, 
      rgba(0, 0, 0, 0)
    ) 1 100%`,
    },
    background: commonGradient,
    fontSize: "18px",
    fontWeight: "bold",
    letterSpacing: 1,
    color: "white",
    padding: "0 30px 0",
    height: "80px",
    [theme.breakpoints.down("sm")]: {
      height: "60px",
    },
    textShadow: `0px 5px 15px ${
      theme.palette.primary.main
    }, 0px 0px 4px ${alpha("#000", 0.2)}`,
    boxShadow: `inset 0 -1px 0 0 ${alpha(theme.palette.primary.main, 0.5)}`,
    borderWidth: "1px",
    borderStyle: "solid",
    borderImage: `linear-gradient(
    to top, 
    ${alpha(theme.palette.primary.main, 0.5)}, 
    rgba(0, 0, 0, 0)
    ) 1 100%`,
    borderBottomWidth: "0",
    "&& .MuiTouchRipple-child": {
      backgroundColor: alpha(theme.palette.primary.main, 1),
    },
  };
});

const FullscreenTab = () => {
  const [isFullscreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (!screenfull.isEnabled) {
      return;
    }

    function onChange() {
      setIsFullScreen((v) => !v);
    }

    screenfull.onchange(onChange);

    return () => screenfull.off("change", onChange);
  }, []);

  if (!screenfull.isEnabled) {
    return null;
  }

  return (
    <CustomTab
      label={isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      onClick={() => screenfull.toggle()}
      sx={{ p: "0 !important", minWidth: "50px" }}
      value={null}
    />
  );
};

export const LINKS = {
  QUESTS: "/quests",
  STORE: "/store",
  FAQ: "/faq",
  TERMS: "/terms",
};

export const USER_LINKS = {
  PROFILE: "/profile",
  WALLET: "/profile/wallet",
  LIST_ORDERS: "/profile/orders",
  CHECKOUT: "/checkout",
};

export default function Navbar() {
  const { t } = useTranslation("Navbar");
  const ethereum = useRecoilValue(ethereumState);
  const router = useRouter();

  const topMenu = useMemo(
    () =>
      [
        [t("Rewards"), LINKS.STORE],
        [t("Quests"), LINKS.QUESTS],
        [t("FAQ"), LINKS.FAQ],
        (ethereum.account ||
          [USER_LINKS.PROFILE, USER_LINKS.WALLET].includes(router.asPath)) && [
          t("Profile"),
          USER_LINKS.PROFILE,
        ],
      ].filter(Boolean),
    [t, ethereum.account, router]
  );

  const findLink = useCallback(
    () => topMenu.find(([, l]) => router.asPath.startsWith(l))?.[1] || false,
    [topMenu, router]
  );

  const eventTarget = useRecoilValue(eventTargetState);

  const [value, setValue] = useState(false);

  useEffect(() => {
    setValue(findLink());
  }, [findLink]);

  const handleChange = (event, newValue) => {
    if (!newValue) {
      return;
    }

    setValue(newValue);
    if (eventTarget && window.CustomEvent) {
      eventTarget.dispatchEvent(
        new window.CustomEvent(NAVBAR_CHANGE, {
          detail: {
            target: newValue,
          },
        })
      );
    }

    router.push(withLocale(router.locale, newValue));
  };

  useEffect(() => {
    Object.values(LINKS).forEach((link) =>
      router.prefetch(withLocale(router.locale, link))
    );
  }, [router]);

  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box>
      <Grid
        alignItems="center"
        container
        direction="row"
        justifyContent="space-between"
      >
        <Grid
          item
          lg={1}
          sx={{
            display: { xs: "none", lg: "block" },
            pl: 2,
            cursor: "pointer",
          }}
        >
          <img
            alt="Brute gg logo"
            height={32}
            onClick={() => handleChange(null, LINKS.STORE)}
            src="https://res.cloudinary.com/brutegg/image/upload/v1657234745/brutegg-swell/brute-logo_qwbsfz.svg"
          />
        </Grid>
        <Grid item lg={7} md={9} xs={12}>
          <Tabs
            aria-label="basic tabs example"
            indicatorColor="secondary"
            onChange={handleChange}
            value={value}
            variant="scrollable"
          >
            {isXs && screenfull.isEnabled && <FullscreenTab />}
            {topMenu.map(([label, tabValue]) => (
              <CustomTab
                key={tabValue}
                label={label}
                onClick={(e) => {
                  // reload page
                  if (value === tabValue) {
                    handleChange(e, tabValue);
                  }
                }}
                value={tabValue}
              />
            ))}
          </Tabs>
        </Grid>

        <Grid
          item
          lg={3}
          md={3}
          sx={{ display: { xs: "none", md: "block" }, textAlign: "right" }}
        >
          <Box sx={{ my: 1 }}>
            <MetamaskButton />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
