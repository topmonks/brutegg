import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { withLocale } from "../../libs/router";
import swell, { getProduct } from "../../libs/swell";
import window from "../../libs/window";
import { eventTargetState, STORE_ITEM_CHANGE } from "../../state/event-target";
import { ProductPropTypes } from "../../types/swell";
import Close from "@mui/icons-material/Close";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Box } from "@mui/system";
import { productState } from "../../state/products";
import { useTranslation } from "react-i18next";
import StyledDescription from "../styled-description";

/**
 *
 * @param {Object} props
 * @param {import("../../types/swell").Product} props.product
 */
export function ProductDetail({ product: _product }) {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    slug: [id],
  } = router.query;

  const [refreshedProduct, setProduct] = useRecoilState(
    productState(_product.id)
  );

  const product = refreshedProduct ?? _product;

  // refresh product in browsers DOM
  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [setProduct, id]);

  const eventTarget = useRecoilValue(eventTargetState);

  const addToCart = useCallback(async () => {
    await swell.cart.addItem({
      product_id: product.id,
      quantity: 1,
    });
  }, [product]);

  const close = useCallback(() => {
    eventTarget.dispatchEvent(
      new window.CustomEvent(STORE_ITEM_CHANGE, {
        detail: {},
      })
    );
    router.push(withLocale(router.locale, "/store"), null, { scroll: false });
  }, [router, eventTarget]);

  return (
    <Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", maxHeight: "100%" }}>
        <Box sx={{ flexGrow: 1, pb: 2 }}>
          <Button
            onClick={close}
            startIcon={<Close />}
            sx={{ float: "right" }}
            variant="outlined"
          >
            {t("Close", { ns: "Common" })}
          </Button>
          <Typography component="h1" variant="h3">
            {product.name}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 2, overflowY: "auto" }}>
          <StyledDescription
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></StyledDescription>
        </Box>
        <Box sx={{ flexGrow: 1, mt: 3 }}>
          <Button
            disableElevation
            fullWidth
            onClick={addToCart}
            size="large"
            startIcon={<ShoppingCartCheckoutIcon />}
            sx={{ fontWeight: "bold" }}
            variant="contained"
          >
            {t("Buy", { ns: "Common" })}
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
}

ProductDetail.propTypes = {
  product: ProductPropTypes,
};
