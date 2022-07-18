import Head from "next/head";
import PropTypes from "prop-types";
import { Fragment, useCallback, useState } from "react";
import { dehydrate, QueryClient } from "react-query";
import { QuestDetailSkeleton } from "../../components/quests/quest-detail-skeleton";
import QuestList from "../../components/quests/quest-list";
import QuestsLayout from "../../components/quests/quests-layout";
import { ProductDetailStickyWrapper } from "../../components/store/product-detail-sticky-wrapper";
import { scrollToProductId } from "../../components/store/product-list";
import useEventTarget from "../../hooks/use-event-target";
import { getProducts } from "../../libs/swell";
import { QUESTS_ITEM_CHANGE } from "../../state/event-target";

export async function getStaticProps(_context) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("quests", () =>
    getProducts({
      category: "quests",
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Quests() {
  const [questSkeletonDisplayed, setQuestSkeletonDisplayed] = useState(false);

  const onStoreItemChange = useCallback((event) => {
    setQuestSkeletonDisplayed(true);

    setTimeout(() => {
      scrollToProductId(event.detail.product?.id);
    }, 0);
  }, []);
  useEventTarget(QUESTS_ITEM_CHANGE, onStoreItemChange);

  return (
    <Fragment>
      <Head>
        <title>Brute merch - Quests</title>
      </Head>
      <QuestsLayout rightExpanded={questSkeletonDisplayed}>
        <QuestList displayHeadline={false} stretched={questSkeletonDisplayed} />

        <Fragment>
          <ProductDetailStickyWrapper>
            <QuestDetailSkeleton />
          </ProductDetailStickyWrapper>
        </Fragment>
      </QuestsLayout>
    </Fragment>
  );
}

Quests.propTypes = {
  quests: PropTypes.shape({
    results: PropTypes.array,
  }),
};
