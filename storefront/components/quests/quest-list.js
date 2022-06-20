import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ProductListItem from "../store/product-list-item";
import useEventTarget from "../../hooks/useEventTarget";
import { Grid } from "@mui/material";
import { QUESTS_ITEM_CHANGE } from "../../state/event-target";
import pageSkeleton from "../page-skeleton";
import { LINKS } from "../navbar";
import { getProducts } from "../../libs/swell";
import window from "../../libs/window";
import { questsState } from "../../state/quests";

export const STRETCHED_STORE_LIST_GRID = {
  xxl: 4,
  lg: 6,
  md: 12,
  sm: 12,
  xs: 12,
};

export const FULL_STORE_LIST_GRID = {
  lg: 3,
  md: 4,
  sm: 6,
  xs: 12,
};

export const QUEST_ID_DATA_ATTR_NAME = "data-quest-id";

export function scrollToProductId(id) {
  if (id && window.document) {
    const element = window.document.querySelector(
      `[${QUEST_ID_DATA_ATTR_NAME}="${id}"]`
    );

    if (element) {
      element.scrollIntoView();
    }
  }
}

export default function QuestList({
  ssr = { quests: [] },
  stretched,
  selectedQuestId,
}) {
  const [_quests, setQuests] = useRecoilState(questsState);

  const [questsLoading, setQuestsLoading] = useState(false);
  const quests = _quests.length ? _quests : ssr.quests;

  const [_selectedQuestId, setSelectedQuestId] = useState(selectedQuestId);

  const onQuestsItemChange = useCallback((event) => {
    setSelectedQuestId(event.detail.product?.id);
  }, []);

  useEventTarget(QUESTS_ITEM_CHANGE, onQuestsItemChange);

  useEffect(() => {
    setQuestsLoading(true);
    getProducts({ category: "quests" })
      .then(({ results }) => {
        setQuests(results);
      })
      .finally(() => setQuestsLoading(false));
  }, [setQuests]);

  const gridItemAttrs = stretched
    ? STRETCHED_STORE_LIST_GRID
    : FULL_STORE_LIST_GRID;

  if (questsLoading && !quests.length) {
    const StoreSkeleton = pageSkeleton[LINKS.STORE];

    return <StoreSkeleton stretched={stretched} />;
  }

  return (
    <Fragment>
      <Grid columns={12} container spacing={1}>
        {quests.map((p) => {
          const isSelectedQuest = p.id === _selectedQuestId;

          return (
            <Grid
              item
              key={p.id}
              {...gridItemAttrs}
              {...{ [QUEST_ID_DATA_ATTR_NAME]: p.id }}
            >
              <ProductListItem product={p} selected={isSelectedQuest} />
            </Grid>
          );
        })}
      </Grid>
    </Fragment>
  );
}

QuestList.propTypes = {
  selectedQuestId: PropTypes.string,
  ssr: PropTypes.shape({
    products: PropTypes.array,
  }),
  stretched: PropTypes.bool,
};
