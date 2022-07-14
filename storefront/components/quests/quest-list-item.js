import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Grid, Typography, alpha, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { withLocale } from "../../libs/router";
import window from "../../libs/window";
import { eventTargetState, QUESTS_ITEM_CHANGE } from "../../state/event-target";
import { ProductPropTypes } from "../../types/swell";
import { useTranslation } from "react-i18next";
import PriceTag from "../price-tag";
import Image from "next/image";

/**
 *
 * @param {object} params
 * @param {import("../../types/swell").Product} params.quest
 */
export default function QuestListItem({ quest, selected, ix = 0 }) {
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

  const thumbnail = quest.images?.[0]?.file;

  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box
      onClick={goToQuest}
      sx={[
        {
          cursor: "pointer",
          pr: 1,
          pl: 2,
          py: 2,
          transition:
            "box-shadow 0.2s ease, border 0.3s ease, background 0.2s ease",
          border: `1px solid ${alpha("#22272E", 0.9)}`,
          background: `linear-gradient(90deg, ${alpha(
            "#22272E",
            0.6
          )} 0%, ${alpha("#111214", 1)} 100%)`,
        },
        !selected && {
          "&:hover": {
            background: `linear-gradient(90deg, ${alpha(
              "#22272E",
              0.6
            )} 0%, ${alpha(
              "#111214",
              1
            )} 100%), url("https://res.cloudinary.com/brutegg/image/upload/v1657795773/brutegg-swell/bg-quest-item-gray_ugsraa.png")`,
            backgroundPosition: [
              "bottom left",
              "center right",
              "top right",
              "top left",
              "bottom right",
              "center left",
            ][ix % 6],
            border: `1px solid ${alpha("#22272E", 0.1)}`,
            boxShadow: `0 0 0 3px ${alpha(
              "#22272E",
              0.6
            )}, -10px -5px 20px 0 ${alpha("#22272E", 0.4)}`,
          },
        },
        selected && {
          border: (theme) =>
            `1px solid ${alpha(theme.palette.primary.main, 0.9)}`,
          boxShadow: (theme) =>
            `0 0 0 3px ${alpha(
              theme.palette.primary.main,
              0.6
            )}, -10px -5px 20px 0 ${alpha(theme.palette.primary.main, 0.4)}`,
          background: (theme) =>
            `linear-gradient(90deg, ${alpha(
              theme.palette.primary.main,
              0.4
            )} 0%, ${alpha("#22272E", 0.6)} 50%, ${alpha(
              "#111214",
              1
            )} 100%), url("https://res.cloudinary.com/brutegg/image/upload/v1657795520/brutegg-swell/bg-quest-item_jepbpq.png")`,
          backgroundPosition: "center center",
        },
      ]}
    >
      <Grid
        alignItems="center"
        columnSpacing={isSm ? 1 : 2}
        container
        rowSpacing={1}
      >
        {thumbnail && (
          <Grid item xs="auto">
            <Box
              sx={[
                {
                  width: 56,
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  p: "5px",
                  border: `1px solid ${alpha("#fff", 0.2)}`,
                  background: alpha("#000", 0.8),
                  transition: "box-shadow 0.3s ease",
                  "& img": {
                    boxShadow: `inset 0 0 0 1px ${alpha("#fff", 0.02)}`,
                  },
                },
                selected && {
                  boxShadow: (theme) =>
                    `0 0 5px 0 ${alpha("#000", 0.8)}, 0 0 30px 0 ${alpha(
                      theme.palette.primary.main,
                      1
                    )}, 0 0 5px 0 ${alpha(theme.palette.primary.main, 0.8)}`,
                  border: (theme) =>
                    `1px solid ${alpha(theme.palette.primary.light, 0.7)}`,
                },
              ]}
            >
              <Image
                height={thumbnail.height}
                src={thumbnail.url}
                width={thumbnail.width}
              />
            </Box>
          </Grid>
        )}
        <Grid flexGrow={1} item sm xs={9}>
          <Typography
            component="h3"
            sx={{ fontWeight: "bold" }}
            variant="body1"
          >
            {quest.name}
          </Typography>
        </Grid>
        <Grid
          item
          md="auto"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "flex-end" },
            flexDirection: { xs: "row", md: "column" },
          }}
          xs={12}
        >
          {validUntil && (
            <Typography variant="caption">
              {t("Deadline")}: {validUntil.toLocaleDateString(router.locale)}
            </Typography>
          )}
          {reward && (
            <Typography sx={{ display: "inline" }} variant="subtitle1">
              <PriceTag amount={reward} sx={{ fontWeight: "bold" }} />
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

QuestListItem.propTypes = {
  quest: ProductPropTypes,
  selected: PropTypes.bool,
  ix: PropTypes.number,
};
