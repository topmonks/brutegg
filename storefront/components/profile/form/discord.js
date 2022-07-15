import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { MemoTextField } from "../../memo-textfield";
import useFormValidation from "../../../hooks/use-form-validation";
import { common } from "../../../validations/i18n";
import { discordValidator } from "../../../validations/profile";

export default function Discord({ formData, onChange, allowEmpty }) {
  const { t } = useTranslation("Profile");

  let validator = discordValidator;

  if (allowEmpty) {
    validator = validator.allow("");
  }

  const [invalidDiscord, setDiscordBlurred] = useFormValidation(
    formData.get("discord"),
    validator.messages({
      ...common(t),
    })
  );

  return (
    <Fragment>
      <MemoTextField
        error={Boolean(invalidDiscord)}
        fullWidth
        helperText={invalidDiscord}
        id="discord"
        label={t("Discord")}
        name="discord"
        onBlur={setDiscordBlurred}
        onChange={onChange}
        required={!allowEmpty}
        type="text"
        value={formData.get("discord")}
        variant="outlined"
      />
    </Fragment>
  );
}

Discord.propTypes = {
  allowEmpty: PropTypes.bool,
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
