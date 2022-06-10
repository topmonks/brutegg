import PropTypes from "prop-types";
import { inspect } from "util";
import { Fragment, useCallback } from "react";
import { swell } from "../../libs/swell";
import { Button } from "@mui/material";

export async function getServerSideProps(context) {
  /**
   * @type {{results: import("../../types/swell").Product[]}}
   */
  const products = await swell.products.list({ expand: ["variants"] });
  console.log(inspect(products.results[3], false, null, true));
  return {
    props: { products }, // will be passed to the page component as props
  };
}

export default function Store(props) {
  const addToCart = useCallback(async (p) => {
    await swell.cart.addItem({
      product_id: p.id,
      quantity: 1,
    });
  }, []);

  const checkout = useCallback(async () => {
    await swell.cart.update({
      account: {
        email: "jan.fabian+guest@topmonks.com",
      },
    });
    const cart = await swell.cart.get();

    await swell.cart.submitOrder();

    console.log(cart);
  }, []);

  return (
    <Fragment>
      <Button onClick={checkout}>checkout</Button>
      <br />
      {props.products.results.map((p) => {
        return (
          <Fragment key={p.id}>
            {p.name}
            <Button onClick={() => addToCart(p)}>buy</Button>
            <br />
            <br />
          </Fragment>
        );
      })}
    </Fragment>
  );
}

Store.propTypes = {
  products: PropTypes.shape({
    results: PropTypes.array,
  }),
};
