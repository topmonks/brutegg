import { Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { alpha, Box } from "@mui/system";

import { getProduct } from "../../libs/swell";
import { ProductPropTypes } from "../../types/swell";
import { productState } from "../../state/products";
import PriceTag from "../price-tag";
import StyledDescription from "../styled-description";
import Image from "next/image";
import DiscordButton from "../discord-button";

/**
 *
 * @param {Object} props
 * @param {import("../../types/swell").Product} props.quest
 */
export function QuestDetail({ quest: _quest }) {
  const { t } = useTranslation("Quests");
  const router = useRouter();
  const {
    slug: [id],
  } = router.query;

  const [refreshedProduct, setProduct] = useRecoilState(
    productState(_quest.id)
  );

  const quest = refreshedProduct ?? _quest;

  // refresh product in browsers DOM
  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [setProduct, id]);

  const reward = quest.attributes.brute_reward?.value;
  const perex = quest.attributes.brute_quest_perex?.value;
  const creatorThumbnail =
    quest.attributes.brute_creator_thumbnail?.value?.file;
  const creatorLink = quest.attributes.brute_creator_link?.value;

  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          height: "100%",
          overflowY: "auto",
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
              "& img": {
                filter: (theme) =>
                  `drop-shadow(0 0 20px ${alpha(
                    theme.palette.primary.main,
                    0.7
                  )}) drop-shadow(0 0 5px ${alpha(
                    theme.palette.primary.main,
                    0.9
                  )})`,
              },
            }}
          >
            <img
              alt="Brute helmet logo"
              height={isSm ? 60 : 100}
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
              <Typography variant="caption">{t("Quest sponsor")}</Typography>
            </Box>
          )}

          {!isSm && (
            <Box
              sx={{
                mt: {
                  md: 5,
                },
              }}
            >
              <DiscordButton />
            </Box>
          )}
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
      </Box>
    </Fragment>
  );
}

QuestDetail.propTypes = {
  quest: ProductPropTypes,
};
