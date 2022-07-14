import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useState } from "react";
import useEventTarget from "../../hooks/use-event-target";
import { getProduct, getProducts } from "../../libs/swell";
import { QUESTS_ITEM_CHANGE } from "../../state/event-target";
import { ProductPropTypes } from "../../types/swell";
import QuestList, { scrollToQuestId } from "../../components/quests/quest-list";
import { QuestDetailSkeleton } from "../../components/quests/quest-detail-skeleton";
import { QuestDetail } from "../../components/quests/quest-detail";
import { ProductDetailStickyWrapper } from "../../components/store/product-detail-sticky-wrapper";
import QuestsLayout from "../../components/quests/quests-layout";

export async function getStaticPaths() {
  const quests = await getProducts({ category: "quests" });

  const paths = quests.results.map((q) => ({
    params: { slug: [q.id, q.slug] },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const {
    slug: [id, slug],
  } = context.params;

  const quest = await getProduct(id || slug);

  if (!quest) {
    return {
      notFound: true,
    };
  }

  return {
    props: { quest },
  };
}

export default function Item({ quest }) {
  const router = useRouter();
  const {
    slug: [id],
  } = router.query;
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

  useEffect(() => {
    setQuestDisplayed(true);
  }, [quest]);

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
            <QuestDetail quest={quest} />
          )}
        </ProductDetailStickyWrapper>
      </Fragment>
    </QuestsLayout>
  );
}

Item.propTypes = {
  quest: ProductPropTypes,
};
