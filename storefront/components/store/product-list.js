import PropTypes from "prop-types";
import { Fragment, useCallback, useState } from "react";
import ProductListItem from "../../components/store/product-list-item";
import useEventTarget from "../../hooks/use-event-target";
import { Grid } from "@mui/material";
import { STORE_ITEM_CHANGE } from "../../state/event-target";
import pageSkeleton from "../../components/page-skeleton";
import { LINKS } from "../../components/navbar";
import { getProductsQuery } from "../../libs/swell";
import window from "../../libs/window";
import { useQuery } from "@tanstack/react-query";

export const STRETCHED_STORE_LIST_GRID = {
  lg: 15,
  md: 30,
  sm: 30,
  xs: 30,
};

export const FULL_STORE_LIST_GRID = {
  lg: 6,
  md: 10,
  sm: 15,
  xs: 30,
};

export const COLUMNS_COUNT = 30;

export const PRODUCT_ID_DATA_ATTR_NAME = "data-product-id";

export function scrollToProductId(id, attrs) {
  if (id && window.document) {
    const element = window.document.querySelector(
      `[${PRODUCT_ID_DATA_ATTR_NAME}="${id}"]`
    );

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        ...attrs,
      });
    }
  }
}

export default function ProductList({
  stretched,
  selectedProductId,
  displayHeadline = true,
}) {
  const { data: products, isLoading: productsLoading } = useQuery(
    ["products"],
    getProductsQuery
  );

  const [_selectedProductId, setSelectedProductId] =
    useState(selectedProductId);

  const onStoreItemChange = useCallback((event) => {
    setSelectedProductId(event.detail.product?.id);
  }, []);

  useEventTarget(STORE_ITEM_CHANGE, onStoreItemChange);

  const gridItemAttrs = stretched
    ? STRETCHED_STORE_LIST_GRID
    : FULL_STORE_LIST_GRID;

  if (productsLoading) {
    const StoreSkeleton = pageSkeleton[LINKS.STORE];

    return (
      <StoreSkeleton displayHeadline={displayHeadline} stretched={stretched} />
    );
  }

  return (
    <Fragment>
      <Grid
        columns={COLUMNS_COUNT}
        container
        spacing={1}
        sx={{ marginBottom: -1 }}
      >
        {products.results.map((p) => {
          const isSelectedProduct = p.id === _selectedProductId;
          return (
            <Grid
              item
              key={p.id}
              {...gridItemAttrs}
              {...{ [PRODUCT_ID_DATA_ATTR_NAME]: p.id }}
            >
              <ProductListItem product={p} selected={isSelectedProduct} />
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
}

ProductList.propTypes = {
  displayHeadline: PropTypes.bool,
  selectedProductId: PropTypes.string,
  stretched: PropTypes.bool,
};
