import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Headline } from "../headline";

export function ProductsHeadline({ center }) {
  const { t } = useTranslation("Store");

  return (
    <Headline
      center={center}
      faqText={t("How to?")}
      headlineText={t("Get rewards")}
      paragraph={t(
        "For Brute Coins from completed quests, you can indulge in any of the rewards offered."
      )}
    />
  );
}

ProductsHeadline.propTypes = {
  center: PropTypes.bool,
};
