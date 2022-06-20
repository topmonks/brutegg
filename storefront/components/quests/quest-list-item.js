import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { withLocale } from "../../libs/router";
import window from "../../libs/window";
import { eventTargetState, QUESTS_ITEM_CHANGE } from "../../state/event-target";
import { ProductPropTypes } from "../../types/swell";

/**
 *
 * @param {object} params
 * @param {import("../../types/swell").Product} params.quest
 */
export default function QuestListItem({ quest, selected }) {
  const router = useRouter();
  const eventTarget = useRecoilValue(eventTargetState);

  const goToQuest = useCallback(() => {
    if (eventTarget && window.CustomEvent) {
      eventTarget.dispatchEvent(
        new window.CustomEvent(QUESTS_ITEM_CHANGE, {
          detail: {
            quest,
          },
        })
      );
    }
    router.push(
      withLocale(router.locale, "/quests/" + quest.id + "/" + quest.slug),
      undefined,
      { scroll: false }
    );
  }, [router, quest, eventTarget]);

  return (
    <Box
      onClick={goToQuest}
      sx={[
        {
          cursor: "pointer",
          p: 1,
          mb: 1,
          border: (theme) => "1px solid " + theme.palette.primary.light,
        },
        selected && {},
      ]}
    >
      <Grid container>
        <Grid item>
          <Typography component="h3" display="block" variant="h6">
            {quest.name}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

QuestListItem.propTypes = {
  quest: ProductPropTypes,
  selected: PropTypes.bool,
};
