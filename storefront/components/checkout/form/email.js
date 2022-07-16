import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { emailValidator } from "../../../validations/checkout";
import { MemoTextField } from "../../memo-textfield";
import useFormValidation from "../../../hooks/use-form-validation";
import { common } from "../../../validations/i18n";
export default function Email({ formData, onChange }) {
  const { t } = useTranslation("Checkout");

  const [invalidEmail, setEmailBlurred] = useFormValidation(
    formData.get("email"),
    emailValidator.messages({
      ...common(t),
    })
  );

  let value = formData.get("email");

  return (
    <Fragment>
      <MemoTextField
        error={Boolean(invalidEmail)}
        fullWidth
        helperText={invalidEmail}
        id="email"
        label={t("Email")}
        name="email"
        onBlur={setEmailBlurred}
        onChange={onChange}
        type="text"
        value={value}
        variant="outlined"
      />
    </Fragment>
  );
}

Email.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};