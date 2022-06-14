import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ethereumState } from "../../state/ethereum";
import ProductListItem from "../../components/store/product-list-item";
import { productsState } from "../../state/products";
import Head from "next/head";
import StoreLayout from "../../components/store-layout";
import useEventTarget from "../../hooks/useEventTarget";
import { Grid } from "@mui/material";
import { ProductDetailSkeleton } from "../../components/store/product-detail-skeleton";
import { STORE_ITEM_CHANGE } from "../../state/event-target";
import { ProductDetailStickyWrapper } from "../../components/store/product-detail-sticky-wrapper";
import pageSkeleton from "../../components/page-skeleton";
import { LINKS } from "../../components/navbar";
import window from "../../libs/window";
import swell, { getProducts } from "../../libs/swell";

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

  // eslint-disable-next-line no-unused-vars
  const checkout = useCallback(async () => {
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

export const STRETCHED_STORE_LIST_GRID = {
  xxl: 4,
  lg: 6,
  md: 12,
  sm: 12,
  xs: 12,
};

export const FULL_STORE_LIST_GRID = {
  lg: 3,
  md: 4,
  sm: 6,
  xs: 12,
};

export function ProductList({
  ssr = { products: [] },
  stretched,
  selectedProductId,
}) {
  const [_products, setProducts] = useRecoilState(productsState);
  const [productsLoading, setProductsLoading] = useState(false);
  const products = _products.length ? _products : ssr.products;

  const [_selectedProductId, setSelectedProductId] =
    useState(selectedProductId);

  const onStoreItemChange = useCallback((event) => {
    setSelectedProductId(event.detail.product?.id);
  }, []);

  useEventTarget(STORE_ITEM_CHANGE, onStoreItemChange);

  useEffect(() => {
    setProductsLoading(true);
    getProducts()
      .then(({ results }) => {
        setProducts(results);
      })
      .finally(() => setProductsLoading(false));
  }, [setProducts]);

  const gridItemAttrs = stretched
    ? STRETCHED_STORE_LIST_GRID
    : FULL_STORE_LIST_GRID;

  if (productsLoading && !products.length) {
    const StoreSkeleton = pageSkeleton[LINKS.STORE];

    return <StoreSkeleton stretched={stretched} />;
  }

  return (
    <Fragment>
      <Grid columns={12} container spacing={1}>
        {products.map((p) => {
          const isSelectedProduct = p.id === _selectedProductId;
          return (
            <Grid item key={p.id} {...gridItemAttrs} data-product-id={p.id}>
              <ProductListItem product={p} selected={isSelectedProduct} />
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
}

ProductList.propTypes = {
  selectedProductId: PropTypes.string,
  ssr: PropTypes.shape({
    products: PropTypes.array,
  }),
  stretched: PropTypes.bool,
};

Store.propTypes = {
  products: PropTypes.shape({
    results: PropTypes.array,
  }),
};
