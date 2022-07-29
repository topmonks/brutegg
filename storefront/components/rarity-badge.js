import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import { Fragment } from "react";
import { alpha, Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function RarityBadge({ rarity }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const rarityColorHex =
    theme.palette[rarity]?.main || theme.palette.primary.main;

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            height: "20px",
            width: "20px",
            background: `linear-gradient(0deg, ${alpha(
              rarityColorHex,
              0.8
            )} 0%, ${alpha(rarityColorHex, 0.1)} 100%) center no-repeat`,
            boxShadow: `inset 0 0 1px 0 ${alpha(
              "#000",
              0.9
            )}, 0 0 2px 0 ${rarityColorHex}`,
          }}
        ></Box>
        <Typography variant="caption">{t(rarity, { ns: "Rarity" })}</Typography>
      </Box>
    </Fragment>
  );
}

RarityBadge.propTypes = {
  rarity: PropTypes.string,
};
