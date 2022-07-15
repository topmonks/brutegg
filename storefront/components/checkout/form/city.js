import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { cityValidator } from "../../../validations/checkout";
import { MemoTextField } from "../../memo-textfield";
import useFormValidation from "../../../hooks/use-form-validation";
import { common } from "../../../validations/i18n";

export default function City({ formData, onChange, allowEmpty }) {
  const { t } = useTranslation("Checkout");

  let validator = cityValidator;

  if (allowEmpty) {
    validator = validator.allow("");
  }

  const [invalidCity, setCityBlurred] = useFormValidation(
    formData.get("city"),
    validator.messages({
      ...common(t),
    })
  );

  return (
    <Fragment>
      <MemoTextField
        error={Boolean(invalidCity)}
        fullWidth
        helperText={invalidCity}
        id="city"
        label={t("City")}
        name="city"
        onBlur={setCityBlurred}
        onChange={onChange}
        required={!allowEmpty}
        type="text"
        value={formData.get("city")}
        variant="outlined"
      />
    </Fragment>
  );
}

City.propTypes = {
  allowEmpty: PropTypes.bool,
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
