import { Typography } from "@mui/material";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Headline } from "../headline";

export function FAQHeadline() {
  const { t } = useTranslation("FAQ");

  return (
    <Headline
      headlineText={t("FAQ")}
      paragraph={
        t("Isn't there an answer to your question? Ask directly at") + " "
      }
      restText={
        <Typography sx={{ display: "inline" }} variant="link">
          <img
            height={15}
            src="https://res.cloudinary.com/brutegg/image/upload/v1657804667/brutegg-swell/discord-icon_vuz4qp.svg"
            style={{
              marginBottom: "-2px",
              marginRight: "3px",
              filter:
                "grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(1)",
            }}
          />
          <a
            href="https://discord.gg/B6JDmrFJ"
            rel="noreferrer"
            target="_blank"
          >
            Discord
          </a>
        </Typography>
      }
    />
  );
}
