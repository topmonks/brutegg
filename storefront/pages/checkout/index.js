import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import Form from "../../components/checkout/form";
import { swellNodeClient } from "../../libs/swell-node";
import { withSessionSsr } from "../../libs/with-session";
import { snackbarState } from "../../state/snackbar";
import useUpdateSession from "../../hooks/use-update-session";
import PaymentDialog from "../../components/checkout/payment-dialog";
import CheckoutLayout from "../../components/checkout/checkout-layout";
import CartSummary from "../../components/checkout/cart-summary";
import { CheckoutHeadline } from "../../components/checkout/checkout-headline";
import Layout from "../../components/layout";
import useGetCart from "../../hooks/use-get-cart";
import { useRouter } from "next/router";
import { withLocale } from "../../libs/router";
import { LINKS } from "../../components/navbar";
import useWatchPayment from "../../hooks/use-watch-payment";
import useUpdateShipping from "../../hooks/use-update-shipping";
import PaymentWatcher from "../../components/checkout/payment-watcher";
import UnlockMetamaskLayout from "../../components/unlock-metamask-layout";
import { removeEmpty } from "../../libs/util";
import { defaultFormState } from "../../state/checkout";
import { composeVirtualEmailFromAddress } from "../../libs/web3";

export const getServerSideProps = withSessionSsr(async (context) => {
  const publicAddress = context.req.session.user?.address;
  const resultProps = {};

  if (!publicAddress) {
    return { props: resultProps };
  }

  resultProps.address = publicAddress;

  let {
    results: [user],
  } = await swellNodeClient.get("/accounts", {
    where: {
      public_address: {
        $eq: publicAddress,
      },
    },
    limit: 1,
  });

  if (!user) {
    resultProps.user = defaultFormState;
    return { props: resultProps };
  }

  const email =
    user.email === composeVirtualEmailFromAddress(publicAddress)
      ? ""
      : user.email;

  resultProps.user = removeEmpty({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: email,
    phone: user.phone,
    address1: user.shipping.address1,
    address2: user.shipping.address2,
    city: user.shipping.city,
    zip: user.shipping.zip,
    country: user.shipping.country,
  });

  return {
    props: resultProps,
  };
});

export default function Checkout({ user, address }) {
  const { t } = useTranslation("Checkout");
  const [, setSnackbar] = useRecoilState(snackbarState);

  const [formData, setFormData] = useState();

  const [{ error }, { isSuccess: cartIsUpdated, isLoading }] =
    useUpdateShipping(formData);

  useEffect(() => {
    if (!error) {
      return;
    }

    setSnackbar({
      message: t("Error response", { ns: "Common" }) + " " + error,
    });
  }, [error, setSnackbar, t]);

  useEffect(() => {
    if (!cartIsUpdated) {
      return;
    }

    setSnackbar({
      message: t("Account successfully updated", { ns: "Common" }),
    });
    setPaymentDialogOpen(true);
  }, [cartIsUpdated, setSnackbar, t]);

  useUpdateSession(address, "address");
  useUpdateSession(user, "user");

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const handleClose = useCallback(() => setPaymentDialogOpen(false), []);

  const [paymentTx, _isTxPending, _isTxSuccess, _isTxFailed] =
    useWatchPayment();

  useEffect(() => {
    if (!paymentTx) {
      return;
    }

    setPaymentDialogOpen(true);
  }, [paymentTx]);

  return (
    <Fragment>
      <PaymentWatcher />
      <Box sx={{ mb: 2 }}>
        <CheckoutHeadline />
      </Box>
      <CheckoutLayout>
        <Fragment>
          <PaymentDialog handleClose={handleClose} open={paymentDialogOpen} />
          <UnlockMetamaskLayout
            AlignProps={{
              sx: {
                "& .inner": {
                  textAlign: "center",
                  mt: 2,
                },
              },
            }}
            backToStore
          >
            <Form
              disableActions={paymentDialogOpen}
              initialFormState={user}
              onSubmit={setFormData}
              submitIsLoading={isLoading}
            />
          </UnlockMetamaskLayout>
        </Fragment>

        <Fragment>
          <Box
            sx={{
              p: {
                xs: 1,
                sm: 1,
                md: 2,
                lg: 5,
              },
            }}
          >
            <CartSummary />
          </Box>
        </Fragment>
      </CheckoutLayout>
    </Fragment>
  );
}

function AppLayout({ children }) {
  const { t } = useTranslation("Checkout");
  const { data: cart, isFetched } = useGetCart();
  const [, setSnackbar] = useRecoilState(snackbarState);
  const router = useRouter();
  const [paymentTx] = useWatchPayment();

  useEffect(() => {
    if (isFetched && !cart?.items?.length && !paymentTx) {
      setSnackbar({
        message: t("You need to choose any item from the store firstly"),
      });

      router.replace(withLocale(router.locale, LINKS.STORE));
    }
  }, [cart, isFetched, setSnackbar, t, router, paymentTx]);

  return <Layout displayNavbar={false}>{children}</Layout>;
}

AppLayout.propTypes = {
  children: PropTypes.node,
};

Checkout.AppLayout = AppLayout;

Checkout.propTypes = {
  address: PropTypes.string,
  user: PropTypes.object,
};
