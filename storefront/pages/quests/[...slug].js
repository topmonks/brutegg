import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

import useEventTarget from "../../hooks/use-event-target";
import { getProduct, getProducts } from "../../libs/swell";
import { QUESTS_ITEM_CHANGE } from "../../state/event-target";
import { ProductPropTypes } from "../../types/swell";
import QuestList, { scrollToQuestId } from "../../components/quests/quest-list";
import { QuestDetailSkeleton } from "../../components/quests/quest-detail-skeleton";
import { QuestDetail } from "../../components/quests/quest-detail";
import { ProductDetailStickyWrapper } from "../../components/store/product-detail-sticky-wrapper";
import QuestsLayout from "../../components/quests/quests-layout";
import { withSwellLanguageStaticProps } from "../../libs/with-swell-language";

export async function getStaticPaths() {
  const quests = await getProducts({ category: "quests" });

  const paths = quests.results.map((q) => ({
    params: { slug: [q.slug] },
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

    await queryClient.prefetchQuery(["quests", id || slug], () =>
      getProduct(id || slug)
    );

    if (!queryClient.getQueryData(["quests", id || slug])) {
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
  const { data: quest } = useQuery(["quests", slugOrId], () =>
    getProduct(slugOrId)
  );
  const id = quest?.id;

  const [questDisplayed, setQuestDisplayed] = useState(true);

  const [selectedQuestIdOnClick, setSelectedQuestIdOnClick] = useState(id);

  const onQuestItemChange = useCallback(
    (event) => {
      const selectedQuestId = event.detail.quest?.id;
      if (!selectedQuestId) {
        setQuestDisplayed(false);

        setTimeout(() => {
          scrollToQuestId(id);
        }, 0);
      }

      setSelectedQuestIdOnClick(selectedQuestId);
    },
    [id]
  );

  useEventTarget(QUESTS_ITEM_CHANGE, onQuestItemChange);

  return (
    <QuestsLayout rightExpanded={questDisplayed}>
      <QuestList
        displayHeadline={false}
        selectedQuestId={id}
        stretched={questDisplayed}
      />

      <Fragment>
        <ProductDetailStickyWrapper>
          {selectedQuestIdOnClick !== id ? (
            <QuestDetailSkeleton />
          ) : (
            <QuestDetail />
          )}
        </ProductDetailStickyWrapper>
      </Fragment>
    </QuestsLayout>
  );
}

Item.propTypes = {
  quest: ProductPropTypes,
};
