import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Avatar, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { withLocale } from "../../libs/router";
import window from "../../libs/window";
import { eventTargetState, STORE_ITEM_CHANGE } from "../../state/event-target";
import { ProductPropTypes } from "../../types/swell";

/**
 *
 * @param {object} params
 * @param {import("../../types/swell").Product} params.product
 */
export default function ProductListItem({ product, selected }) {
  const router = useRouter();
  const eventTarget = useRecoilValue(eventTargetState);

  const goToProduct = useCallback(() => {
    if (eventTarget && window.CustomEvent) {
      eventTarget.dispatchEvent(
        new window.CustomEvent(STORE_ITEM_CHANGE, {
          detail: {
            product,
          },
        })
      );
    }
    router.push(
      withLocale(
        router.locale,
        "/store/item/" + product.id + "/" + product.slug
      ),
      undefined,
      { scroll: false }
    );
  }, [router, product, eventTarget]);

  return (
    <Box
      onClick={goToProduct}
      sx={[
        {
          height: "250px",
          cursor: "pointer",
          p: 1,
          mb: 1,
          border: (theme) => "1px solid " + theme.palette.primary.light,
        },
        selected && {
          background: (theme) => theme.palette.primary.light,
          color: "black",
        },
      ]}
    >
      <Grid
        alignItems="stretch"
        container
        direction="column"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <Grid item sx={{ height: "70%" }}>
          <Avatar
            sx={{
              mx: "auto",
              mt: 2,
              width: 100,
              height: 100,
              fontWeight: "bold",
              color: (theme) =>
                selected ? theme.palette.primary.light : "black",
              bgcolor: (theme) =>
                selected ? "black" : theme.palette.primary.light,
            }}
          >
            {product.name
              .split(" ")
              .map((w) => w.charAt(0))
              .join("")}
          </Avatar>
        </Grid>
        <Grid item sx={{ height: "30%" }}>
          <Typography
            component="h3"
            display="block"
            sx={{ textAlign: "center" }}
            variant="h6"
          >
            {product.name}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

ProductListItem.propTypes = {
  product: ProductPropTypes,
  selected: PropTypes.bool,
};
