import { Box } from "@mui/system";
import { Typography, Skeleton } from "@mui/material";
import { Fragment } from "react";

export function ProductDetailSkeleton() {
  return (
    <Fragment>
      <Typography variant="button">
        <Skeleton animation="wave" />
      </Typography>
      <Box>
        <Typography component="h1" variant="h3">
          <Skeleton animation="wave" />
        </Typography>
        <Skeleton
          animation="wave"
          height={500}
          sx={{
            mt: 2,
          }}
          variant="rectangular"
        />
      </Box>
    </Fragment>
  );
}
