import PropTypes from "prop-types";
import { Grid, Skeleton } from "@mui/material";
import {
  FULL_STORE_LIST_GRID,
  STRETCHED_STORE_LIST_GRID,
} from "../pages/store";
import { LINKS } from "./navbar";

function QuestsSkeleton() {
  return "QUESTS SKELETON";
}
function StoreSkeleton({ stretched }) {
  const gridItemAttrs = stretched
    ? STRETCHED_STORE_LIST_GRID
    : FULL_STORE_LIST_GRID;

  return (
    <Grid container spacing={2}>
      {new Array(20).fill().map((_, ix) => {
        return (
          <Grid item key={ix} {...gridItemAttrs}>
            <Skeleton animation="wave" height={250} variant="rectangular" />
          </Grid>
        );
      })}
    </Grid>
  );
}

StoreSkeleton.propTypes = {
  stretched: PropTypes.bool,
};

function FaqSkeleton() {
  return "FAQ SKELETON";
}

export default {
  [LINKS.QUESTS]: QuestsSkeleton,
  [LINKS.STORE]: StoreSkeleton,
  [LINKS.FAQ]: FaqSkeleton,
};
