import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { withLocale } from "../libs/router";
import { eventTargetState, NAVBAR_CHANGE } from "../state/event-target";
import { LINKS } from "./navbar";

export default function Footer() {
  const { t } = useTranslation();
  const router = useRouter();
  const eventTarget = useRecoilValue(eventTargetState);

  const handleChange = (event, newValue) => {
    if (eventTarget && window.CustomEvent) {
      console.log("FOOO");
      eventTarget.dispatchEvent(
        new window.CustomEvent(NAVBAR_CHANGE, {
          detail: {
            target: newValue,
          },
        })
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography
        onClick={(e) => handleChange(e, LINKS.TERMS)}
        variant="caption"
      >
        <Link href={withLocale(router.locale, LINKS.TERMS)}>
          {t("General terms and conditions", { ns: "Terms" })}
        </Link>
      </Typography>
    </Box>
  );
}
