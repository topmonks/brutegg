import PropTypes from "prop-types";
import { Grid } from "@mui/material";

export default function QuestsLayout({ children, rightExpanded }) {
  return (
    <Grid container justifyContent={rightExpanded ? "flex-start" : "center"}>
      <Grid
        item
        sm={rightExpanded ? 5 : 8}
        sx={[rightExpanded && { display: { xs: "none", sm: "block" } }]}
        xs={12}
      >
        {children[0]}
      </Grid>
      <Grid item sm={7} sx={[!rightExpanded && { display: "none" }]} xs={12}>
        {children[1]}
      </Grid>
    </Grid>
  );
}

QuestsLayout.propTypes = {
  children: PropTypes.node,
  rightExpanded: PropTypes.bool,
};
