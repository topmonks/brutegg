import { useTranslation } from "react-i18next";
import { Headline } from "../headline";

export function CheckoutHeadline() {
  const { t } = useTranslation("Checkout");

  return (
    <Headline
      headlineText={t("Checkout")}
      paragraph={t(
        "Let us know who you are so we can send you your reward safely"
      )}
    />
  );
}
