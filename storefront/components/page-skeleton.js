import PropTypes from "prop-types";
import { Box, Grid, Skeleton, useMediaQuery } from "@mui/material";

import { LINKS, USER_LINKS } from "./navbar";
import {
  COLUMNS_COUNT,
  FULL_STORE_LIST_GRID,
  STRETCHED_STORE_LIST_GRID,
} from "./store/product-list";
import { Fragment } from "react";
import useDisplayAfterDelay from "../hooks/use-display-after-delay";
import { QuestHeadline } from "./quests/quests-headline";
import { ProductsHeadline } from "./store/products-headline";
import ProfileLayout from "./profile/profile-layout";
import CheckoutLayout from "./checkout/checkout-layout";
import { CheckoutHeadline } from "./checkout/checkout-headline";
import DoubleBorderBox from "./double-border-box";

function QuestsSkeleton({
  stretched: _stretched,
  fromMainNavigation = false,
  displayHeadline = true,
}) {
  const display = useDisplayAfterDelay(0);
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  if (!display) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      {displayHeadline && <QuestHeadline />}

      <Grid container justifyContent={"center"}>
        <Grid item sm={fromMainNavigation ? 8 : 12} xs={12}>
          <DoubleBorderBox
            sx={[
              fromMainNavigation && { mt: 2 },
              {
                width: "100%",
                p: (theme) => ({
                  xs: theme.spacing(1) + " !important",
                  md: theme.spacing(2) + " !important",
                }),
              },
            ]}
          >
            {new Array(20).fill().map((_, ix) => {
              return (
                <Skeleton
                  animation="wave"
                  height={isXs ? 120 : 75}
                  key={ix}
                  sx={{ mb: 1 }}
                  variant="rectangular"
                />
              );
            })}
          </DoubleBorderBox>
        </Grid>
      </Grid>
    </Fragment>
  );
}

QuestsSkeleton.propTypes = {
  displayHeadline: PropTypes.bool,
  fromMainNavigation: PropTypes.bool,
  stretched: PropTypes.bool,
};

function StoreSkeleton({ stretched, displayHeadline = true }) {
  const display = useDisplayAfterDelay(0);

  if (!display) {
    return <Fragment></Fragment>;
  }

  const gridItemAttrs = stretched
    ? STRETCHED_STORE_LIST_GRID
    : FULL_STORE_LIST_GRID;

  return (
    <Fragment>
      {displayHeadline && <ProductsHeadline center />}

      <Grid
        columns={COLUMNS_COUNT}
        container
        spacing={1}
        sx={[!stretched && { mt: 1 }]}
      >
        {new Array(20).fill().map((_, ix) => {
          return (
            <Grid item key={ix} {...gridItemAttrs}>
              <Skeleton animation="wave" height={300} variant="rectangular" />
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
  const display = useDisplayAfterDelay(0);

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

function ProfileSkeleton() {
  const display = useDisplayAfterDelay(0);

  if (!display) {
    return <Fragment></Fragment>;
  }

  return (
    <ProfileLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: { md: "60%" },
        }}
      >
        <Skeleton
          animation="pulse"
          height={50}
          variant="rectangular"
          width={250}
        ></Skeleton>
        <Skeleton
          animation="pulse"
          height={30}
          sx={{ mt: 2 }}
          variant="rectangular"
          width={250}
        ></Skeleton>

        {new Array(3).fill().map((a, ix) => (
          <Skeleton
            animation="pulse"
            height={50}
            key={ix}
            variant="rectangular"
          ></Skeleton>
        ))}

        <Skeleton
          animation="pulse"
          height={30}
          sx={{ mt: 2 }}
          variant="rectangular"
          width={250}
        ></Skeleton>

        {new Array(3).fill().map((a, ix) => (
          <Skeleton
            animation="pulse"
            height={50}
            key={ix}
            variant="rectangular"
          ></Skeleton>
        ))}

        <Skeleton
          animation="pulse"
          height={30}
          sx={{ mt: 2 }}
          variant="rectangular"
          width={250}
        ></Skeleton>

        {new Array(3).fill().map((a, ix) => (
          <Skeleton
            animation="pulse"
            height={50}
            key={ix}
            variant="rectangular"
          ></Skeleton>
        ))}
      </Box>
    </ProfileLayout>
  );
}

function CheckoutSkeleton() {
  const display = useDisplayAfterDelay(0);

  if (!display) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Box sx={{ mb: 2 }}>
        <CheckoutHeadline />
      </Box>

      <CheckoutLayout>
        <Fragment>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: { md: "60%" },
            }}
          >
            <Skeleton
              animation="pulse"
              height={50}
              variant="rectangular"
              width={250}
            ></Skeleton>
            <Skeleton
              animation="pulse"
              height={30}
              variant="rectangular"
              width={250}
            ></Skeleton>
            {new Array(5).fill().map((a, ix) => (
              <Skeleton
                animation="pulse"
                height={50}
                key={ix}
                variant="rectangular"
              ></Skeleton>
            ))}
          </Box>
        </Fragment>
        <Fragment>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: { md: "60%" },
            }}
          >
            <Skeleton
              animation="pulse"
              height={50}
              variant="rectangular"
            ></Skeleton>
            <Skeleton
              animation="pulse"
              height={30}
              variant="rectangular"
            ></Skeleton>
          </Box>
        </Fragment>
      </CheckoutLayout>
    </Fragment>
  );
}

CheckoutSkeleton.hideNavbar = true;

export default {
  [LINKS.QUESTS]: QuestsSkeleton,
  [LINKS.STORE]: StoreSkeleton,
  [LINKS.FAQ]: FaqSkeleton,
  [USER_LINKS.PROFILE]: ProfileSkeleton,
  [USER_LINKS.CHECKOUT]: CheckoutSkeleton,
};
