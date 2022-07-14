import PropTypes from "prop-types";
import DoubleBorderBox from "../double-border-box";

export function ProductDetailStickyWrapper({ children }) {
  return (
    <DoubleBorderBox
      sx={{
        position: { xs: "relative", sm: "sticky" },
        top: (theme) => ({
          sm: theme.spacing(2),
        }),
        ml: { sm: 2 },
        height: (theme) => ({
          sm: `calc(100vh - ${theme.spacing(4)})`,
        }),
        border: "1px solid white",
      }}
    >
      {children}
    </DoubleBorderBox>
  );
}

ProductDetailStickyWrapper.propTypes = {
  children: PropTypes.node,
};
