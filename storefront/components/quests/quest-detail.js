import { IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { withLocale } from "../../libs/router";
import { getProduct } from "../../libs/swell";
import window from "../../libs/window";
import { eventTargetState, QUESTS_ITEM_CHANGE } from "../../state/event-target";
import { ProductPropTypes } from "../../types/swell";
import Close from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { productState } from "../../state/products";
import { useTranslation } from "react-i18next";
import StyledDescription from "../styled-description";

/**
 *
 * @param {Object} props
 * @param {import("../../types/swell").Product} props.product
 */
export function QuestDetail({ product: _product }) {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    slug: [id],
  } = router.query;

  const [refreshedProduct, setProduct] = useRecoilState(
    productState(_product.id)
  );

  const product = refreshedProduct ?? _product;

  // refresh product in browsers DOM
  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [setProduct, id]);

  const eventTarget = useRecoilValue(eventTargetState);

  const close = useCallback(() => {
    eventTarget.dispatchEvent(
      new window.CustomEvent(QUESTS_ITEM_CHANGE, {
        detail: {},
      })
    );
    router.push(withLocale(router.locale, "/quests"), null, { scroll: false });
  }, [router, eventTarget]);

  return (
    <Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", maxHeight: "100%" }}>
        <Box sx={{ flexGrow: 1, pb: 2 }}>
          <IconButton
            aria-label={t("Close", { ns: "Common" })}
            color="primary"
            onClick={close}
            size="large"
            sx={{ float: "right" }}
          >
            <Close />
          </IconButton>
          <Typography component="h1" variant="h3">
            {product.name}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 2, overflowY: "auto" }}>
          <StyledDescription
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></StyledDescription>
        </Box>
        <Box sx={{ flexGrow: 1, mt: 3 }}></Box>
      </Box>
    </Fragment>
  );
}

QuestDetail.propTypes = {
  product: ProductPropTypes,
};
