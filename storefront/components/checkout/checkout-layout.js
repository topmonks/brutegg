import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";

export default function CheckoutLayout({ children }) {
  return (
    <Grid container direction="row-reverse">
      <Grid item md={3} sm={5} xs={12}>
        {children[1]}
      </Grid>
      <Grid item md={9} sm={7} xs={12}>
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
