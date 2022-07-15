import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { useRecoilValue } from "recoil";
import useMetamaskUnlocked from "../hooks/use-metamask-unlocked";
import { ethereumState } from "../state/ethereum";
import { sessionState } from "../state/session";
import UnlockButton from "./unlock-button";
import MetamaskButton from "./web3/metamask-button";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import Link from "next/link";
import { withLocale } from "../libs/router";
import { useRouter } from "next/router";
import { LINKS } from "./navbar";
import BruteDivider from "./divider";
import BackToStoreButton from "./checkout/back-to-store-button";
import { Fragment } from "react";

const VerticalAlign = styled(Box)(({ theme }) => ({
  height: "60vh",
  [theme.breakpoints.down("sm")]: {
    height: "auto",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default function UnlockMetamaskLayout({
  needsConnected = true,
  needsUnlocked = true,
  backToStore = false,
  AlignProps,
  children,
}) {
  const { t } = useTranslation("UnlockMetamaskLayout");
  const ethereum = useRecoilValue(ethereumState);
  const session = useRecoilValue(sessionState);
  const router = useRouter();

  const isUnlocked = useMetamaskUnlocked(session?.address);

  const backToStoreFooter = (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <BruteDivider />
      <BackToStoreButton sx={{ my: 2 }} />
    </Box>
  );

  if (ethereum.account || !needsConnected) {
    if (isUnlocked || !needsUnlocked) {
      return children;
    } else {
      return (
        <Fragment>
          <VerticalAlign {...AlignProps}>
            <Box className="inner inner-unlock">
              <UnlockButton size="large" sx={{ fontWeight: "bold", mb: 2 }} />
              <Typography variant="body1">
                {t(
                  "In order for us to give you access to your account settings, you need to confirm your account from your wallet address via MetaMask."
                )}
              </Typography>
              <Typography
                sx={{ display: "inline-block", mt: 4 }}
                variant="body1"
              >
                {t("You don't know what to do next? Visit")}{" "}
                <Typography variant="link">
                  <Link href={withLocale(router.locale, LINKS.FAQ)}>
                    {t("help center")}
                  </Link>
                </Typography>
              </Typography>
            </Box>
          </VerticalAlign>
          {backToStore && backToStoreFooter}
        </Fragment>
      );
    }
  } else {
    return (
      <Fragment>
        <VerticalAlign {...AlignProps}>
          <Box className="inner inner-connect">
            <MetamaskButton />
            <Typography sx={{ mt: 2 }} variant="body1">
              {t("Start by connecting Metamask")}
            </Typography>
            <Typography sx={{ display: "inline-block", mt: 4 }} variant="body1">
              {t("You don't know what to do next? Visit")}{" "}
              <Typography variant="link">
                <Link href={withLocale(router.locale, LINKS.FAQ)}>
                  {t("help center")}
                </Link>
              </Typography>
            </Typography>
          </Box>
        </VerticalAlign>
        {backToStore && backToStoreFooter}
      </Fragment>
    );
  }
}

UnlockMetamaskLayout.propTypes = {
  AlignProps: PropTypes.object,
  backToStore: PropTypes.bool,
  children: PropTypes.node,
  needsConnected: PropTypes.bool,
  needsUnlocked: PropTypes.bool,
};
