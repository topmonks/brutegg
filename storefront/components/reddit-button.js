import { alpha, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function RedditButton(opts) {
  const { t } = useTranslation("Common");

  return (
    <Button
      color="reddit"
      disableElevation
      onClick={() => window.open("https://www.reddit.com/r/brute/", "_blank")}
      size="small"
      startIcon={
        <img
          src="https://res.cloudinary.com/brutegg/image/upload/v1657894505/brutegg-swell/reddit-icon_otxd5s.svg"
          width={30}
        />
      }
      sx={{
        borderRadius: 0,
        border: `1px solid ${alpha("#000", 0.5)}`,
        textTransform: "none",
        textAlign: "left",
        boxShadow: (theme) =>
          `inset 0 0 0 1px ${alpha("#fff", 0.2)}, 0 0 0 2px ${alpha(
            theme.palette.reddit.main,
            0.5
          )}`,
        "&:hover": {
          boxShadow: (theme) =>
            `inset 0 0 0 1px ${alpha("#fff", 0.2)}, 0 0 0 2px ${alpha(
              theme.palette.reddit.light,
              0.5
            )}`,
        },
      }}
      variant="contained"
      {...opts}
    >
      {t("Join reddit")}
    </Button>
  );
}
