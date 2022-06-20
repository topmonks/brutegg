import { Box } from "@mui/system";
import { Skeleton } from "@mui/material";
import { Fragment } from "react";
import useDisplayAfterDelay from "../../hooks/useDisplayAfterDelay";

export function QuestDetailSkeleton() {
  const display = useDisplayAfterDelay(200);

  if (!display) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Skeleton animation="wave" height={60} variant="rectangular" />
      <Box>
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
