import PropTypes from "prop-types";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useFormData from "../../hooks/use-form-data";
import { checkoutValidator } from "../../validations/checkout";
import CountrySelect from "./form/country";
import FirstName from "./form/first-name";
import LastName from "./form/last-name";
import AddressOne from "./form/address-1";
import AddressTwo from "./form/address-2";
import City from "./form/city";
import Zip from "./form/zip";
import { removeEmpty } from "../../libs/util";
import { useRecoilState } from "recoil";
import { checkoutFormState, defaultFormState } from "../../state/checkout";

export default function Form({
  onSubmit,
  initialFormState,
  hideActions = false,
}) {
  const { t } = useTranslation("Checkout");
  const [formData, setFormData, onChange, , resetForm] =
    useFormData(defaultFormState);

  const [, setCheckoutForm] = useRecoilState(checkoutFormState);

  useEffect(() => {
    setCheckoutForm(formData.toJSON());
  }, [formData, setCheckoutForm]);

  useEffect(() => {
    if (!initialFormState) {
      return;
    }

    setFormData((f) => f.merge(removeEmpty(initialFormState)));
  }, [initialFormState, setFormData]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsLoading(true);
      Promise.resolve()
        .then(() => onSubmit(formData.toJSON()))
        .finally(() => setIsLoading(false));
    },
    [onSubmit, formData]
  );

  const checkoutEnabled = useMemo(() => {
    return checkoutValidator().validate(formData.toJSON()).error == null;
  }, [formData]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            width: { md: "60%" },
          }}
        >
          <Typography component="h3" variant="h6">
            {t("Contact info")}
          </Typography>
          <FirstName formData={formData} onChange={onChange} />
          <LastName formData={formData} onChange={onChange} />
          <Typography component="h3" variant="h6">
            {t("Address")}
          </Typography>
          <AddressOne formData={formData} onChange={onChange} />
          <AddressTwo formData={formData} onChange={onChange} />
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
          <Box
            sx={[
              {
                display: "flex",
                gap: 2,
                flexWrap: { xs: "wrap", sm: "nowrap" },
                mb: { xs: 2, sm: 10 },
              },
              hideActions && {
                display: "none",
              },
            ]}
          >
            {isLoading ? (
              <Button
                disableElevation
                disabled
                startIcon={<CircularProgress size={20} />}
                variant="contained"
              >
                {t("Payment is being prepared")}
              </Button>
            ) : (
              <Button
                disableElevation
                size="large"
                type="submit"
                variant="contained"
              >
                {t("Continue to payment")}
              </Button>
            )}
            <Button size="large" variant="text">
              {t("Back to the store")}
            </Button>
          </Box>
        </Box>
      </form>
    </Fragment>
  );
}

Form.propTypes = {
  hideActions: PropTypes.bool,
  initialFormState: PropTypes.object,
  onSubmit: PropTypes.func,
};
