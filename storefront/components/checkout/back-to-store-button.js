import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { withLocale } from "../../libs/router";
import { LINKS } from "../navbar";

export default function BackToStoreButton() {
  const { t } = useTranslation("Checkout");
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(withLocale(router.locale, LINKS.STORE))}
      size="large"
      variant="text"
    >
      {t("Back to the store")}
    </Button>
  );
}
