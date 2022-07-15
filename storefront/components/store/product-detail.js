import {
  Button,
  CircularProgress,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, alpha } from "@mui/system";
import { useTheme } from "@emotion/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { withLocale } from "../../libs/router";
import swell, { getProduct } from "../../libs/swell";
import window from "../../libs/window";
import { eventTargetState, NAVBAR_CHANGE } from "../../state/event-target";
import { ProductPropTypes } from "../../types/swell";
import { productState } from "../../state/products";
import { useTranslation } from "react-i18next";
import StyledDescription from "../styled-description";
import PriceTag from "../price-tag";
import { USER_LINKS } from "../navbar";
import { useQuery } from "react-query";
import ProductDetailGallery from "./product-detail-gallery";
import BruteDivider from "../divider";

/**
 *
 * @param {Object} props
 * @param {import("../../types/swell").Product} props.product
 */
export function ProductDetail({ product: _product }) {
  const { t } = useTranslation("StoreItem");
  const router = useRouter();
  const {
    slug: [id],
  } = router.query;

  const [refreshedProduct, setProduct] = useRecoilState(
    productState(_product.id)
  );

  /**
   * @type {import("../../types/swell").Product}
   */
  const product = refreshedProduct ?? _product;

  // refresh product in browsers DOM
  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [setProduct, id]);

  const eventTarget = useRecoilValue(eventTargetState);

  const [selectedProduct, setSelectedProduct] = useState();

  const {
    isSuccess: cartIsUpdated,
    isLoading: cartIsLoading,
    isError,
    refetch,
  } = useQuery(
    ["/swell.cart.add/", selectedProduct?.id],
    async () => {
      // clear cart, currently we don't support buying multiple items at once
      await swell.cart.setItems([]);

      await swell.cart.addItem({
        product_id: product.id,
        quantity: 1,
      });
    },
    {
      enabled: Boolean(selectedProduct?.id),
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!cartIsUpdated) {
      return;
    }

    if (eventTarget && window.CustomEvent) {
      eventTarget.dispatchEvent(
        new window.CustomEvent(NAVBAR_CHANGE, {
          detail: {
            target: USER_LINKS.CHECKOUT,
          },
        })
      );
    }

    router.push(withLocale(router.locale, USER_LINKS.CHECKOUT));
  }, [cartIsUpdated, router, eventTarget]);

  const initialSupply = product.attributes.brute_initial_supply?.value;
  const rarity = product.attributes.brute_rarity?.value;
  const theme = useTheme();
  const rarityColorHex =
    theme.palette[rarity]?.main || theme.palette.primary.main;
  const creatorThumbnail =
    product.attributes.brute_creator_thumbnail?.value?.file;
  const creatorLink = product.attributes.brute_creator_link?.value;

  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", maxHeight: "100%" }}>
        <Box
          sx={{
            flexGrow: 1,
            pt: 3,
            pb: 2,
            px: 3,
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-start",
            background: `radial-gradient(ellipse at center bottom, ${alpha(
              rarityColorHex,
              0.2
            )}, ${alpha(rarityColorHex, 0)} 50%) center no-repeat`,
          }}
        >
          <Box>
            <Typography
              component="h1"
              sx={{
                textShadow: `0px 0px 12px ${rarityColorHex}`,
                maxHeight: { sm: "15vh", md: "none" },
                overflowY: { sm: "hidden", md: "visible" },
                textOverflow: "ellipsis",
              }}
              variant={isSm ? "h5Outglow" : "h4Outglow"}
            >
              {product.name}
            </Typography>
            {isSm && creatorThumbnail && (
              <Box
                sx={{
                  position: "relative",
                  height: "60px",
                  width: "60px",
                  float: "right",
                }}
              >
                <a href={creatorLink} rel="noreferrer" target="_blank">
                  <Image
                    height={creatorThumbnail.height}
                    layout="fill"
                    objectFit="contain"
                    src={creatorThumbnail.url}
                    width={creatorThumbnail.width}
                  />
                </a>
              </Box>
            )}
            <Box
              sx={{
                border: `2px solid ${rarityColorHex}`,
                display: "inline-block",
                pr: "20%",
                pl: 1,
                my: 1,
                maskImage: `-webkit-gradient(linear, left center, right center, 
                  color-stop(0.50,  rgba(0,0,0,1)),
                  color-stop(1.00,  rgba(0,0,0,0)))`,
                background: `linear-gradient(90deg, ${alpha(
                  rarityColorHex,
                  0.6
                )} 0%, ${alpha(rarityColorHex, 0)} 100%) center no-repeat`,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  textShadow: `0px 0px 12px ${rarityColorHex}`,
                }}
                variant="subtitle1"
              >
                {t(rarity, { ns: "Rarity" })}
              </Typography>
            </Box>
            <Typography
              sx={{
                textShadow: `0px 0px 12px ${rarityColorHex}, 0px 0px 4px ${rarityColorHex}`,
              }}
              variant="subtitle1"
            >
              {t("Remaining rewards")}: {product.stock_level}
              {initialSupply && "/" + initialSupply}
            </Typography>
          </Box>
          {creatorThumbnail && (
            <Box
              sx={{
                position: "relative",
                flex: "0 0 120px",
                height: "120px",
                display: { xs: "none", md: "block" },
              }}
            >
              <a href={creatorLink} rel="noreferrer" target="_blank">
                <Image
                  height={creatorThumbnail.height}
                  layout="fill"
                  objectFit="contain"
                  src={creatorThumbnail.url}
                  width={creatorThumbnail.width}
                />
              </a>
            </Box>
          )}
        </Box>
        <BruteDivider rarity={rarity} />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 1.5,
            px: 3,
          }}
        >
          <Typography component="span" sx={{ fontWeight: "bold" }} variant="h5">
            <PriceTag amount={product.attributes.brute_price?.value} />
          </Typography>
          <Button
            disableElevation
            disabled={cartIsLoading || cartIsUpdated}
            onClick={isError ? refetch : () => setSelectedProduct(product)}
            size="large"
            startIcon={
              (cartIsLoading || cartIsUpdated) && <CircularProgress size={20} />
            }
            sx={{ width: { sm: "250px" } }}
            variant="contained"
          >
            {t("Get", { ns: "Common" })}
          </Button>
        </Box>
        <Divider sx={{ borderBottomWidth: "medium" }} />
        <Box
          sx={{
            flexGrow: 5,
            overflowY: "auto",
            px: 3,
            pt: 1,
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "& iframe": { width: "100%" },
          }}
        >
          <StyledDescription
            dangerouslySetInnerHTML={{ __html: product.description }}
            rarity={rarity}
          ></StyledDescription>
        </Box>
        <Divider sx={{ borderBottomWidth: "medium" }} />
        <Box sx={{ flexGrow: 1, pl: 1 }}>
          <ProductDetailGallery images={product.images} name={product.name} />
        </Box>
      </Box>
    </Fragment>
  );
}

ProductDetail.propTypes = {
  product: ProductPropTypes,
};
