import { useTranslation } from "react-i18next";
import { Headline } from "../headline";

export function TermsHeadline() {
  const { t } = useTranslation("Terms");

  return <Headline headlineText={t("General terms and conditions")} />;
}
