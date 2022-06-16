import PropTypes from "prop-types";
import { Grid, Skeleton } from "@mui/material";

import { LINKS } from "./navbar";
import {
  FULL_STORE_LIST_GRID,
  STRETCHED_STORE_LIST_GRID,
} from "./store/product-list";
import { Fragment } from "react";
import useDisplayAfterDelay from "../hooks/useDisplayAfterDelay";

function QuestsSkeleton() {
  const display = useDisplayAfterDelay(400);

  if (!display) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Skeleton height={30} sx={{ mb: 2 }} variant="rectangular"></Skeleton>
      <Skeleton height={500} variant="rectangular"></Skeleton>
    </Fragment>
  );
}
function StoreSkeleton({ stretched }) {
  const display = useDisplayAfterDelay(300);

  if (!display) {
    return <Fragment></Fragment>;
  }

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
  const display = useDisplayAfterDelay(400);

  if (!display) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Skeleton height={30} sx={{ mb: 2 }} variant="rectangular"></Skeleton>
      <Skeleton height={500} variant="rectangular"></Skeleton>
    </Fragment>
  );
}

export default {
  [LINKS.QUESTS]: QuestsSkeleton,
  [LINKS.STORE]: StoreSkeleton,
  [LINKS.FAQ]: FaqSkeleton,
};
