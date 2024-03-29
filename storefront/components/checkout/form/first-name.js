import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { MemoTextField } from "../../../components/memo-textfield";
import useFormValidation from "../../../hooks/use-form-validation";
import { firstNameValidator } from "../../../validations/checkout";
import { common } from "../../../validations/i18n";

export default function FirstName({ formData, onChange, allowEmpty }) {
  const { t } = useTranslation("Checkout");

  let validator = firstNameValidator;

  if (allowEmpty) {
    validator = validator.allow("");
  }

  const [invalidFirstName, setFirstNameBlurred] = useFormValidation(
    formData.get("firstName"),
    validator.messages({
      ...common(t),
    })
  );

  return (
    <Fragment>
      <MemoTextField
        error={Boolean(invalidFirstName)}
        fullWidth
        helperText={invalidFirstName}
        id="firstName"
        label={t("First name")}
        name="firstName"
        onBlur={setFirstNameBlurred}
        onChange={onChange}
        required={!allowEmpty}
        type="text"
        value={formData.get("firstName")}
        variant="outlined"
      />
    </Fragment>
  );
}

FirstName.propTypes = {
  allowEmpty: PropTypes.bool,
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
