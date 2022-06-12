import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect } from "react";
import swell from "swell-js";
import { Button } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { ethereumState } from "../../state/ethereum";
import Product from "../../components/store/product";
import { productsState } from "../../state/products";

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
    props: { products }, // will be passed to the page component as props
  };
}

export default function Store(props) {
  const ethereum = useRecoilValue(ethereumState);

  const [products, setProducts] = useRecoilState(productsState);

  useEffect(() => {
    setProducts(props.products.results);
  }, [props.products, setProducts]);

  useEffect(() => {
    getProducts().then(({ results }) => {
      setProducts(results);
    });
  }, [setProducts]);

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
      <Button onClick={checkout}>checkout</Button>
      <br />
      {products.map((p) => {
        return <Product key={p.id} product={p} />;
      })}
    </Fragment>
  );
}

Store.propTypes = {
  products: PropTypes.shape({
    results: PropTypes.array,
  }),
};
