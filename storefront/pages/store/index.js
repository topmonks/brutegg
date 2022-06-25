import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ethereumState } from "../../state/ethereum";
import { productsState } from "../../state/products";
import Head from "next/head";
import StoreLayout from "../../components/store/store-layout";
import useEventTarget from "../../hooks/use-event-target";
import { ProductDetailSkeleton } from "../../components/store/product-detail-skeleton";
import { STORE_ITEM_CHANGE } from "../../state/event-target";
import { ProductDetailStickyWrapper } from "../../components/store/product-detail-sticky-wrapper";
import swell, { getStoreProducts } from "../../libs/swell";
import ProductList, {
  scrollToProductId,
} from "../../components/store/product-list";

export async function getStaticProps(_context) {
  const products = await getStoreProducts({
    expand: ["attributes"],
    sort: "attributes.brute_price desc",
  });
  return {
    props: { products },
  };
}

export default function Store(props) {
  const ethereum = useRecoilValue(ethereumState);

  const [, setProducts] = useRecoilState(productsState);
  const [productSkeletonDisplayed, setProductSkeletonDisplayed] =
    useState(false);

  const onStoreItemChange = useCallback((event) => {
    setProductSkeletonDisplayed(true);

    setTimeout(() => {
      scrollToProductId(event.detail.product?.id);
    }, 0);
  }, []);
  useEventTarget(STORE_ITEM_CHANGE, onStoreItemChange);

  useEffect(() => {
    setProducts(props.products.results);
  }, [props.products, setProducts]);

  const _checkout = useCallback(async () => {
    await swell.cart.update({
      account: {
        email: "0x1C8fF2d39bf4d08C23A24e24fb6dF4818ac45325@polygon.com",
      },
    });
    const cart = await swell.cart.get();

    // await swell.cart.submitOrder();

    console.log(cart);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Brute merch - Store</title>
      </Head>
      <StoreLayout rightExpanded={productSkeletonDisplayed}>
        <ProductList
          ssr={{ products: props.products.results }}
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
