import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";
import { ProductList } from "..";
import StoreLayout from "../../../components/store-layout";
import { ProductDetail } from "../../../components/store/product-detail";
import { ProductDetailSkeleton } from "../../../components/store/product-detail-skeleton";
import { ProductDetailStickyWrapper } from "../../../components/store/product-detail-sticky-wrapper";
import useEventTarget from "../../../hooks/useEventTarget";
import { swell } from "../../../libs/swell";
import { STORE_ITEM_CHANGE } from "../../../state/event-target";
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
    slug: [id],
  } = router.query;
  const [productDisplayed, setProductDisplayed] = useState(true);

  const [selectedProductIdOnClick, setSelectedProductIdOnClick] = useState(id);

  const onStoreItemChange = useCallback((event) => {
    const selectedProductId = event.detail.product?.id;
    if (!selectedProductId) {
      setProductDisplayed(false);
    }
    setSelectedProductIdOnClick(selectedProductId);
  }, []);
  useEventTarget(STORE_ITEM_CHANGE, onStoreItemChange);

  return (
    <StoreLayout rightExpanded={productDisplayed}>
      <ProductList selectedProductId={id} stretched={productDisplayed} />

      <Fragment>
        <ProductDetailStickyWrapper>
          {selectedProductIdOnClick !== id ? (
            <ProductDetailSkeleton />
          ) : (
            <ProductDetail product={product} />
          )}
        </ProductDetailStickyWrapper>
      </Fragment>
    </StoreLayout>
  );
}

Item.propTypes = {
  product: ProductPropTypes,
};
