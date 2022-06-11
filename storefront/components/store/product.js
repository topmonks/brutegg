import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { withLocale } from "../../libs/router";
import { swell } from "../../libs/swell";
import { ProductPropTypes } from "../../types/swell";

/**
 *
 * @param {object} params
 * @param {import("../../types/swell").Product} params.product
 */
export default function Product({ product }) {
  const router = useRouter();
  const addToCart = useCallback(async () => {
    await swell.cart.addItem({
      product_id: product.id,
      quantity: 1,
    });
  }, [product]);

  return (
    <Box>
      <span
        onClick={() =>
          router.push(
            withLocale(
              router.locale,
              "/store/item/" + product.id + "/" + product.slug
            )
          )
        }
      >
        {product.name}
      </span>
      <Button onClick={addToCart}>buy</Button>
      <br />
      <br />
    </Box>
  );
}

Product.propTypes = {
  product: ProductPropTypes,
};
