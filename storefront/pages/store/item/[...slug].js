import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@mui/material";

import StoreLayout from "../../../components/store/store-layout";
import ProductList, {
  scrollToProductId,
} from "../../../components/store/product-list";
import { ProductDetail } from "../../../components/store/product-detail";
import { ProductDetailSkeleton } from "../../../components/store/product-detail-skeleton";
import { ProductDetailStickyWrapper } from "../../../components/store/product-detail-sticky-wrapper";
import useEventTarget from "../../../hooks/use-event-target";
import { getProduct, getStoreProducts } from "../../../libs/swell";
import { STORE_ITEM_CHANGE } from "../../../state/event-target";
import window from "../../../libs/window";
import { withSwellLanguageStaticProps } from "../../../libs/with-swell-language";

export async function getStaticPaths() {
  const products = await getStoreProducts({ category: "store" });

  const paths = products.results.map((p) => ({
    params: { slug: [p.slug] },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export const getStaticProps = withSwellLanguageStaticProps(
  async function getStaticProps(context) {
    const {
      slug: [id, slug],
    } = context.params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["products", id || slug], () =>
      getProduct(id || slug)
    );

    if (!queryClient.getQueryData(["products", id || slug])) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);

export default function Item() {
  const router = useRouter();
  const {
    slug: [slugOrId],
  } = router.query;
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [productDisplayed, setProductDisplayed] = useState(true);
  const { data: product } = useQuery(["products", slugOrId], () =>
    getProduct(slugOrId)
  );

  const id = product?.id;

  const [selectedProductIdOnClick, setSelectedProductIdOnClick] = useState(id);

  const onStoreItemChange = useCallback(
    (event) => {
      const selectedProductId = event.detail.product?.id;
      if (!selectedProductId) {
        setProductDisplayed(false);

        setTimeout(() => {
          if (isXs) {
            scrollToProductId(id, { behavior: "auto", block: "center" });
          } else {
            window?.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 0);
      }

      setSelectedProductIdOnClick(selectedProductId);
    },
    [id, isXs]
  );

  useEventTarget(STORE_ITEM_CHANGE, onStoreItemChange);

  return (
    <StoreLayout
      centerHeadline={false}
      displayHeadline={!isXs || !productDisplayed}
      rightExpanded={productDisplayed}
    >
      <ProductList
        displayHeadline={false}
        selectedProductId={id}
        stretched={productDisplayed}
      />

      <Fragment>
        <ProductDetailStickyWrapper>
          {selectedProductIdOnClick !== id ? (
            <ProductDetailSkeleton />
          ) : (
            <ProductDetail />
          )}
        </ProductDetailStickyWrapper>
      </Fragment>
    </StoreLayout>
  );
}
