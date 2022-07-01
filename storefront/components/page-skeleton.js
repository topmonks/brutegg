import PropTypes from "prop-types";
import { Grid, Skeleton } from "@mui/material";

import { LINKS } from "./navbar";
import {
  COLUMNS_COUNT,
  FULL_STORE_LIST_GRID,
  STRETCHED_STORE_LIST_GRID,
} from "./store/product-list";
import { Fragment } from "react";
import useDisplayAfterDelay from "../hooks/use-display-after-delay";
import { QuestHeadline } from "./quests/quests-headline";
import { ProductsHeadline } from "./store/products-headline";

function QuestsSkeleton({ stretched, displayHeadline = true }) {
  const display = useDisplayAfterDelay(300);

  if (!display) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      {displayHeadline && <QuestHeadline />}
      <Grid container justifyContent={"center"} spacing={2} sx={{ mt: 0 }}>
        {new Array(20).fill().map((_, ix) => {
          return (
            <Grid item key={ix} xs={stretched ? 12 : 8}>
              <Skeleton animation="wave" height={75} variant="rectangular" />
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
}

QuestsSkeleton.propTypes = {
  displayHeadline: PropTypes.bool,
  stretched: PropTypes.bool,
};
function StoreSkeleton({ stretched, displayHeadline = true }) {
  const display = useDisplayAfterDelay(300);

  if (!display) {
    return <Fragment></Fragment>;
  }

  const gridItemAttrs = stretched
    ? STRETCHED_STORE_LIST_GRID
    : FULL_STORE_LIST_GRID;

  return (
    <Fragment>
      {displayHeadline && <ProductsHeadline />}

      <Grid columns={COLUMNS_COUNT} container spacing={2} sx={{ mt: 0 }}>
        {new Array(20).fill().map((_, ix) => {
          return (
            <Grid item key={ix} {...gridItemAttrs}>
              <Skeleton animation="wave" height={250} variant="rectangular" />
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
}

StoreSkeleton.propTypes = {
  displayHeadline: PropTypes.bool,
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
