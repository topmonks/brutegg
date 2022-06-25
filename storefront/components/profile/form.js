import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useFormData from "../../hooks/use-form-data";
import { checkoutValidator } from "../../validations/checkout";
import CountrySelect from "../checkout/form/country";
import FirstName from "../checkout/form/first-name";
import LastName from "../checkout/form/last-name";
import AddressOne from "../checkout/form/address-1";
import AddressTwo from "../checkout/form/address-2";
import City from "../checkout/form/city";
import Zip from "../checkout/form/zip";
import { removeEmpty } from "../../libs/util";
import NickName from "../checkout/form/nickname";

const defaultFormState = {
  firstName: "",
  lastName: "",
  nickName: "",
  address1: "",
  address2: "",
  city: "",
  zip: "",
  country: "",
};

export default function Form({ onSubmit, initialFormState }) {
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
          <Typography component="h3" variant="h5">
            {t("General settings")}
          </Typography>
          <Typography component="h4" variant="h6">
            {t("User information")}
          </Typography>
          <FirstName formData={formData} onChange={onChange} />
          <LastName formData={formData} onChange={onChange} />
          <NickName formData={formData} onChange={onChange} />
          <Typography component="h4" variant="h6">
            {t("Socials")}
          </Typography>
          <Typography component="h4" variant="h6">
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
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: { xs: "wrap", sm: "nowrap" },
              mb: { xs: 2, sm: 10 },
            }}
          >
            <Button
              disableElevation
              size="large"
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
};
