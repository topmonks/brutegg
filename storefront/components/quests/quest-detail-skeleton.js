import { Box, alpha } from "@mui/system";
import { Skeleton } from "@mui/material";
import { Fragment } from "react";
import useDisplayAfterDelay from "../../hooks/use-display-after-delay";

export function QuestDetailSkeleton() {
  const display = useDisplayAfterDelay(200);

  if (!display) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          height: { xs: "70vh", sm: "100%" },
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            p: {
              xs: 1,
              md: 2,
              lg: 3,
            },
            width: { xs: "100%", md: "220px" },
            height: { xs: "150px", md: "60%" },
          }}
        >
          <Skeleton animation="pulse" height="100%" variant="rectangular" />
        </Box>
        <Box
          sx={{
            height: { xs: "calc(100% - 150px)", md: "100%" },
            width: { xs: "100%", md: "calc(100% - 220px)" },
            borderRight: { md: `1px solid ${alpha("#fff", 0.2)}` },
            p: {
              xs: 1,
              md: 2,
              lg: 3,
            },
          }}
        >
          <Skeleton animation="pulse" height="100%" variant="rectangular" />
        </Box>
      </Box>
    </Fragment>
  );
}
