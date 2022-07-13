import { Button, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { withLocale } from "../../libs/router";
import swell, { getProduct } from "../../libs/swell";
import window from "../../libs/window";
import { eventTargetState, NAVBAR_CHANGE } from "../../state/event-target";
import { ProductPropTypes } from "../../types/swell";
import { Box } from "@mui/system";
import { productState } from "../../state/products";
import { useTranslation } from "react-i18next";
import StyledDescription from "../styled-description";
import PriceTag from "../price-tag";
import { USER_LINKS } from "../navbar";
import { useQuery } from "react-query";
import ProductDetailGallery from "./product-detail-gallery";

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

  return (
    <Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", maxHeight: "100%" }}>
        <Box sx={{ flexGrow: 1, pb: 2 }}>
          <Typography component="h1" variant="h3Outglow">
            {product.name}
          </Typography>

          <Typography variant="subtitle1">
            {t(product.attributes.brute_rarity?.value, { ns: "Rarity" })}
          </Typography>
          <Typography variant="subtitle1">
            {t("Remaining rewards")}: {product.stock_level}
            {initialSupply && "/" + initialSupply}
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography component="span" sx={{ fontWeight: "bold" }} variant="h6">
            <PriceTag amount={product.attributes.brute_price?.value} />
          </Typography>
          <Button
            disableElevation
            disabled={cartIsLoading}
            onClick={isError ? refetch : () => setSelectedProduct(product)}
            size="large"
            startIcon={cartIsLoading && <CircularProgress size={20} />}
            sx={{ width: "250px" }}
            variant="contained"
          >
            {t("Get", { ns: "Common" })}
          </Button>
        </Box>
        <Box
          sx={{
            flexGrow: 5,
            overflowY: "auto",
            "& iframe": { width: "100%" },
          }}
        >
          <StyledDescription
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></StyledDescription>
        </Box>
        <Box sx={{ flexGrow: 1, mt: 1 }}>
          <ProductDetailGallery images={product.images} name={product.name} />
        </Box>
      </Box>
    </Fragment>
  );
}

ProductDetail.propTypes = {
  product: ProductPropTypes,
};
