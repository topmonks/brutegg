import { alpha, Box, useTheme } from "@mui/system";
import PropTypes from "prop-types";

export default function BruteDivider({ rarity = "primary", ...opts }) {
  const theme = useTheme();
  const color = theme.palette[rarity]?.main || theme.palette.primary.main;
  return (
    <Box
      sx={{
        height: "2px",
        width: "100%",
        background: `linear-gradient(-90deg, ${alpha(color, 0)} 0%, ${alpha(
          color,
          1
        )} 50%, ${alpha(color, 0)} 100%)`,
        ...opts,
      }}
    />
  );
}

BruteDivider.propTypes = {
  rarity: PropTypes.string,
};
