import { Box, Grid, Skeleton } from "@mui/material";
import { FULL_STORE_LIST_GRID } from "../pages/store";
import { LINKS } from "./navbar";

function QuestsSkeleton() {
  return "QUESTS SKELETON";
}
function StoreSkeleton() {
  return (
    <Grid container spacing={2}>
      {new Array(20).fill().map((_, ix) => {
        return (
          <Grid item key={ix} {...FULL_STORE_LIST_GRID}>
            <Skeleton animation="wave" height={250} variant="rectangular" />
          </Grid>
        );
      })}
    </Grid>
  );
}
function FaqSkeleton() {
  return "FAQ SKELETON";
}

export default {
  [LINKS.QUESTS]: QuestsSkeleton,
  [LINKS.STORE]: StoreSkeleton,
  [LINKS.FAQ]: FaqSkeleton,
};
