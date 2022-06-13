import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";
import { ProductList } from "..";
import StoreLayout from "../../../components/store-layout";
import { ProductDetailSkeleton } from "../../../components/store/product-detail-skeleton";
import useEventTarget from "../../../hooks/useEventTarget";
import { withLocale } from "../../../libs/router";
import { swell } from "../../../libs/swell";
import { ProductPropTypes } from "../../../types/swell";

async function getProduct(slugOrId) {
  /**
   * @type {{results: import("../../types/swell").Product}}
   */
  const product = await swell.products.get(slugOrId);

  return product;
}

export async function getServerSideProps(context) {
  const {
    slug: [id, slug],
  } = context.params;

  const product = await getProduct(id || slug);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
  };
}

export default function Item({ product }) {
  const router = useRouter();
  const {
    slug: [id, slug],
  } = router.query;
  const [productDisplayed, setProductDisplayed] = useState(true);

  const addToCart = useCallback(async () => {
    await swell.cart.addItem({
      product_id: product.id,
      quantity: 1,
    });
  }, [product]);

  const close = useCallback(() => {
    setProductDisplayed(false);
    router.push(withLocale(router.locale, "/store"));
  }, [router]);

  const [selectedProductIdOnClick, setSelectedProductIdOnClick] = useState(id);

  const onStoreItemChange = useCallback((event) => {
    setSelectedProductIdOnClick(event.detail.product.id);
  }, []);
  useEventTarget("/store/item", onStoreItemChange);

  return (
    <StoreLayout rightExpanded={productDisplayed}>
      <ProductList selectedProductId={id} stretched={productDisplayed} />

      <Fragment>
        {selectedProductIdOnClick !== id ? (
          <ProductDetailSkeleton />
        ) : (
          <Fragment>
            <Button onClick={close}>Close</Button>
            <div>
              Item id:{id}, slug: {slug}
            </div>
            <Button onClick={addToCart}>buy</Button>
          </Fragment>
        )}
      </Fragment>
    </StoreLayout>
  );
}

Item.propTypes = {
  product: ProductPropTypes,
};
