export const common = (t) => ({
  "string.empty": t("Input is not allowed to be empty", { ns: "Validations" }),
  "string.pattern.base": t("Invalid format", { ns: "Validations" }),
  "string.min": t("The string must be at least {#limit} characters long", {
    ns: "Validations",
  }),
  "string.email": t("Invalid email", { ns: "Validations" }),
  "string.uri": t("Invalid format of webpage link", { ns: "Validations" }),
  "number.base": t("Input is not allowed to be empty", { ns: "Validations" }),
  "number.max": t("Number must be less than {#limit}", { ns: "Validations" }),
  "number.greater": t("Number must be greater than {#limit}", {
    ns: "Validations",
  }),
  "number.positive": t("Number must be positive", { ns: "Validations" }),
  "number.integer": t("Number must be integer", { ns: "Validations" }),
});
