import PropTypes from "prop-types";
import { Typography } from "@mui/material";

export default function StyledDescription({ children, ...props }) {
  return (
    <Typography
      component="div"
      sx={{
        mt: 2,
        "& h1, & h2, & h3, & h4": {
          textShadow: "0px 0px 12px #EA2122",
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
};
