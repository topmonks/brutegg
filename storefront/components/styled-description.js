import PropTypes from "prop-types";
import { alpha, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

import { style } from "./double-border-box";

export default function StyledDescription({ children, rarity, sx, ...props }) {
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
        a: (theme) => ({
          color: theme.palette.primary.main,
          background: alpha(theme.palette.primary.main, 0.1),
          padding: 0.5,
          lineHeight: 2,
          textShadow: "0 0 5px black",
          fontWeight: "bold",
          textDecoration: "underline",
          borderRadius: 2,
        }),
        ...sx,
        "& img": (theme) => ({
          maxWidth: "100%",
          my: 2,
          [theme.breakpoints.up("sm")]: {
            ...style,
          },
          [theme.breakpoints.down("sm")]: {
            boxShadow: `0 0 0 1px  ${alpha(
              theme.palette.primary.main,
              0.4
            )}, 0 0 15px 0 #000`,
            mx: "auto",
            my: 1,
            display: "block",
          },
          padding: "5px !important",
        }),
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
