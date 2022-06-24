import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { address2Validator } from "../../../validations/checkout";
import { MemoTextField } from "../../memo-textfield";
import useFormValidation from "../../../hooks/use-form-validation";
import { common } from "../../../validations/i18n";

export default function AddressTwo({ formData, onChange }) {
  const { t } = useTranslation("Checkout");

  const [invalidAddress2, setAddress2Blurred] = useFormValidation(
    formData.get("address2"),
    address2Validator.messages({
      ...common(t),
    })
  );

  return (
    <Fragment>
      <MemoTextField
        error={Boolean(invalidAddress2)}
        fullWidth
        helperText={invalidAddress2}
        id="address2"
        label={t("Apartment, building")}
        name="address2"
        onBlur={setAddress2Blurred}
        onChange={onChange}
        type="text"
        value={formData.get("address2")}
        variant="outlined"
      />
    </Fragment>
  );
}

AddressTwo.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
