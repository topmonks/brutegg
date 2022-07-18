import PropTypes from "prop-types";
import { Fragment, useCallback, useState } from "react";
import useEventTarget from "../../hooks/use-event-target";
import { ButtonBase, Grid } from "@mui/material";
import { QUESTS_ITEM_CHANGE } from "../../state/event-target";
import pageSkeleton from "../page-skeleton";
import { LINKS } from "../navbar";
import { getProducts } from "../../libs/swell";
import window from "../../libs/window";
import QuestListItem from "./quest-list-item";
import DoubleBorderBox from "../double-border-box";
import { useQuery } from "react-query";

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
  stretched,
  selectedQuestId,
  displayHeadline = true,
}) {
  const { data: quests, isLoading: questsLoading } = useQuery(["quests"], () =>
    getProducts({
      category: "quests",
    })
  );

  const [_selectedQuestId, setSelectedQuestId] = useState(selectedQuestId);

  const onQuestsItemChange = useCallback((event) => {
    setSelectedQuestId(event.detail.quest?.id);
  }, []);

  useEventTarget(QUESTS_ITEM_CHANGE, onQuestsItemChange);

  const gridItemAttrs = stretched
    ? STRETCHED_STORE_LIST_GRID
    : FULL_STORE_LIST_GRID;

  if (questsLoading) {
    const QuestsSkeleton = pageSkeleton[LINKS.QUESTS];

    return (
      <QuestsSkeleton displayHeadline={displayHeadline} stretched={stretched} />
    );
  }

  return (
    <Fragment>
      <DoubleBorderBox>
        <Grid columns={12} container spacing={2} sx={{ p: { xs: 1, md: 2 } }}>
          {quests.results.map((q, ix) => {
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
  stretched: PropTypes.bool,
};
