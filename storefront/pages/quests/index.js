import Head from "next/head";
import PropTypes from "prop-types";
import { Fragment, useCallback, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { QuestDetail } from "../../components/quests/quest-detail";
import { QuestDetailSkeleton } from "../../components/quests/quest-detail-skeleton";
import QuestList from "../../components/quests/quest-list";
import QuestsLayout from "../../components/quests/quests-layout";
import { ProductDetailStickyWrapper } from "../../components/store/product-detail-sticky-wrapper";
import { scrollToProductId } from "../../components/store/product-list";
import useEventTarget from "../../hooks/use-event-target";
import { getQuestsQuery } from "../../libs/swell";
import { QUESTS_ITEM_CHANGE } from "../../state/event-target";

export async function getStaticProps(_context) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["quests"], getQuestsQuery);

  const firstQuest = queryClient.getQueryData(["quests"]).results[0];

  if (firstQuest) {
    await queryClient.prefetchQuery(
      ["quests", firstQuest?.id],
      () => firstQuest
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Quests() {
  const { data: quests } = useQuery(["quests"], getQuestsQuery);
  const firstQuest = quests?.results[0];
  const firstQuestId = firstQuest?.id;

  const [selectedQuestIdOnClick, setSelectedQuestIdOnClick] =
    useState(firstQuestId);

  const [questSkeletonDisplayed, setQuestSkeletonDisplayed] = useState(
    Boolean(firstQuest)
  );

  const onStoreItemChange = useCallback((event) => {
    const selectedQuestId = event.detail.quest?.id;
    setQuestSkeletonDisplayed(true);
    setSelectedQuestIdOnClick(selectedQuestId);

    setTimeout(() => {
      scrollToProductId(selectedQuestId);
    }, 0);
  }, []);
  useEventTarget(QUESTS_ITEM_CHANGE, onStoreItemChange);

  return (
    <Fragment>
      <Head>
        <title>Brute merch - Quests</title>
      </Head>
      <QuestsLayout rightExpanded={questSkeletonDisplayed}>
        <QuestList
          displayHeadline={false}
          selectedQuestId={firstQuestId}
          stretched={questSkeletonDisplayed}
        />

        <Fragment>
          <ProductDetailStickyWrapper>
            {selectedQuestIdOnClick !== firstQuestId ? (
              <QuestDetailSkeleton />
            ) : (
              <QuestDetail id={firstQuestId} />
            )}
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
