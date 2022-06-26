import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useState } from "react";
import StoreLayout from "../../../components/store/store-layout";
import ProductList, {
  scrollToProductId,
} from "../../../components/store/product-list";
import { ProductDetail } from "../../../components/store/product-detail";
import { ProductDetailSkeleton } from "../../../components/store/product-detail-skeleton";
import { ProductDetailStickyWrapper } from "../../../components/store/product-detail-sticky-wrapper";
import useEventTarget from "../../../hooks/use-event-target";
import { getProduct, getStoreProducts } from "../../../libs/swell";
import { STORE_ITEM_CHANGE } from "../../../state/event-target";
import { ProductPropTypes } from "../../../types/swell";
import { useMediaQuery } from "@mui/material";
import window from "../../../libs/window";

export async function getStaticPaths() {
  const products = await getStoreProducts({ category: "store" });

  const paths = products.results.map((p) => ({
    params: { slug: [p.id, p.slug] },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
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
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [productDisplayed, setProductDisplayed] = useState(true);

  const [selectedProductIdOnClick, setSelectedProductIdOnClick] = useState(id);

  const onStoreItemChange = useCallback(
    (event) => {
      const selectedProductId = event.detail.product?.id;
      if (!selectedProductId) {
        setProductDisplayed(false);

        setTimeout(() => {
          if (isXs) {
            scrollToProductId(id, { behavior: "auto", block: "start" });
          } else {
            window?.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 0);
      }

      setSelectedProductIdOnClick(selectedProductId);
    },
    [id, isXs]
  );

  useEffect(() => {
    setProductDisplayed(true);
  }, [product]);

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
