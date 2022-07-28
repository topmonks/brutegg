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
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap-reverse",
        textAlign: "center",
        "& a": {
          transition: "color 0.2s ease",
          "& img": {
            transition: "filter 0.2s ease",
          },
        },
        "& a:hover": (theme) => ({
          color: theme.palette.primary.main,
          "& img": {
            filter:
              "grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-50deg) saturate(800%) contrast(1)",
          },
        }),
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

      <Typography
        onClick={(e) => handleChange(e, LINKS.PRIVACY_POLICY)}
        variant="caption"
      >
        <Link href={withLocale(router.locale, LINKS.PRIVACY_POLICY)}>
          {t("Privacy policy", { ns: "Privacy Policy" })}
        </Link>
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", sm: "normal" },
          gap: 2,
          ml: { xs: 0, sm: 4 },
          width: { xs: "300px", sm: "auto" },
        }}
      >
        <a href="https://discord.gg/B6JDmrFJ" rel="noreferrer" target="_blank">
          <img
            height={20}
            src="https://res.cloudinary.com/brutegg/image/upload/v1657804667/brutegg-swell/discord-icon_vuz4qp.svg"
          />
        </a>
        <a
          href="https://www.reddit.com/r/brute/"
          rel="noreferrer"
          target="_blank"
        >
          <img
            height={20}
            src="https://res.cloudinary.com/brutegg/image/upload/v1657894505/brutegg-swell/reddit-icon_otxd5s.svg"
          />
        </a>
        <a
          href="https://github.com/topmonks/brutegg"
          rel="noreferrer"
          target="_blank"
        >
          <img
            height={20}
            src="https://res.cloudinary.com/brutegg/image/upload/v1659002418/brutegg-swell/github-icon_uqjtgo.svg"
          />
        </a>
      </Box>
    </Box>
  );
}
