import { Box } from "@mui/system";
import { Typography, Skeleton } from "@mui/material";
import { Fragment } from "react";
import useDisplayAfterDelay from "../../hooks/use-display-after-delay";

export function ProductDetailSkeleton() {
  const display = useDisplayAfterDelay(200);

  if (!display) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Skeleton animation="wave" height={"20%"} variant="rectangular" />

      <Box
        sx={{
          display: "flex",
          my: 1,
          height: "5%",
          justifyContent: "space-between",
        }}
      >
        <Skeleton
          animation="wave"
          height={"100%"}
          variant="rectangular"
          width={200}
        />
        <Skeleton
          animation="wave"
          height={"100%"}
          variant="rectangular"
          width={150}
        />
      </Box>

      <Skeleton animation="wave" height={"50%"} variant="rectangular" />
      <Skeleton
        animation="wave"
        height={"20%"}
        sx={{ mt: 1 }}
        variant="rectangular"
      />
    </Fragment>
  );
}
