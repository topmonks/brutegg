import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { lastNameValidator } from "../../../validations/checkout";
import { MemoTextField } from "../../../components/memo-textfield";
import useFormValidation from "../../../hooks/use-form-validation";
import { common } from "../../../validations/i18n";

export default function LastName({ formData, onChange, allowEmpty }) {
  const { t } = useTranslation("Checkout");

  let validator = lastNameValidator;

  if (allowEmpty) {
    validator = validator.allow("");
  }

  const [invalidLastName, setLastNameBlurred] = useFormValidation(
    formData.get("lastName"),
    validator.messages({
      ...common(t),
    })
  );

  return (
    <Fragment>
      <MemoTextField
        error={Boolean(invalidLastName)}
        fullWidth
        helperText={invalidLastName}
        id="lastName"
        label={t("Last name")}
        name="lastName"
        onBlur={setLastNameBlurred}
        onChange={onChange}
        required={!allowEmpty}
        type="text"
        value={formData.get("lastName")}
        variant="outlined"
      />
    </Fragment>
  );
}

LastName.propTypes = {
  allowEmpty: PropTypes.bool,
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
