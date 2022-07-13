import PropTypes from "prop-types";
import DoubleBorderBox from "../double-border-box";

export function ProductDetailStickyWrapper({ children }) {
  return (
    <DoubleBorderBox
      sx={{
        position: "sticky",
        top: (theme) => theme.spacing(2),
        ml: { sm: 2 },
        height: (theme) => ({
          xs: `calc(100vh - ${theme.spacing(6)} - 60px)`,
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
