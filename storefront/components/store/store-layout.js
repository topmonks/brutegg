import PropTypes from "prop-types";
import { Grid } from "@mui/material";

export default function StoreLayout({ children, rightExpanded }) {
  return (
    <Grid container>
      <Grid
        item
        sm={rightExpanded ? 6 : 12}
        sx={[rightExpanded && { display: { xs: "none", sm: "block" } }]}
      >
        {children[0]}
      </Grid>
      <Grid item sm={6} sx={[!rightExpanded && { display: "none" }]} xs={12}>
        {children[1]}
      </Grid>
    </Grid>
  );
}

StoreLayout.propTypes = {
  children: PropTypes.node,
  rightExpanded: PropTypes.bool,
};
