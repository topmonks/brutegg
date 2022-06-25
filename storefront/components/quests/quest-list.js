import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useEventTarget from "../../hooks/use-event-target";
import { Grid } from "@mui/material";
import { QUESTS_ITEM_CHANGE } from "../../state/event-target";
import pageSkeleton from "../page-skeleton";
import { LINKS } from "../navbar";
import { getProducts } from "../../libs/swell";
import window from "../../libs/window";
import { questsState } from "../../state/quests";
import QuestListItem from "./quest-list-item";

export const STRETCHED_STORE_LIST_GRID = {
  xs: 12,
};

export const FULL_STORE_LIST_GRID = {
  xs: 12,
};

export const QUEST_ID_DATA_ATTR_NAME = "data-quest-id";

export function scrollToQuestId(id) {
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
    setSelectedQuestId(event.detail.quest?.id);
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
        {quests.map((q) => {
          const isSelectedQuest = q.id === _selectedQuestId;

          return (
            <Grid
              item
              key={q.id}
              {...gridItemAttrs}
              {...{ [QUEST_ID_DATA_ATTR_NAME]: q.id }}
            >
              <QuestListItem quest={q} selected={isSelectedQuest} />
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
