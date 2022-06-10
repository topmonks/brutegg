import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback } from "react";
import { swell } from "../../libs/swell";
import { ProductPropTypes } from "../../types/swell";

/**
 *
 * @param {object} params
 * @param {import("../../types/swell").Product} params.product
 */
export default function Product({ product }) {
  const addToCart = useCallback(async () => {
    await swell.cart.addItem({
      product_id: product.id,
      quantity: 1,
    });
  }, [product]);

  return (
    <Box>
      {product.name}
      <Button onClick={addToCart}>buy</Button>
      <br />
      <br />
    </Box>
  );
}

Product.propTypes = {
  product: ProductPropTypes,
};
