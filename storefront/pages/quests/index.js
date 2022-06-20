import Head from "next/head";
import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import QuestList from "../../components/quests/quest-list";
import { ProductDetailSkeleton } from "../../components/store/product-detail-skeleton";
import { ProductDetailStickyWrapper } from "../../components/store/product-detail-sticky-wrapper";
import { scrollToProductId } from "../../components/store/product-list";
import StoreLayout from "../../components/store/store-layout";
import useEventTarget from "../../hooks/useEventTarget";
import { getProducts } from "../../libs/swell";
import { QUESTS_ITEM_CHANGE } from "../../state/event-target";
import { questsState } from "../../state/quests";

export async function getStaticProps(_context) {
  const quests = await getProducts({ category: "quests" });
  return {
    props: { quests },
  };
}

export default function Quests(props) {
  const [, setQuests] = useRecoilState(questsState);
  const [questSkeletonDisplayed, setQuestSkeletonDisplayed] = useState(false);

  const onStoreItemChange = useCallback((event) => {
    setQuestSkeletonDisplayed(true);

    setTimeout(() => {
      scrollToProductId(event.detail.product?.id);
    }, 0);
  }, []);
  useEventTarget(QUESTS_ITEM_CHANGE, onStoreItemChange);

  useEffect(() => {
    setQuests(props.quests.results);
  }, [props.quests, setQuests]);

  return (
    <Fragment>
      <Head>
        <title>Brute merch - Quests</title>
      </Head>
      <StoreLayout rightExpanded={questSkeletonDisplayed}>
        <QuestList
          ssr={{ quests: props.quests.results }}
          stretched={questSkeletonDisplayed}
        />

        <Fragment>
          <ProductDetailStickyWrapper>
            <ProductDetailSkeleton />
          </ProductDetailStickyWrapper>
        </Fragment>
      </StoreLayout>
    </Fragment>
  );
}

Quests.propTypes = {
  quests: PropTypes.shape({
    results: PropTypes.array,
  }),
};
