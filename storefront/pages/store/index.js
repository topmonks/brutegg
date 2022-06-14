import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ethereumState } from "../../state/ethereum";
import { productsState } from "../../state/products";
import Head from "next/head";
import StoreLayout from "../../components/store-layout";
import useEventTarget from "../../hooks/useEventTarget";
import { ProductDetailSkeleton } from "../../components/store/product-detail-skeleton";
import { STORE_ITEM_CHANGE } from "../../state/event-target";
import { ProductDetailStickyWrapper } from "../../components/store/product-detail-sticky-wrapper";
import window from "../../libs/window";
import swell, { getProducts } from "../../libs/swell";
import ProductList from "../../components/store/product-list";

export async function getServerSideProps(_context) {
  const products = await getProducts();
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

    // eslint-disable-next-line no-undef
    setTimeout(() => {
      const clickedProductId = event.detail.product?.id;
      if (clickedProductId && window.document) {
        const element = window.document.querySelector(
          `[data-product-id="${clickedProductId}"]`
        );

        if (element) {
          element.scrollIntoView();
        }
      }
    }, 0);
  }, []);
  useEventTarget(STORE_ITEM_CHANGE, onStoreItemChange);

  useEffect(() => {
    setProducts(props.products.results);
  }, [props.products, setProducts]);

  useEffect(() => {
    console.log(ethereum);
  }, [ethereum]);

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
