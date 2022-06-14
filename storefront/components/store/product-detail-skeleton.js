import { Box } from "@mui/system";
import { Typography, Skeleton } from "@mui/material";
import { Fragment } from "react";
import useDisplayAfterDelay from "../../hooks/useDisplayAfterDelay";

export function ProductDetailSkeleton() {
  const display = useDisplayAfterDelay(200);

  if (!display) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Typography variant="button">
        <Skeleton animation="wave" />
      </Typography>
      <Box>
        <Typography variant="h1">
          <Skeleton animation="wave" />
        </Typography>
        <Skeleton
          animation="wave"
          height={350}
          sx={{
            mt: 1,
          }}
          variant="rectangular"
        />
      </Box>
    </Fragment>
  );
}
