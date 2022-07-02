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
import useBruteContract from "../../hooks/use-brute-contract";
import { ethereumState } from "../../state/ethereum";
import { useRecoilValue } from "recoil";
import PaymentButton from "./payment-button";

export default function PaymentDialog({ handleClose, open }) {
  const { t } = useTranslation("PaymentDialog");

  const [bruteContract, treasuryAddress] = useBruteContract();
  const ethereum = useRecoilValue(ethereumState);

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
          <PaymentButton />
        </DialogActions>
      </Dialog>
    </div>
  );
}

PaymentDialog.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};
