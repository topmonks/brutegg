import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { Fragment } from "react";
import { ProductsHeadline } from "./products-headline";

export default function StoreLayout({
  children,
  rightExpanded,
  displayHeadline = true,
  centerHeadline = false,
}) {
  return (
    <Fragment>
      {displayHeadline && <ProductsHeadline center={centerHeadline} />}
      <Grid container>
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
  centerHeadline: PropTypes.bool,
  children: PropTypes.node,
  displayHeadline: PropTypes.bool,
  rightExpanded: PropTypes.bool,
};
