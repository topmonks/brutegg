import { Typography } from "@mui/material";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import ProfileLayout from "../../components/profile/profile-layout";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useRecoilValue } from "recoil";
import { ethereumState } from "../../state/ethereum";
import { green, red } from "@mui/material/colors";

export default function Wallet() {
  const { t } = useTranslation("Profile.Wallet");
  const ethereum = useRecoilValue(ethereumState);

  return (
    <ProfileLayout>
      <Fragment>
        <Typography component="h3" variant="h6">
          {t("MetaMask wallet settings")}
        </Typography>

        <Typography sx={{ fontWeight: "bold", mt: 3 }} variant="subtitle1">
          {t("Connected wallet")}
        </Typography>
        {ethereum.account ? (
          <Typography sx={{ display: "flex", mt: 1 }} variant="subtitle1">
            <CheckCircleOutlineIcon sx={{ color: green[500], mr: 1 }} />
            {ethereum.account}
          </Typography>
        ) : (
          <HighlightOffIcon sx={{ color: red[500], mr: 1 }} />
        )}
      </Fragment>
    </ProfileLayout>
  );
}
