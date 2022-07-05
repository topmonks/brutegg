import { Button, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { withLocale } from "../../libs/router";
import swell, { getProduct } from "../../libs/swell";
import window from "../../libs/window";
import {
  eventTargetState,
  NAVBAR_CHANGE,
  STORE_ITEM_CHANGE,
} from "../../state/event-target";
import { ProductPropTypes } from "../../types/swell";
import Close from "@mui/icons-material/Close";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Box } from "@mui/system";
import { productState } from "../../state/products";
import { useTranslation } from "react-i18next";
import StyledDescription from "../styled-description";
import PriceTag from "../price-tag";
import { LINKS, USER_LINKS } from "../navbar";

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

  const addToCart = useCallback(async () => {
    // clear cart, currently we don't support buying multiple items at once
    await swell.cart.setItems([]);

    await swell.cart.addItem({
      product_id: product.id,
      quantity: 1,
    });

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
  }, [product, router, eventTarget]);

  const close = useCallback(() => {
    eventTarget.dispatchEvent(
      new window.CustomEvent(STORE_ITEM_CHANGE, {
        detail: {},
      })
    );
    router.push(withLocale(router.locale, LINKS.STORE), null, {
      scroll: false,
    });
  }, [router, eventTarget]);

  const initialSupply = product.attributes.brute_initial_supply?.value;

  return (
    <Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", maxHeight: "100%" }}>
        <Box sx={{ flexGrow: 1, pb: 2 }}>
          <IconButton
            aria-label={t("Close", { ns: "Common" })}
            color="primary"
            onClick={close}
            size="large"
            sx={{ float: "right" }}
          >
            <Close />
          </IconButton>
          <Typography component="h1" variant="h3">
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="body" sx={{ fontWeight: "bold" }} variant="h6">
            <PriceTag amount={product.attributes.brute_price?.value} />
          </Typography>
          <Button
            disableElevation
            onClick={addToCart}
            size="large"
            startIcon={<ShoppingCartCheckoutIcon />}
            sx={{ fontWeight: "bold" }}
            variant="contained"
          >
            {t("Buy", { ns: "Common" })}
          </Button>
        </Box>
        <Box sx={{ flexGrow: 2, overflowY: "auto" }}>
          <StyledDescription
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></StyledDescription>
        </Box>
        <Box sx={{ flexGrow: 1, mt: 3 }}></Box>
      </Box>
    </Fragment>
  );
}

ProductDetail.propTypes = {
  product: ProductPropTypes,
};
