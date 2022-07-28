import { useTranslation } from "react-i18next";
import { Headline } from "../headline";

export function PrivacyPolicyHeadline() {
  const { t } = useTranslation("Privacy Policy");

  return <Headline headlineText={t("Privacy policy")} />;
}
