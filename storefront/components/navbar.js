import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [value, setValue] = useState("/quests");
  const { t } = useTranslation("Navbar");

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
