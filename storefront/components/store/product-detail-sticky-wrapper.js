import PropTypes from "prop-types";
import { Box } from "@mui/system";

export function ProductDetailStickyWrapper({ children }) {
  return (
    <Box
      sx={{
        position: "sticky",
        top: (theme) => theme.spacing(2),
        ml: { sm: 2 },
        height: (theme) => ({
          sm: `calc(100vh - ${theme.spacing(4)})`,
        }),
        border: "1px solid white",
      }}
    >
      {children}
    </Box>
  );
}

ProductDetailStickyWrapper.propTypes = {
  children: PropTypes.node,
};
