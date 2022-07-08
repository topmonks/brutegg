import { useTranslation } from "react-i18next";
import { Headline } from "../headline";

export function QuestHeadline() {
  const { t } = useTranslation("Quests");

  return (
    <Headline
      faqText={t("How to start")}
      headlineText={t("Complete the tasks")}
      paragraph={t("Earn amazing rewards by completing community challenges.")}
    />
  );
}
