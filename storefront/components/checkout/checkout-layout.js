import { Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";

export default function CheckoutLayout({ children }) {
  return (
    <Grid container direction="row-reverse" spacing={2}>
      <Grid item sm={5} sx={{ display: "flex" }} xs={12}>
        <Divider
          flexItem
          orientation="vertical"
          sx={{ mr: { sm: 2, md: 5 }, display: { xs: "none", sm: "block" } }}
        />
        <Box sx={{ width: "100%" }}>{children[1]}</Box>
      </Grid>

      <Grid item sm={7} xs={12}>
        <Box
          sx={{
            pl: {
              md: 5,
            },
          }}
        >
          {children[0]}
        </Box>
      </Grid>
    </Grid>
  );
}

CheckoutLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};
