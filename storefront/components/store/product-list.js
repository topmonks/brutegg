import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ProductListItem from "../../components/store/product-list-item";
import { productsState } from "../../state/products";
import useEventTarget from "../../hooks/use-event-target";
import { Grid } from "@mui/material";
import { STORE_ITEM_CHANGE } from "../../state/event-target";
import pageSkeleton from "../../components/page-skeleton";
import { LINKS } from "../../components/navbar";
import { getStoreProducts } from "../../libs/swell";
import window from "../../libs/window";

export const STRETCHED_STORE_LIST_GRID = {
  xxl: 10,
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
  ssr = { products: [] },
  stretched,
  selectedProductId,
  displayHeadline = true,
}) {
  const [_products, setProducts] = useRecoilState(productsState);

  const [productsLoading, setProductsLoading] = useState(false);
  const products = _products.length ? _products : ssr.products;

  const [_selectedProductId, setSelectedProductId] =
    useState(selectedProductId);

  const onStoreItemChange = useCallback((event) => {
    setSelectedProductId(event.detail.product?.id);
  }, []);

  useEventTarget(STORE_ITEM_CHANGE, onStoreItemChange);

  useEffect(() => {
    setProductsLoading(true);
    getStoreProducts({
      expand: ["attributes"],
      sort: "attributes.brute_price desc",
    })
      .then(({ results }) => {
        setProducts(results);
      })
      .finally(() => setProductsLoading(false));
  }, [setProducts]);

  const gridItemAttrs = stretched
    ? STRETCHED_STORE_LIST_GRID
    : FULL_STORE_LIST_GRID;

  if (productsLoading && !products.length) {
    const StoreSkeleton = pageSkeleton[LINKS.STORE];

    return (
      <StoreSkeleton displayHeadline={displayHeadline} stretched={stretched} />
    );
  }

  return (
    <Fragment>
      <Grid columns={COLUMNS_COUNT} container spacing={1}>
        {products.map((p) => {
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
  ssr: PropTypes.shape({
    products: PropTypes.array,
  }),
  stretched: PropTypes.bool,
};
