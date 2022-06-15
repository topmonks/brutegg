import { Tab, Tabs, alpha, Grid } from "@mui/material";
import Image from "next/image";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { withLocale } from "../libs/router";
import { useRecoilValue } from "recoil";
import { eventTargetState, NAVBAR_CHANGE } from "../state/event-target";
import { keyframes } from "@emotion/react";
import window from "../libs/window";
import styled from "@emotion/styled";
import MetamaskButton from "./web3/metamask-button";

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
    animation: `${backgroundAnimation} 1s ease-out`,
    background: `radial-gradient(ellipse at 50% 300%, ${
      theme.palette.primary.main
    }, ${alpha(theme.palette.primary.main, 0)} 60%) center no-repeat`,
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

export default function Navbar() {
  const router = useRouter();
  const findLink = useCallback(
    () => Object.values(LINKS).find((l) => router.asPath.startsWith(l)),
    [router.asPath]
  );
  const eventTarget = useRecoilValue(eventTargetState);

  const [value, setValue] = useState(findLink());

  useEffect(() => {
    const link = findLink();
    if (link) {
      setValue(link);
    }
  }, [findLink]);

  const { t } = useTranslation("Navbar");

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

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Grid
        alignItems="baseline"
        container
        direction="row"
        justifyContent="space-between"
      >
        <Grid item md={5} sm={10} xs={12}>
          <Tabs
            aria-label="basic tabs example"
            indicatorColor="secondary"
            onChange={handleChange}
            value={value}
            variant="scrollable"
          >
            {[
              [t("Quests"), LINKS.QUESTS],
              [t("Store"), LINKS.STORE],
              [t("FAQ"), LINKS.FAQ],
            ].map(([label, value]) => (
              <CustomTab
                key={value}
                label={label}
                onClick={(e) => handleChange(e, value)}
                value={value}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item md={1} sx={{ display: { xs: "none", md: "block" } }}>
          <Image
            alt="Brute gg logo"
            height={150}
            src="/brute-logo.svg"
            width={200}
          />
        </Grid>
        <Grid
          item
          md={5}
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
