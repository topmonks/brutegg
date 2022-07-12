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
import BruteDivider from "../divider";
import PriceTag from "../price-tag";

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

  const rarity = product.attributes.brute_rarity?.value || "primary";
  const price = product.attributes.brute_price?.value;

  const initialSupply = product.attributes.brute_initial_supply?.value;

  return (
    <Box
      onClick={goToProduct}
      sx={[
        {
          height: "300px",
          cursor: "pointer",
          p: 1,
          mb: 1,
          border: (theme) =>
            "1px solid " + alpha(theme.palette[rarity]?.main, 0.0),
          background: (theme) =>
            `linear-gradient(-180deg, ${alpha(
              theme.palette[rarity]?.main,
              0.4
            )} 0%, ${alpha(theme.palette[rarity]?.main, 0)} 55%), ${alpha(
              "#fff",
              0.1
            )}`,
          boxShadow: () => "inset 0 0 0 1px " + alpha("#fff", 0.2),
        },
        selected && {
          background: (theme) =>
            `linear-gradient(-180deg, ${alpha(
              theme.palette[rarity]?.main,
              0.6
            )} 0%, ${alpha(theme.palette[rarity]?.main, 0)} 40%), ${alpha(
              "#fff",
              0.1
            )}`,
          border: (theme) =>
            "1px solid " + alpha(theme.palette[rarity]?.main, 1),
          boxShadow: (theme) =>
            "0 0 0 3px " + alpha(theme.palette[rarity]?.main, 0.8),
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
            {
              height: "70%",
              position: "relative",
              display: "flex",
              alignItems: "center",
            },
            selected && {
              "& img": {
                filter: (theme) =>
                  `drop-shadow(0 0 20px ${alpha(
                    theme.palette[rarity]?.main,
                    0.7
                  )}) drop-shadow(0 0 10px ${alpha(
                    theme.palette[rarity]?.main,
                    0.9
                  )})`,
              },
            },
          ]}
        >
          {thumbnail && (
            <Box
              sx={{
                height: "100%",
                width: "100%",
                position: "relative",
                "& img": {
                  p: "25px !important",
                  transition: "0.5s filter ease",
                  filter: (theme) =>
                    `drop-shadow(0 0 20px ${alpha(
                      theme.palette[rarity]?.main,
                      0.5
                    )}) drop-shadow(0 0 5px ${alpha(
                      theme.palette[rarity]?.main,
                      0.9
                    )})`,
                },
                "&:hover img": {
                  filter: (theme) =>
                    `drop-shadow(0 0 20px ${alpha(
                      theme.palette[rarity]?.main,
                      0.7
                    )}) drop-shadow(0 0 10px ${alpha(
                      theme.palette[rarity]?.main,
                      0.9
                    )})`,
                },
              }}
            >
              <Image
                height={thumbnail.height}
                layout="fill"
                objectFit="contain"
                src={thumbnail.url}
                width={thumbnail.width}
              />
              <Box
                sx={{
                  position: "absolute",
                  height: "60%",
                  left: 0,
                  right: 0,
                  margin: "auto",
                  top: "15%",
                  aspectRatio: "1/1",
                  borderRadius: "50%",
                  zIndex: -1,
                  border: (theme) =>
                    "2px solid " + alpha(theme.palette[rarity]?.main, 0.4),
                  boxShadow: (theme) =>
                    "0 0 20px 2px " + alpha(theme.palette[rarity]?.main, 0.3),
                }}
              />
            </Box>
          )}
        </Grid>
        <Grid
          item
          sx={{
            height: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography
            component="h3"
            display="block"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              textShadow: (theme) =>
                "0 0 10px " + alpha(theme.palette[rarity]?.main, 0.8),
            }}
            variant="body1"
          >
            {product.name}
          </Typography>
          <BruteDivider rarity={rarity} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              px: 1,
            }}
          >
            <Typography
              sx={{
                textShadow: (theme) =>
                  `0 0 10px ${alpha(
                    theme.palette[rarity]?.main,
                    0.8
                  )}, 0 0 2px ${alpha(theme.palette[rarity]?.main, 0.8)}`,
              }}
            >
              {product.stock_level}
              {initialSupply && "/" + initialSupply}
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              {price && <PriceTag amount={price} />}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

ProductListItem.propTypes = {
  product: ProductPropTypes,
  selected: PropTypes.bool,
};
