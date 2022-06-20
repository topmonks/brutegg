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
import { useTranslation } from "react-i18next";
import PriceTag from "../price-tag";

/**
 *
 * @param {object} params
 * @param {import("../../types/swell").Product} params.quest
 */
export default function QuestListItem({ quest, selected }) {
  const { t } = useTranslation("Quests");
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

  let validUntil = quest.attributes.brute_quest_valid_until?.value;
  validUntil = validUntil ? new Date(validUntil) : null;

  let reward = quest.attributes.brute_reward?.value;
  try {
    reward = reward ? parseFloat(reward).toLocaleString(router.locale) : null;
  } catch (e) {
    console.error(e);
  }

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
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography component="h3" variant="h6">
            {quest.name}
          </Typography>
        </Grid>
        {validUntil && (
          <Grid item>
            <Typography variant="caption">
              {t("Deadline")}: {validUntil.toLocaleDateString(router.locale)}
            </Typography>
          </Grid>
        )}
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="subtitle1">
            {quest.attributes.brute_quest_perex?.value}
          </Typography>
        </Grid>
        {reward && (
          <Grid item>
            <Typography variant="subtitle1">
              {t("Reward")}:{" "}
              <PriceTag amount={reward} sx={{ fontWeight: "bold" }} />
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

QuestListItem.propTypes = {
  quest: ProductPropTypes,
  selected: PropTypes.bool,
};
