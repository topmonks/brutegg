import { initReactI18next } from "react-i18next";
import cs from "./cs.json";
import i18n from "i18next";

const resources = {
  cs,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "cs",
  keySeparator: false,
});

export default i18n;
