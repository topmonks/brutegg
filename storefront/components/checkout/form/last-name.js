import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { lastNameValidator } from "../../../validations/checkout";
import { MemoTextField } from "../../../components/memo-textfield";
import useFormValidation from "../../../hooks/use-form-validation";
import { common } from "../../../validations/i18n";

export default function LastName({ formData, onChange }) {
  const { t } = useTranslation("Checkout");

  const [invalidLastName, setLastNameBlurred] = useFormValidation(
    formData.get("lastName"),
    lastNameValidator.messages({
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
        required
        type="text"
        value={formData.get("lastName")}
        variant="outlined"
      />
    </Fragment>
  );
}

LastName.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
