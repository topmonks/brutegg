import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Typography,
} from "@mui/material";
import Terms from "../../../pages/terms";
import { style } from "../../double-border-box";

export default function AgreeTerms({ formData, onChange, allowEmpty }) {
  const { t } = useTranslation("Checkout");
  const [display, setDisplay] = useState(false);

  const handleClickOpen = () => {
    setDisplay(true);
  };

  const handleClose = () => {
    setDisplay(false);
  };

  return (
    <Fragment>
      <Dialog
        PaperProps={{
          sx: {
            ...style,
          },
        }}
        fullWidth
        maxWidth="xl"
        onClose={handleClose}
        open={display}
        scroll="body"
      >
        <DialogContent>
          <Terms />
        </DialogContent>
        <DialogActions sx={{ pb: { sm: 2 }, pr: { sm: 2 } }}>
          <Button disableElevation onClick={handleClose} variant="contained">
            {t("Close", { ns: "Common" })}
          </Button>
        </DialogActions>
      </Dialog>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.get("agreeTerms")}
            id="agreeTerms"
            inputProps={{ "aria-label": t("Agree with terms of conditions") }}
            name="agreeTerms"
            onChange={(event) => onChange(event, (target) => target.checked)}
            required={!allowEmpty}
          />
        }
        label={
          <Typography>
            {t("Agree with terms of conditions")}{" "}
            <Typography
              onClick={(e) => {
                e.preventDefault();
                handleClickOpen();
              }}
              sx={{ fontWeight: "bold", ml: 1 }}
              variant="caption"
            >
              {t("Display", { ns: "Common" })}
            </Typography>
          </Typography>
        }
      />
    </Fragment>
  );
}

AgreeTerms.propTypes = {
  allowEmpty: PropTypes.bool,
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
