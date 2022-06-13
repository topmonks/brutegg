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

  const expandProductSkeleton = useCallback(() => {
    setProductDisplayed(true);
  }, []);
  useEventTarget("/store/item", expandProductSkeleton);

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
        <ProductList ssr={{ products: props.products.results }} />

        <Fragment>SKELETON</Fragment>
      </StoreLayout>
    </Fragment>
  );
}

export function ProductList({ ssr = { products: [] } }) {
  const [_products, setProducts] = useRecoilState(productsState);
  const products = _products.length ? _products : ssr.products;

  useEffect(() => {
    getProducts().then(({ results }) => {
      setProducts(results);
    });
  }, [setProducts]);

  return (
    <Fragment>
      {products.map((p) => {
        return <ProductListItem key={p.id} product={p} />;
      })}
    </Fragment>
  );
}

ProductList.propTypes = {
  ssr: PropTypes.shape({
    products: PropTypes.array,
  }),
};

Store.propTypes = {
  products: PropTypes.shape({
    results: PropTypes.array,
  }),
};
