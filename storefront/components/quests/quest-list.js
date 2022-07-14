import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useEventTarget from "../../hooks/use-event-target";
import { ButtonBase, Grid } from "@mui/material";
import { QUESTS_ITEM_CHANGE } from "../../state/event-target";
import pageSkeleton from "../page-skeleton";
import { LINKS } from "../navbar";
import { getProducts } from "../../libs/swell";
import window from "../../libs/window";
import { questsState } from "../../state/quests";
import QuestListItem from "./quest-list-item";
import DoubleBorderBox from "../double-border-box";

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
  displayHeadline = true,
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
    const QuestsSkeleton = pageSkeleton[LINKS.QUESTS];

    return (
      <QuestsSkeleton displayHeadline={displayHeadline} stretched={stretched} />
    );
  }

  return (
    <Fragment>
      <DoubleBorderBox>
        <Grid columns={12} container spacing={2} sx={{ p: 2 }}>
          {quests.map((q, ix) => {
            const isSelectedQuest = q.id === _selectedQuestId;
            return (
              <Grid
                item
                key={q.id}
                {...gridItemAttrs}
                {...{ [QUEST_ID_DATA_ATTR_NAME]: q.id }}
              >
                <ButtonBase
                  component="div"
                  sx={{
                    display: "block",
                    width: "100%",
                    "&& .MuiTouchRipple-child": (theme) => ({
                      backgroundColor: theme.palette.primary.main,
                    }),
                  }}
                >
                  <QuestListItem ix={ix} quest={q} selected={isSelectedQuest} />
                </ButtonBase>
              </Grid>
            );
          })}
        </Grid>
      </DoubleBorderBox>
    </Fragment>
  );
}

QuestList.propTypes = {
  displayHeadline: PropTypes.bool,
  selectedQuestId: PropTypes.string,
  ssr: PropTypes.shape({
    quests: PropTypes.array,
  }),
  stretched: PropTypes.bool,
};
