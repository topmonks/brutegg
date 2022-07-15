import { alpha, Box, CircularProgress, Typography } from "@mui/material";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import ProfileLayout from "../../components/profile/profile-layout";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { ethereumState } from "../../state/ethereum";
import { green } from "@mui/material/colors";
import Link from "next/link";
import { withLocale } from "../../libs/router";
import { useRouter } from "next/router";
import { LINKS } from "../../components/navbar";
import MetamaskButton from "../../components/web3/metamask-button";
import DisconnectButton from "../../components/profile/disconnect-button";
import PriceTag from "../../components/price-tag";
import { bruteState } from "../../state/brute-token";

export default function Wallet() {
  const { t } = useTranslation("Profile.Wallet");
  const ethereum = useRecoilValue(ethereumState);
  const router = useRouter();
  const brute = useRecoilValueLoadable(bruteState);

  return (
    <ProfileLayout>
      <Fragment>
        <Typography component="h3" sx={{ fontWeight: "bold" }} variant="h6">
          {t("MetaMask wallet settings")}
        </Typography>
        {!ethereum.account && (
          <Fragment>
            <Typography sx={{ display: "inline-block", mt: 2 }} variant="body1">
              {t(
                "You don't have a wallet connected at the moment. Do you know how to do that?"
              )}{" "}
              <Typography variant="link">
                <Link href={withLocale(router.locale, LINKS.FAQ)}>
                  {t("Check here")}
                </Link>
              </Typography>
            </Typography>
            <Box sx={{ mt: 2 }}>
              <MetamaskButton />
            </Box>
          </Fragment>
        )}

        {ethereum.account && (
          <Box sx={{ borderLeft: `5px solid ${alpha("#fff", 0.2)}`, pl: 2 }}>
            <Typography sx={{ fontWeight: "bold", mt: 3 }} variant="subtitle1">
              {t("Connected wallet")}
            </Typography>

            <Typography
              sx={{ display: "flex", mt: 1, overflowWrap: "anywhere" }}
              variant="subtitle1"
            >
              <CheckCircleOutlineIcon sx={{ color: green[500], mr: 1 }} />
              {ethereum.account}
            </Typography>

            <Typography component="div" sx={{ mt: 2 }} variant="h6">
              <PriceTag
                amount={brute.contents?.account?.balance || ""}
                sx={{ fontWeight: "bold" }}
              >
                {brute.state === "loading" && <CircularProgress size={15} />}
              </PriceTag>
            </Typography>

            <Box sx={{ mt: 2 }}>
              <DisconnectButton />
            </Box>
          </Box>
        )}
      </Fragment>
    </ProfileLayout>
  );
}
