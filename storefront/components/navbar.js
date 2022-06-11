import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const LINKS = {
  QUESTS: "/quests",
  STORE: "/store",
  FAQ: "/faq",
};

export default function Navbar() {
  const router = useRouter();

  const [value, setValue] = useState("/quests");

  useEffect(() => {
    if (Object.values(LINKS).includes(router.asPath)) {
      setValue(router.asPath);
    }
  }, [router.asPath]);

  const { t } = useTranslation("Navbar");

  const handleChange = (event, newValue) => {
    router.push("/" + (router.locale ?? "") + newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        aria-label="basic tabs example"
        indicatorColor="secondary"
        onChange={handleChange}
        value={value}
      >
        <Tab label={t("Quests")} value={LINKS.QUESTS} />
        <Tab label={t("Store")} value={LINKS.STORE} />
        <Tab label={t("FAQ")} value={LINKS.FAQ} />
      </Tabs>
    </Box>
  );
}
