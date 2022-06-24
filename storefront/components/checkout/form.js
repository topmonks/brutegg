import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";
import { Fragment, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useFormData from "../../hooks/use-form-data";
import { checkoutValidator } from "../../validations/checkout";
import { common } from "../../validations/i18n";
import CountrySelect from "./form/country";
import FirstName from "./form/first-name";
import LastName from "./form/last-name";

const defaultFormState = {
  firstName: "",
  lastName: "",
  country: "",
};

export default function Form({ onSubmit }) {
  const { t } = useTranslation("Checkout");
  const [formData, setFormData, onChange, , clear] =
    useFormData(defaultFormState);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSubmit(formData.toJSON());
    },
    [onSubmit, formData]
  );

  console.log(formData.toJSON());

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
          <CountrySelect formData={formData} onChange={setFormData} />
          <Button type="submit">{t("Continue to payment")}</Button>
        </Box>
      </form>
    </Fragment>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func,
};
