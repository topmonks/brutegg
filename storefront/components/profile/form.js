import PropTypes from "prop-types";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useFormData from "../../hooks/use-form-data";
import CountrySelect from "../checkout/form/country";
import FirstName from "../checkout/form/first-name";
import LastName from "../checkout/form/last-name";
import AddressOne from "../checkout/form/address-1";
import City from "../checkout/form/city";
import Zip from "../checkout/form/zip";
import { removeEmpty } from "../../libs/util";
import { defaultFormState } from "../../state/profile";
import { profileValidator } from "../../validations/profile";
import Reddit from "./form/reddit";
import Discord from "./form/discord";
import Instagram from "./form/instagram";
import Email from "../checkout/form/email";
import PhoneNumber from "../checkout/form/phone-number";

export default function Form({
  onSubmit,
  initialFormState,
  onSubmitIsLoading = false,
}) {
  const { t } = useTranslation("Profile");
  const [formData, setFormData, onChange] = useFormData(defaultFormState);

  useEffect(() => {
    if (!initialFormState) {
      return;
    }

    setFormData((f) => f.merge(removeEmpty(initialFormState)));
  }, [initialFormState, setFormData]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSubmit(formData.toJSON());
    },
    [onSubmit, formData]
  );

  const profileSaveEnabled = useMemo(() => {
    return profileValidator.validate(formData.toJSON()).error == null;
  }, [formData]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography component="h3" sx={{ fontWeight: "bold" }} variant="h6">
            {t("General settings")}
          </Typography>
          <Typography sx={{ fontWeight: "bold", mt: 1 }} variant="subtitle1">
            {t("User information")}
          </Typography>
          <FirstName allowEmpty formData={formData} onChange={onChange} />
          <LastName allowEmpty formData={formData} onChange={onChange} />
          <Email formData={formData} onChange={onChange} />
          <PhoneNumber formData={formData} onChange={onChange} />
          <Typography sx={{ fontWeight: "bold", mt: 1 }} variant="subtitle1">
            {t("Socials")}
          </Typography>
          <Discord allowEmpty formData={formData} onChange={onChange} />
          <Reddit allowEmpty formData={formData} onChange={onChange} />
          <Instagram allowEmpty formData={formData} onChange={onChange} />
          <Typography sx={{ fontWeight: "bold", mt: 1 }} variant="subtitle1">
            {t("Address")}
          </Typography>
          <AddressOne allowEmpty formData={formData} onChange={onChange} />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: { xs: "wrap", sm: "nowrap" },
            }}
          >
            <City allowEmpty formData={formData} onChange={onChange} />
            <Zip allowEmpty formData={formData} onChange={onChange} />
          </Box>
          <CountrySelect formData={formData} onChange={setFormData} />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: { xs: "wrap", sm: "nowrap" },
              mb: { xs: 2, sm: 10 },
              mt: 2,
            }}
          >
            <Button
              disableElevation
              disabled={!profileSaveEnabled || onSubmitIsLoading}
              size="large"
              startIcon={onSubmitIsLoading && <CircularProgress size={20} />}
              sx={{ width: { xs: "100%", sm: "auto" } }}
              type="submit"
              variant="contained"
            >
              {t("Save profile")}
            </Button>
          </Box>
        </Box>
      </form>
    </Fragment>
  );
}

Form.propTypes = {
  initialFormState: PropTypes.object,
  onSubmit: PropTypes.func,
  onSubmitIsLoading: PropTypes.bool,
};
