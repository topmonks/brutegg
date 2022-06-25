import Head from "next/head";
import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { QuestDetailSkeleton } from "../../components/quests/quest-detail-skeleton";
import QuestList from "../../components/quests/quest-list";
import QuestsLayout from "../../components/quests/quests-layout";
import { ProductDetailStickyWrapper } from "../../components/store/product-detail-sticky-wrapper";
import { scrollToProductId } from "../../components/store/product-list";
import useEventTarget from "../../hooks/use-event-target";
import { getProducts } from "../../libs/swell";
import { QUESTS_ITEM_CHANGE } from "../../state/event-target";
import { questsState } from "../../state/quests";

export async function getStaticProps(_context) {
  const quests = await getProducts({
    category: "quests",
  });

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
      <QuestsLayout rightExpanded={questSkeletonDisplayed}>
        <QuestList
          ssr={{ quests: props.quests.results }}
          stretched={questSkeletonDisplayed}
        />

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
