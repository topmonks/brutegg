import { alpha, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function DiscordButton() {
  const { t } = useTranslation("Common");

  return (
    <Button
      color="discord"
      disableElevation
      size="small"
      startIcon={
        <img src="https://res.cloudinary.com/brutegg/image/upload/v1657804667/brutegg-swell/discord-icon_vuz4qp.svg" />
      }
      sx={{
        borderRadius: 0,
        border: `1px solid ${alpha("#000", 0.5)}`,
        textTransform: "none",
        textAlign: "left",
        boxShadow: (theme) =>
          `inset 0 0 0 1px ${alpha("#fff", 0.2)}, 0 0 0 2px ${alpha(
            theme.palette.discord.main,
            0.5
          )}`,
      }}
      variant="contained"
    >
      {t("Ask the community")}
    </Button>
  );
}
