import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import DoubleBorderBox from "../double-border-box";

export default function CheckoutLayout({ children }) {
  return (
    <Grid container direction="row-reverse" spacing={2}>
      <Grid item sm={5} xs={12}>
        <DoubleBorderBox sx={{ height: "100%" }}>{children[1]}</DoubleBorderBox>
      </Grid>

      <Grid item sm={7} xs={12}>
        <DoubleBorderBox>{children[0]}</DoubleBorderBox>
      </Grid>
    </Grid>
  );
}

CheckoutLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};
