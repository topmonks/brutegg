import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { address1Validator } from "../../../validations/checkout";
import { MemoTextField } from "../../memo-textfield";
import useFormValidation from "../../../hooks/use-form-validation";
import { common } from "../../../validations/i18n";

export default function AddressOne({ formData, onChange }) {
  const { t } = useTranslation("Checkout");

  const [invalidAddress1, setAddress1Blurred] = useFormValidation(
    formData.get("address1"),
    address1Validator.messages({
      ...common(t),
    })
  );

  return (
    <Fragment>
      <MemoTextField
        error={Boolean(invalidAddress1)}
        fullWidth
        helperText={invalidAddress1}
        id="address1"
        label={t("Street, house number")}
        name="address1"
        onBlur={setAddress1Blurred}
        onChange={onChange}
        required
        type="text"
        value={formData.get("address1")}
        variant="outlined"
      />
    </Fragment>
  );
}

AddressOne.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
