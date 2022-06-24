import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { zipValidatior } from "../../../validations/checkout";
import { MemoTextField } from "../../memo-textfield";
import useFormValidation from "../../../hooks/use-form-validation";
import { common } from "../../../validations/i18n";

export default function Zip({ formData, onChange }) {
  const { t } = useTranslation("Checkout");

  const [invalidZip, setZipBlurred] = useFormValidation(
    formData.get("zip"),
    zipValidatior.messages({
      ...common(t),
    })
  );

  return (
    <Fragment>
      <MemoTextField
        error={Boolean(invalidZip)}
        fullWidth
        helperText={invalidZip}
        id="zip"
        label={t("Zip")}
        name="zip"
        onBlur={setZipBlurred}
        onChange={onChange}
        required
        type="text"
        value={formData.get("zip")}
        variant="outlined"
      />
    </Fragment>
  );
}

Zip.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
