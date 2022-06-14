import { Grid, Typography } from "@mui/material";

export default function Custom500() {
  return (
    <Grid
      alignItems="center"
      container
      direction="column"
      justifyContent="center"
      sx={{ height: "80vh" }}
    >
      <Grid item>
        <Typography component="h1" variant="h3">
          500 - Server-side error occurred
        </Typography>
      </Grid>
    </Grid>
  );
}
