import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useState } from "react";
import swell from "swell-js";
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

async function getProducts() {
  /**
   * @type {{results: import("../../types/swell").Product[]}}
   */
  const products = await swell.products.list({ expand: ["variants"] });

  return products;
}

export async function getServerSideProps(context) {
  const products = await getProducts();
  return {
    props: { products },
  };
}

export default function Store(props) {
  const ethereum = useRecoilValue(ethereumState);

  const [, setProducts] = useRecoilState(productsState);
  const [productDisplayed, setProductDisplayed] = useState(false);

  const onStoreItemChange = useCallback(() => {
    setProductDisplayed(true);
  }, []);
  useEventTarget(STORE_ITEM_CHANGE, onStoreItemChange);

  useEffect(() => {
    setProducts(props.products.results);
  }, [props.products, setProducts]);

  useEffect(() => {
    console.log(ethereum);
  }, [ethereum]);

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
      <StoreLayout rightExpanded={productDisplayed}>
        <ProductList
          ssr={{ products: props.products.results }}
          stretched={productDisplayed}
        />

        <Fragment>
          <ProductDetailSkeleton />
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
  const products = _products.length ? _products : ssr.products;

  const [_selectedProductId, setSelectedProductId] =
    useState(selectedProductId);

  const onStoreItemChange = useCallback((event) => {
    setSelectedProductId(event.detail.product?.id);
  }, []);

  useEventTarget(STORE_ITEM_CHANGE, onStoreItemChange);

  useEffect(() => {
    getProducts().then(({ results }) => {
      setProducts(results);
    });
  }, [setProducts]);

  const gridItemAttrs = stretched
    ? STRETCHED_STORE_LIST_GRID
    : FULL_STORE_LIST_GRID;

  return (
    <Fragment>
      <Grid columns={12} container spacing={1}>
        {products.map((p) => {
          return (
            <Grid item key={p.id} {...gridItemAttrs}>
              <ProductListItem
                product={p}
                selected={p.id === _selectedProductId}
              />
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
