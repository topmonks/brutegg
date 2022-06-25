import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { nickNameValidator } from "../../../validations/checkout";
import { MemoTextField } from "../../memo-textfield";
import useFormValidation from "../../../hooks/use-form-validation";
import { common } from "../../../validations/i18n";

export default function NickName({ formData, onChange }) {
  const { t } = useTranslation("Checkout");

  const [invalidNickName, setNickNameBlurred] = useFormValidation(
    formData.get("nickName"),
    nickNameValidator.messages({
      ...common(t),
    })
  );

  return (
    <Fragment>
      <MemoTextField
        error={Boolean(invalidNickName)}
        fullWidth
        helperText={invalidNickName}
        id="nickName"
        label={t("Nickname")}
        name="nickName"
        onBlur={setNickNameBlurred}
        onChange={onChange}
        type="text"
        value={formData.get("nickName")}
        variant="outlined"
      />
    </Fragment>
  );
}

NickName.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
