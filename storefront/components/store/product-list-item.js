import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { withLocale } from "../../libs/router";
import window from "../../libs/window";
import { eventTargetState } from "../../state/event-target";
import { ProductPropTypes } from "../../types/swell";

/**
 *
 * @param {object} params
 * @param {import("../../types/swell").Product} params.product
 */
export default function ProductListItem({ product }) {
  const router = useRouter();
  const eventTarget = useRecoilValue(eventTargetState);

  const goToProduct = useCallback(() => {
    if (eventTarget && window.CustomEvent) {
      eventTarget.dispatchEvent(
        new window.CustomEvent("/store/item", {
          detail: {
            product,
          },
        })
      );
    }
    router.push(
      withLocale(
        router.locale,
        "/store/item/" + product.id + "/" + product.slug
      )
    );
  }, [router, product, eventTarget]);

  return (
    <Box
      onClick={goToProduct}
      sx={{
        cursor: "pointer",
        p: 1,
        mb: 1,
        border: (theme) => "1px solid " + theme.palette.primary.light,
      }}
    >
      <span>{product.name}</span>
      <br />
      <br />
    </Box>
  );
}

ProductListItem.propTypes = {
  product: ProductPropTypes,
};
