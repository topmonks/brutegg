import PropTypes from "prop-types";
import { Box, Grid, Skeleton, useMediaQuery } from "@mui/material";
import { Fragment } from "react";

import { LINKS, USER_LINKS } from "./navbar";
import {
  COLUMNS_COUNT,
  FULL_STORE_LIST_GRID,
  STRETCHED_STORE_LIST_GRID,
} from "./store/product-list";
import { ProductsHeadline } from "./store/products-headline";
import ProfileLayout from "./profile/profile-layout";
import CheckoutLayout from "./checkout/checkout-layout";
import { CheckoutHeadline } from "./checkout/checkout-headline";
import DoubleBorderBox from "./double-border-box";
import QuestsLayout from "./quests/quests-layout";
import { ProductDetailStickyWrapper } from "./store/product-detail-sticky-wrapper";
import { QuestDetailSkeleton } from "./quests/quest-detail-skeleton";
import FAQLayout from "./faq/faq-layout";
import TermsLayout from "./terms/terms-layout";

function QuestsSkeleton({
  stretched: _stretched,
  fromMainNavigation = false,
  displayHeadline = true,
}) {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const questListSkeleton = (
    <DoubleBorderBox
      sx={[
        {
          width: "100%",
          p: (theme) => ({
            xs: theme.spacing(1) + " !important",
            md: theme.spacing(2) + " !important",
          }),
          "& .MuiSkeleton-root:last-child": {
            mb: 0,
          },
        },
      ]}
    >
      {new Array(7).fill().map((_, ix) => {
        return (
          <Skeleton
            animation="wave"
            height={isXs ? 130 : 90}
            key={ix}
            sx={{ mb: 2 }}
            variant="rectangular"
          />
        );
      })}
    </DoubleBorderBox>
  );

  return (
    <Fragment>
      {fromMainNavigation ? (
        <QuestsLayout displayHeadline={displayHeadline} rightExpanded={!isXs}>
          {questListSkeleton}

          <Fragment>
            <ProductDetailStickyWrapper>
              <QuestDetailSkeleton />
            </ProductDetailStickyWrapper>
          </Fragment>
        </QuestsLayout>
      ) : (
        <Fragment>{questListSkeleton}</Fragment>
      )}
    </Fragment>
  );
}

QuestsSkeleton.propTypes = {
  displayHeadline: PropTypes.bool,
  fromMainNavigation: PropTypes.bool,
  stretched: PropTypes.bool,
};

function StoreSkeleton({ stretched, displayHeadline = true }) {
  const gridItemAttrs = stretched
    ? STRETCHED_STORE_LIST_GRID
    : FULL_STORE_LIST_GRID;

  return (
    <Fragment>
      {displayHeadline && <ProductsHeadline center />}

      <Grid columns={COLUMNS_COUNT} container spacing={1}>
        {new Array(20).fill().map((_, ix) => {
          return (
            <Grid item key={ix} {...gridItemAttrs}>
              <Skeleton animation="pulse" height={300} variant="rectangular" />
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
  return (
    <FAQLayout>
      <Skeleton height={40} sx={{ mb: 3 }} variant="rectangular"></Skeleton>
      <Skeleton height={500} variant="rectangular"></Skeleton>
    </FAQLayout>
  );
}

function TermsSkeleton() {
  return (
    <TermsLayout>
      <Skeleton height={40} sx={{ mb: 3 }} variant="rectangular"></Skeleton>
      <Skeleton height={500} variant="rectangular"></Skeleton>
    </TermsLayout>
  );
}

function PrivacyPolicySkeleton() {
  return (
    <TermsLayout>
      <Skeleton height={40} sx={{ mb: 3 }} variant="rectangular"></Skeleton>
      <Skeleton height={500} variant="rectangular"></Skeleton>
    </TermsLayout>
  );
}

function ProfileSkeleton() {
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
              m: {
                xs: 1,
                sm: 2,
                md: 3,
                lg: 5,
              },
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
              m: {
                xs: 1,
                sm: 2,
                md: 3,
                lg: 5,
              },
            }}
          >
            <Skeleton
              animation="pulse"
              height={100}
              variant="rectangular"
            ></Skeleton>
            <Skeleton
              animation="pulse"
              height={40}
              sx={{ mt: 2 }}
              variant="rectangular"
            ></Skeleton>
            <Skeleton
              animation="pulse"
              height={40}
              sx={{ mt: 2 }}
              variant="rectangular"
            ></Skeleton>
            <Skeleton
              animation="pulse"
              height={40}
              sx={{ mt: 2 }}
              variant="rectangular"
            ></Skeleton>
          </Box>
        </Fragment>
      </CheckoutLayout>
    </Fragment>
  );
}

CheckoutSkeleton.hideNavbar = true;
CheckoutSkeleton.hideFooter = true;

export default {
  [LINKS.QUESTS]: QuestsSkeleton,
  [LINKS.STORE]: StoreSkeleton,
  [LINKS.FAQ]: FaqSkeleton,
  [LINKS.TERMS]: TermsSkeleton,
  [LINKS.PRIVACY_POLICY]: PrivacyPolicySkeleton,
  [USER_LINKS.PROFILE]: ProfileSkeleton,
  [USER_LINKS.CHECKOUT]: CheckoutSkeleton,
};
