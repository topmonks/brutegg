import PropTypes from "prop-types";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { MemoTextField } from "../../memo-textfield";
import useFormValidation from "../../../hooks/use-form-validation";
import { common } from "../../../validations/i18n";
import { redditValidator } from "../../../validations/profile";

export default function Reddit({ formData, onChange, allowEmpty }) {
  const { t } = useTranslation("Profile");

  let validator = redditValidator;

  if (allowEmpty) {
    validator = validator.allow("");
  }

  const [invalidReddit, setRedditBlurred] = useFormValidation(
    formData.get("reddit"),
    validator.messages({
      ...common(t),
    })
  );

  return (
    <Fragment>
      <MemoTextField
        error={Boolean(invalidReddit)}
        fullWidth
        helperText={invalidReddit}
        id="reddit"
        label={t("Reddit")}
        name="reddit"
        onBlur={setRedditBlurred}
        onChange={onChange}
        required={!allowEmpty}
        type="text"
        value={formData.get("reddit")}
        variant="outlined"
      />
    </Fragment>
  );
}

Reddit.propTypes = {
  allowEmpty: PropTypes.bool,
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
