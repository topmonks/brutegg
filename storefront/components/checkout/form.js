import PropTypes from "prop-types";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useFormData from "../../hooks/use-form-data";
import { checkoutValidator } from "../../validations/checkout";
import CountrySelect from "./form/country";
import FirstName from "./form/first-name";
import LastName from "./form/last-name";
import AddressOne from "./form/address-1";
import City from "./form/city";
import Zip from "./form/zip";
import { removeEmpty } from "../../libs/util";
import { defaultFormState } from "../../state/checkout";
import BackToStoreButton from "./back-to-store-button";
import PhoneNumber from "./form/phone-number";
import Email from "./form/email";
import AgreeTerms from "./form/agree-terms";
import AgreePrivacyPolicy from "./form/agree-privacy-policy";

export default function Form({
  onSubmit,
  initialFormState,
  submitIsLoading,
  disableActions = false,
}) {
  const { t } = useTranslation("Checkout");
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
      setFormData((f) => f.set("__timestamp", new Date().toISOString()));
      onSubmit(formData.toJSON());
    },
    [onSubmit, formData, setFormData]
  );

  const checkoutEnabled = useMemo(() => {
    return checkoutValidator.validate(formData.toJSON()).error == null;
  }, [formData]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mx: "auto",
            gap: 2,
            m: {
              xs: 1,
              sm: 2,
              md: 3,
              lg: 5,
            },
            width: { md: "80%" },
          }}
        >
          <Typography component="h3" variant="h6">
            {t("Contact info")}
          </Typography>
          <FirstName formData={formData} onChange={onChange} />
          <LastName formData={formData} onChange={onChange} />
          <Email formData={formData} onChange={onChange} />
          <PhoneNumber formData={formData} onChange={onChange} />
          <Typography component="h3" variant="h6">
            {t("Address")}
          </Typography>
          <AddressOne formData={formData} onChange={onChange} />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: { xs: "wrap", sm: "nowrap" },
            }}
          >
            <City formData={formData} onChange={onChange} />
            <Zip formData={formData} onChange={onChange} />
          </Box>
          <CountrySelect formData={formData} onChange={setFormData} />
          <AgreeTerms formData={formData} onChange={onChange} />
          <Box sx={{ mb: { sm: -2, lg: -4 } }}></Box>
          <AgreePrivacyPolicy formData={formData} onChange={onChange} />
          <Box
            sx={[
              {
                display: "flex",
                gap: 2,
                flexWrap: { xs: "wrap", sm: "nowrap" },
                mb: { xs: 2, sm: 10 },
              },
            ]}
          >
            <Button
              disableElevation
              disabled={!checkoutEnabled || submitIsLoading || disableActions}
              size="large"
              startIcon={submitIsLoading && <CircularProgress size={20} />}
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
              type="submit"
              variant="contained"
            >
              {submitIsLoading
                ? t("Payment is being prepared")
                : t("Continue to payment")}
            </Button>

            <BackToStoreButton
              disabled={disableActions}
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            />
          </Box>
        </Box>
      </form>
    </Fragment>
  );
}

Form.propTypes = {
  disableActions: PropTypes.bool,
  initialFormState: PropTypes.object,
  onSubmit: PropTypes.func,
  submitIsLoading: PropTypes.bool,
};
