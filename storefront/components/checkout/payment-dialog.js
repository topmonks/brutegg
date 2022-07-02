import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import useBruteContract from "../../hooks/use-brute-contract";
import { ethereumState } from "../../state/ethereum";
import { useRecoilValue } from "recoil";
import PaymentButton from "./payment-button";
import useWatchTx from "../../hooks/use-watch-tx";
import { TX_STATES } from "../../state/tx";
import { checkoutFormState } from "../../state/checkout";

export default function PaymentDialog({ handleClose, open }) {
  const { t } = useTranslation("PaymentDialog");

  const [bruteContract] = useBruteContract();
  const ethereum = useRecoilValue(ethereumState);
  const checkoutForm = useRecoilValue(checkoutFormState);

  const [watchingTxs] = useWatchTx(
    ethereum.account,
    bruteContract?.options?.address,
    "payment"
  );

  const isTxPending = watchingTxs?.state === TX_STATES.PENDING;
  const isTxSuccess = watchingTxs?.state === TX_STATES.SUCCESS;
  const isTxFailed = watchingTxs?.state === TX_STATES.FAILED;

  let content = (
    <DialogContentText>
      <Typography display="block" variant="subtitle1">
        {t("Items will be shipped to")}
      </Typography>
      <Box
        sx={{ my: 1, p: 3, border: "1px solid gray", display: "inline-block" }}
      >
        <Typography fontWeight="bold" variant="body1">
          {checkoutForm.firstName} {checkoutForm.lastName}
        </Typography>
        <Typography fontWeight="bold" variant="body1">
          {checkoutForm.address1}
        </Typography>
        <Typography fontWeight="bold" variant="body1">
          {checkoutForm.address2}
        </Typography>
        <Typography fontWeight="bold" variant="body1">
          {checkoutForm.city}, {checkoutForm.zip}
        </Typography>
        <Typography fontWeight="bold" variant="body1">
          {checkoutForm.country}
        </Typography>
      </Box>
    </DialogContentText>
  );

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        open={open}
        scroll="paper"
      >
        <DialogTitle>{t("Order summary")}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            {t("Cancel", { ns: "Common" })}
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
