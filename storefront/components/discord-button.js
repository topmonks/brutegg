import { alpha, Button, keyframes } from "@mui/material";
import { useTranslation } from "react-i18next";

const spinIcon = keyframes`
  20% { 
    transform:rotate(380deg); 
  } 
  40% { 
    transform:rotate(-20deg); 
  } 
`;

export default function DiscordButton(opts) {
  const { t } = useTranslation("Common");

  return (
    <Button
      color="discord"
      disableElevation
      onClick={() => window.open("https://discord.gg/B6JDmrFJ", "_blank")}
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
        "&:hover": {
          boxShadow: (theme) =>
            `inset 0 0 0 1px ${alpha("#fff", 0.2)}, 0 0 0 2px ${alpha(
              theme.palette.discord.light,
              0.5
            )}`,
          "& img": {
            animation: `${spinIcon} 3s ease infinite`,
          },
        },
      }}
      variant="contained"
      {...opts}
    >
      {t("Ask the community")}
    </Button>
  );
}
