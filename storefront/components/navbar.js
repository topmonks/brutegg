import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const [value, setValue] = useState("/quests");

  useEffect(() => {
    setValue(router.asPath);
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
        <Tab label={t("Quests")} value="/quests" />
        <Tab label={t("Store")} value="/store" />
        <Tab label={t("FAQ")} value="/faq" />
      </Tabs>
    </Box>
  );
}
