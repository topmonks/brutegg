import PropTypes from "prop-types";
import { Typography, useMediaQuery } from "@mui/material";
import { alpha, Box } from "@mui/system";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { keyframes } from "@emotion/react";
import Image from "next/image";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";

import { getProduct } from "../../libs/swell";
import PriceTag from "../price-tag";
import StyledDescription from "../styled-description";
import DiscordButton from "../discord-button";
import RedditButton from "../reddit-button";

const shakeChest = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(1px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-1px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(1px, 0, 0);
  }
`;

/**
 *
 * @param {Object} props
 * @param {import("../../types/swell").Product} props.quest
 */
export function QuestDetail({ id: idFromProps }) {
  const { t } = useTranslation("Quests");
  const router = useRouter();
  const routerId = router.query.slug?.[0];

  const id = idFromProps || routerId;

  const { data: quest } = useQuery(["quests", id], () => getProduct(id));

  const reward = quest.attributes.brute_reward?.value;
  const perex = quest.attributes.brute_quest_perex?.value;
  const creatorThumbnail =
    quest.attributes.brute_creator_thumbnail?.value?.file;
  const creatorLink = quest.attributes.brute_creator_link?.value;

  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Fragment>
      <Head>
        <title>{quest.meta_title || quest.name} | Brute</title>
        <meta content={quest.description} key="desc" name="description" />
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          height: "100%",
          overflowY: "auto",
          alignContent: "flex-start",
        }}
      >
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            textAlign: "center",
            width: { xs: "100%", md: "220px" },
            height: { xs: "auto", md: "100%" },
            display: { xs: "flex", md: "block" },
            alignItems: "center",
            "&>*": {
              xs: {
                width: "100%",
              },
              md: {
                width: "100%",
              },
            },
          }}
        >
          <Box
            sx={{
              mt: {
                md: 2,
              },
              "&>img": {
                filter: (theme) =>
                  `drop-shadow(0 0 20px ${alpha(
                    theme.palette.primary.main,
                    0.7
                  )}) drop-shadow(0 0 5px ${alpha(
                    theme.palette.primary.main,
                    0.9
                  )})`,
                transition: "filter 0.8s ease",
                height: {
                  xs: "60px",
                  md: "100px",
                },
              },
              "&:hover": {
                "&>img": {
                  animation: `${shakeChest} 0.82s cubic-bezier(.36,.07,.19,.97) both`,
                  filter: (theme) =>
                    `drop-shadow(0 0 15px ${alpha(
                      theme.palette.primary.main,
                      0.9
                    )}) drop-shadow(0 0 5px ${alpha(
                      theme.palette.primary.main,
                      1
                    )})`,
                },
              },
            }}
          >
            <img
              alt="Brute helmet logo"
              src="https://res.cloudinary.com/brutegg/image/upload/v1657626779/brutegg-swell/chest_tf2blb.png"
            />
            <Typography component="div" sx={{ fontWeight: "bold" }}>
              <PriceTag amount={reward} />
            </Typography>
          </Box>

          {creatorThumbnail && (
            <Box
              sx={{
                mt: {
                  xs: 0,
                  md: 5,
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: { xs: "80px", md: "150px" },
                  width: { xs: "80px", md: "150px" },
                  mx: "auto",
                }}
              >
                <a href={creatorLink} rel="noreferrer" target="_blank">
                  <Image
                    height={creatorThumbnail.height}
                    layout="fill"
                    objectFit="contain"
                    src={creatorThumbnail.url}
                    width={creatorThumbnail.width}
                  />
                </a>
              </Box>
              <Typography variant="caption">{t("Quest partner")}</Typography>
            </Box>
          )}

          <Box
            sx={{
              mt: {
                md: 5,
              },
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <DiscordButton />
          </Box>
          <Box
            sx={{
              mt: {
                md: 2,
              },
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <RedditButton />
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "calc(100% - 220px)" },
            borderRight: { md: `1px solid ${alpha("#fff", 0.2)}` },
            p: {
              xs: 1,
              md: 2,
              lg: 5,
            },
          }}
        >
          <Box>
            <Typography
              component="h1"
              variant={isSm ? "h5Outglow" : "h4Outglow"}
            >
              {quest.name}
            </Typography>
            {perex && (
              <Typography sx={{ mt: 2 }} variant="subtitle1">
                {perex}
              </Typography>
            )}
          </Box>
          <StyledDescription
            dangerouslySetInnerHTML={{ __html: quest.description }}
            sx={{ overflowY: "auto" }}
          ></StyledDescription>
        </Box>
        <Box
          sx={{
            my: 2,
            mx: 1,
            width: "100%",
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <DiscordButton fullWidth />
          <Box sx={{ mt: 2 }} />
          <RedditButton fullWidth />
        </Box>
      </Box>
    </Fragment>
  );
}

QuestDetail.propTypes = {
  id: PropTypes.string,
};
