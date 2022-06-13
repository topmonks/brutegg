import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { withLocale } from "../../libs/router";
import { swell } from "../../libs/swell";
import window from "../../libs/window";
import { eventTargetState, STORE_ITEM_CHANGE } from "../../state/event-target";
import { ProductPropTypes } from "../../types/swell";

export function ProductDetail({ product }) {
  const router = useRouter();
  const eventTarget = useRecoilValue(eventTargetState);

  const {
    slug: [id, slug],
  } = router.query;

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
      <Button onClick={close}>Close</Button>
      <div>
        Item id:{id}, slug: {slug}
      </div>
      <Button onClick={addToCart}>buy</Button>
    </Fragment>
  );
}

ProductDetail.propTypes = {
  product: ProductPropTypes,
};
