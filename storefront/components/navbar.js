import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { withLocale } from "../libs/router";
import { useRecoilValue } from "recoil";
import { eventTargetState, NAVBAR_CHANGE } from "../state/event-target";
import window from "../libs/window";

export const LINKS = {
  QUESTS: "/quests",
  STORE: "/store",
  FAQ: "/faq",
};

export default function Navbar() {
  const router = useRouter();
  const findLink = useCallback(
    () => Object.values(LINKS).find((l) => router.asPath.startsWith(l)),
    [router.asPath]
  );
  const eventTarget = useRecoilValue(eventTargetState);

  const [value, setValue] = useState(findLink());

  useEffect(() => {
    const link = findLink();
    if (link) {
      setValue(link);
    }
  }, [findLink]);

  const { t } = useTranslation("Navbar");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (eventTarget && window.CustomEvent) {
      eventTarget.dispatchEvent(
        new window.CustomEvent(NAVBAR_CHANGE, {
          detail: {
            target: newValue,
          },
        })
      );
    }
    router.push(withLocale(router.locale, newValue));
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        aria-label="basic tabs example"
        indicatorColor="secondary"
        onChange={handleChange}
        value={value}
      >
        {[
          [t("Quests"), LINKS.QUESTS],
          [t("Store"), LINKS.STORE],
          [t("FAQ"), LINKS.FAQ],
        ].map(([label, value]) => (
          <Tab
            key={value}
            label={label}
            onClick={(e) => handleChange(e, value)}
            value={value}
          />
        ))}
      </Tabs>
    </Box>
  );
}
