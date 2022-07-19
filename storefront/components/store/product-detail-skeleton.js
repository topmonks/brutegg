import { Box } from "@mui/system";
import { Skeleton } from "@mui/material";
import { Fragment } from "react";
import useDisplayAfterDelay from "../../hooks/use-display-after-delay";

export function ProductDetailSkeleton() {
  const display = useDisplayAfterDelay(200);

  if (!display) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Box sx={{ height: { xs: "20vh", sm: "22%" }, px: 3, py: 2 }}>
        <Skeleton animation="wave" height="100%" variant="rectangular" />
      </Box>

      <Box
        sx={{
          display: "flex",
          px: 3,
          height: "50px",
          justifyContent: "space-between",
        }}
      >
        <Skeleton
          animation="wave"
          height={"100%"}
          sx={{
            width: {
              xs: "100px",
              lg: "200px",
            },
          }}
          variant="rectangular"
        />
        <Skeleton
          animation="wave"
          height={"100%"}
          sx={{
            width: {
              xs: "100px",
              lg: "250px",
            },
          }}
          variant="rectangular"
        />
      </Box>

      <Box sx={{ height: { xs: "40vh", sm: "47%" }, px: 3, py: 2 }}>
        <Skeleton animation="wave" height="100%" variant="rectangular" />
      </Box>
      <Box
        sx={{ height: { xs: "15vh", sm: "calc(30% - 50px)" }, px: 1, pb: 1 }}
      >
        <Skeleton animation="wave" height="100%" variant="rectangular" />
      </Box>
    </Fragment>
  );
}
