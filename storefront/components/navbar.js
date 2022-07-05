import { Tab, Tabs, alpha, Grid } from "@mui/material";
import Image from "next/image";
import { Box } from "@mui/system";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { withLocale } from "../libs/router";
import { useRecoilValue } from "recoil";
import { eventTargetState, NAVBAR_CHANGE } from "../state/event-target";
import { keyframes } from "@emotion/react";
import window from "../libs/window";
import styled from "@emotion/styled";
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

const CustomTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
  "&:hover": {
    animation: `${backgroundAnimation} 1s ease-out infinite alternate-reverse`,
    background: `radial-gradient(ellipse at 50% 300%, ${
      theme.palette.primary.main
    }, ${alpha(theme.palette.primary.main, 0)} 65%) center no-repeat`,
  },
  "&.Mui-selected": {
    background: `radial-gradient(ellipse at 50% 300%, ${
      theme.palette.primary.main
    }, ${alpha(theme.palette.primary.main, 0)} 80%) center no-repeat`,
    animation: `${backgroundAnimation} 1s ease-out`,
    color: "white",
  },
  fontSize: "20px",
  fontWeight: "bold",
  color: "white",
  textShadow: `0px 0px 12px ${theme.palette.primary.main}`,
}));

export const LINKS = {
  QUESTS: "/quests",
  STORE: "/store",
  FAQ: "/faq",
};

export const USER_LINKS = {
  PROFILE: "/profile",
  WALLET: "/profile/wallet",
  CHECKOUT: "/checkout",
};

export default function Navbar() {
  const { t } = useTranslation("Navbar");
  const ethereum = useRecoilValue(ethereumState);
  const router = useRouter();

  const topMenu = useMemo(
    () =>
      [
        [t("Quests"), LINKS.QUESTS],
        [t("Store"), LINKS.STORE],
        [t("FAQ"), LINKS.FAQ],
        ethereum.account && [t("Profile"), USER_LINKS.PROFILE],
      ].filter(Boolean),
    [t, ethereum.account]
  );

  const findLink = useCallback(
    () => topMenu.find(([, l]) => router.asPath.startsWith(l))?.[1] || false,
    [topMenu, router]
  );

  const eventTarget = useRecoilValue(eventTargetState);

  const [value, setValue] = useState(findLink());

  useEffect(() => {
    setValue(findLink());
  }, [findLink]);

  const handleChange = (event, newValue) => {
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

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Grid
        alignItems="flex-end"
        container
        direction="row"
        justifyContent="space-between"
      >
        <Grid item lg={5} sm={10} xs={12}>
          <Tabs
            aria-label="basic tabs example"
            indicatorColor="secondary"
            onChange={handleChange}
            value={value}
            variant="scrollable"
          >
            {topMenu.map(([label, value]) => (
              <CustomTab
                key={value}
                label={label}
                onClick={(e) => handleChange(e, value)}
                value={value}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item lg={1} sx={{ display: { xs: "none", lg: "block" }, my: 3 }}>
          <Image
            alt="Brute gg logo"
            height={47}
            src="/brute-logo.svg"
            width={143}
          />
        </Grid>
        <Grid
          item
          lg={5}
          sm={2}
          sx={{ display: { xs: "none", sm: "block" }, textAlign: "right" }}
        >
          <Box sx={{ mb: 1 }}>
            <MetamaskButton />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
