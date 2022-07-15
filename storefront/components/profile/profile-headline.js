import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { ethereumState } from "../../state/ethereum";
import { sessionState } from "../../state/session";
import { Headline } from "../headline";

export function ProfileHeadline() {
  const { t } = useTranslation("Profile");
  const ethereum = useRecoilValue(ethereumState);
  const session = useRecoilValue(sessionState);

  let headlineText = "¯\\_(ツ)_/¯";

  if (ethereum.account) {
    headlineText = [
      ethereum.account?.substring(0, 8),
      "...",
      ethereum.account?.substring(ethereum.account?.length - 4),
    ].join(" ");
  }

  const firstName = session?.user?.firstName;
  const lastName = session?.user?.lastName;
  if (firstName || lastName) {
    headlineText = `${firstName} ${lastName}`;
  }

  return (
    <Headline
      headlineText={headlineText}
      paragraph={t("Your account settings")}
    />
  );
}
