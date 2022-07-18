import PropTypes from "prop-types";
import { Fragment, useCallback, useState } from "react";
import Head from "next/head";
import StoreLayout from "../../components/store/store-layout";
import useEventTarget from "../../hooks/use-event-target";
import { ProductDetailSkeleton } from "../../components/store/product-detail-skeleton";
import { STORE_ITEM_CHANGE } from "../../state/event-target";
import { ProductDetailStickyWrapper } from "../../components/store/product-detail-sticky-wrapper";
import { getProductsQuery } from "../../libs/swell";
import ProductList, {
  scrollToProductId,
} from "../../components/store/product-list";
import { useMediaQuery } from "@mui/material";
import { dehydrate, QueryClient } from "react-query";

export async function getStaticProps(_context) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("products", getProductsQuery);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Store() {
  const [productSkeletonDisplayed, setProductSkeletonDisplayed] =
    useState(false);

  const onStoreItemChange = useCallback((event) => {
    setProductSkeletonDisplayed(true);

    setTimeout(() => {
      scrollToProductId(event.detail.product?.id);
    }, 0);
  }, []);
  useEventTarget(STORE_ITEM_CHANGE, onStoreItemChange);

  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Fragment>
      <Head>
        <title>Brute merch - Store</title>
      </Head>
      <StoreLayout
        centerHeadline={!productSkeletonDisplayed}
        displayHeadline={!isXs || !productSkeletonDisplayed}
        rightExpanded={productSkeletonDisplayed}
      >
        <ProductList
          displayHeadline={false}
          stretched={productSkeletonDisplayed}
        />

        <Fragment>
          <ProductDetailStickyWrapper>
            <ProductDetailSkeleton />
          </ProductDetailStickyWrapper>
        </Fragment>
      </StoreLayout>
    </Fragment>
  );
}

Store.propTypes = {
  products: PropTypes.shape({
    results: PropTypes.array,
  }),
};
