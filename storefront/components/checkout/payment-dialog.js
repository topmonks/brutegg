import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import useBruteContract from "../../hooks/use-brute-contract";

export default function PaymentDialog({ handleClose, open }) {
  const { t } = useTranslation("PaymentDialog");

  const bruteContract = useBruteContract();

  const pay = useCallback(() => {
    if (!bruteContract) {
      return;
    }

    handleClose();
  }, [handleClose, bruteContract]);

  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{t("Payment in Brute tokens")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            {t("Back")}
          </Button>
          <Button disableElevation onClick={pay} variant="contained">
            {t("Pay")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

PaymentDialog.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};
