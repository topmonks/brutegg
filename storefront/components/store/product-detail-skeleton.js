import { Box } from "@mui/system";
import { Skeleton, useMediaQuery } from "@mui/material";
import { Fragment } from "react";
import useDisplayAfterDelay from "../../hooks/use-display-after-delay";

export function ProductDetailSkeleton() {
  const display = useDisplayAfterDelay(200);
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  if (!display) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Box sx={{ height: "20%", px: 3, py: 2 }}>
        <Skeleton animation="wave" height="100%" variant="rectangular" />
      </Box>

      <Box
        sx={{
          display: "flex",
          px: 3,
          height: "40px",
          justifyContent: "space-between",
        }}
      >
        <Skeleton
          animation="wave"
          height={"100%"}
          variant="rectangular"
          width={isXs ? 120 : 200}
        />
        <Skeleton
          animation="wave"
          height={"100%"}
          variant="rectangular"
          width={isXs ? 120 : 250}
        />
      </Box>

      <Box sx={{ height: "50%", px: 3, py: 2 }}>
        <Skeleton animation="wave" height="100%" variant="rectangular" />
      </Box>
      <Box sx={{ height: "calc(30% - 40px)", px: 1, pb: 1 }}>
        <Skeleton animation="wave" height="100%" variant="rectangular" />
      </Box>
    </Fragment>
  );
}
