import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { RARITY } from "../../libs/constants";
import { Headline } from "../headline";
import RarityBadge from "../rarity-badge";

export function ProductsHeadline({ center }) {
  const { t } = useTranslation("Store");

  return (
    <Fragment>
      <Headline
        center={center}
        faqText={t("How to?")}
        headlineText={t("Get rewards")}
        paragraph={t(
          "For BRUTE Coins from completed quests, you can indulge in any of the rewards offered."
        )}
      />
      <Box
        sx={{
          mb: 2,
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          opacity: 0.4,
          transition: "opacity 0.2s ease",
          "&:hover": {
            opacity: 0.9,
          },
        }}
      >
        {Object.values(RARITY).map((rarity) => (
          <RarityBadge key={rarity} rarity={rarity} />
        ))}
      </Box>
    </Fragment>
  );
}

ProductsHeadline.propTypes = {
  center: PropTypes.bool,
};
