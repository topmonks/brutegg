import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

export default function StyledDescription({ children, rarity, ...props }) {
  const theme = useTheme();
  const _color = theme.palette[rarity]?.main || theme.palette.primary.main;

  return (
    <Typography
      component="div"
      sx={{
        mt: 2,
        "& h1, & h2, & h3, & h4": {
          mb: 1,
          // textShadow: () => `0px 0px 12px ${color}`,
        },
      }}
      variant="body1"
      {...props}
    >
      {children}
    </Typography>
  );
}

StyledDescription.propTypes = {
  children: PropTypes.node,
  rarity: PropTypes.string,
};
