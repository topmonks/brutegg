import { useMediaQuery } from "@mui/material";
import Head from "next/head";
import PropTypes from "prop-types";
import { Fragment, useCallback, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { QuestDetail } from "../../components/quests/quest-detail";
import { QuestDetailSkeleton } from "../../components/quests/quest-detail-skeleton";
import QuestList from "../../components/quests/quest-list";
import QuestsLayout from "../../components/quests/quests-layout";
import { ProductDetailStickyWrapper } from "../../components/store/product-detail-sticky-wrapper";
import { scrollToProductId } from "../../components/store/product-list";
import useEventTarget from "../../hooks/use-event-target";
import { getQuestsQuery } from "../../libs/swell";
import { QUESTS_ITEM_CHANGE } from "../../state/event-target";
import { useTranslation } from "react-i18next";

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

  const [rightDetailDisplayed, setRightDetailDisplayed] = useState(
    Boolean(firstQuest)
  );

  const onStoreItemChange = useCallback((event) => {
    const selectedQuestId = event.detail.quest?.id;
    setRightDetailDisplayed(true);
    setSelectedQuestIdOnClick(selectedQuestId);

    setTimeout(() => {
      scrollToProductId(selectedQuestId);
    }, 0);
  }, []);
  useEventTarget(QUESTS_ITEM_CHANGE, onStoreItemChange);

  const displaySkeleton = selectedQuestIdOnClick !== firstQuestId;
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"), {
    noSsr: true,
  });

  const { t } = useTranslation();

  return (
    <Fragment>
      <Head>
        <title>{t("Quests", { ns: "Titles" })} | Brute</title>
      </Head>
      <QuestsLayout
        rightExpanded={rightDetailDisplayed && (!isXs || displaySkeleton)}
      >
        <QuestList
          displayHeadline={false}
          selectedQuestId={firstQuestId}
          stretched={rightDetailDisplayed}
        />

        <Fragment>
          <ProductDetailStickyWrapper>
            {displaySkeleton ? (
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
