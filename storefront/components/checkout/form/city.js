import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { cityValidator } from "../../../validations/checkout";
import { MemoTextField } from "../../memo-textfield";
import useFormValidation from "../../../hooks/use-form-validation";
import { common } from "../../../validations/i18n";

export default function City({ formData, onChange }) {
  const { t } = useTranslation("Checkout");

  const [invalidCity, setCityBlurred] = useFormValidation(
    formData.get("city"),
    cityValidator.messages({
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
        required
        type="text"
        value={formData.get("city")}
        variant="outlined"
      />
    </Fragment>
  );
}

City.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
