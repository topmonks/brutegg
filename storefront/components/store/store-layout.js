import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { Fragment } from "react";
import { ProductsHeadline } from "./products-headline";

export default function StoreLayout({
  children,
  rightExpanded,
  displayHeadline = true,
}) {
  return (
    <Fragment>
      {displayHeadline && <ProductsHeadline />}
      <Grid container sx={{ mt: 2 }}>
        <Grid
          item
          sm={rightExpanded ? 5 : 12}
          sx={[rightExpanded && { display: { xs: "none", sm: "block" } }]}
        >
          {children[0]}
        </Grid>
        <Grid item sm={7} sx={[!rightExpanded && { display: "none" }]} xs={12}>
          {children[1]}
        </Grid>
      </Grid>
    </Fragment>
  );
}

StoreLayout.propTypes = {
  children: PropTypes.node,
  displayHeadline: PropTypes.bool,
  rightExpanded: PropTypes.bool,
};
