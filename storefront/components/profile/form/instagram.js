import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { MemoTextField } from "../../memo-textfield";
import useFormValidation from "../../../hooks/use-form-validation";
import { common } from "../../../validations/i18n";
import { instagramValidator } from "../../../validations/profile";

export default function Instagram({ formData, onChange, allowEmpty }) {
  const { t } = useTranslation("Profile");

  let validator = instagramValidator;

  if (allowEmpty) {
    validator = validator.allow("");
  }

  const [invalidInstagram, setInstagramBlurred] = useFormValidation(
    formData.get("instagram"),
    validator.messages({
      ...common(t),
    })
  );

  return (
    <Fragment>
      <MemoTextField
        error={Boolean(invalidInstagram)}
        fullWidth
        helperText={invalidInstagram}
        id="instagram"
        label={t("Instagram")}
        name="instagram"
        onBlur={setInstagramBlurred}
        onChange={onChange}
        required={!allowEmpty}
        type="text"
        value={formData.get("instagram")}
        variant="outlined"
      />
    </Fragment>
  );
}

Instagram.propTypes = {
  allowEmpty: PropTypes.bool,
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
