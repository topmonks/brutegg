import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { withLocale } from "../../libs/router";
import window from "../../libs/window";
import { eventTargetState, STORE_ITEM_CHANGE } from "../../state/event-target";
import { ProductPropTypes } from "../../types/swell";

/**
 *
 * @param {object} params
 * @param {import("../../types/swell").Product} params.product
 */
export default function ProductListItem({ product, selected }) {
  const router = useRouter();
  const eventTarget = useRecoilValue(eventTargetState);

  const goToProduct = useCallback(() => {
    if (eventTarget && window.CustomEvent) {
      eventTarget.dispatchEvent(
        new window.CustomEvent(STORE_ITEM_CHANGE, {
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
      ),
      undefined,
      { scroll: false }
    );
  }, [router, product, eventTarget]);

  return (
    <Box
      onClick={goToProduct}
      sx={[
        {
          height: "250px",
          cursor: "pointer",
          p: 1,
          mb: 1,
          border: (theme) => "1px solid " + theme.palette.primary.light,
        },
        selected && {
          background: (theme) => theme.palette.primary.light,
          color: "black",
        },
      ]}
    >
      <span>{product.name}</span>
      <br />
      <br />
    </Box>
  );
}

ProductListItem.propTypes = {
  product: ProductPropTypes,
  selected: PropTypes.bool,
};
