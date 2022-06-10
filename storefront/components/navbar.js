import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function Navbar() {
  const [value, setValue] = useState("/quests");

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
        <Tab label="Questy" value="/quests" />
        <Tab label="Obchod" value="/store" />
        <Tab label="Nápověda" value="/faq" />
      </Tabs>
    </Box>
  );
}
