import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Grid, Typography, alpha } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { withLocale } from "../../libs/router";
import window from "../../libs/window";
import { eventTargetState, STORE_ITEM_CHANGE } from "../../state/event-target";
import { ProductPropTypes } from "../../types/swell";
import Image from "next/image";

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

  useEffect(() => {
    router.prefetch(
      withLocale(
        router.locale,
        "/store/item/" + product.id + "/" + product.slug
      )
    );
  }, [router, product]);

  const thumbnail =
    product?.attributes.brute_thumbnail?.value?.file ||
    product.images?.[0]?.file;

  return (
    <Box
      onClick={goToProduct}
      sx={[
        {
          height: "300px",
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
        <Grid
          item
          sx={[
            { height: "70%", position: "relative" },
            selected && {
              boxShadow: () => "0 0 0 2px " + alpha("#000", 0.3),
            },
          ]}
        >
          {thumbnail && (
            <Image
              height={thumbnail.height}
              layout="fill"
              objectFit="cover"
              src={thumbnail.url}
              width={thumbnail.width}
            />
          )}
        </Grid>
        <Grid
          item
          sx={{
            height: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            component="h3"
            display="block"
            sx={{
              textAlign: "center",
            }}
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
