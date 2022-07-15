import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { phoneNumberValidator } from "../../../validations/checkout";
import { MemoTextField } from "../../memo-textfield";
import useFormValidation from "../../../hooks/use-form-validation";
import { common } from "../../../validations/i18n";

export default function PhoneNumber({ formData, onChange }) {
  const { t } = useTranslation("Checkout");

  const [invalidPhone, setPhoneBlurred] = useFormValidation(
    formData.get("phone"),
    phoneNumberValidator.messages({
      ...common(t),
      "string.pattern.base": t(
        "Enter the phone number in the format +420 111 222 333",
        { ns: "Validations" }
      ),
    })
  );

  return (
    <Fragment>
      <MemoTextField
        error={Boolean(invalidPhone)}
        fullWidth
        helperText={invalidPhone}
        id="phone"
        label={t("Phone")}
        name="phone"
        onBlur={setPhoneBlurred}
        onChange={onChange}
        type="text"
        value={formData.get("phone")}
        variant="outlined"
      />
    </Fragment>
  );
}

PhoneNumber.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
