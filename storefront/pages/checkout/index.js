import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import swell from "swell-js";
import Form from "../../components/checkout/form";
import { swellNodeClient } from "../../libs/swell-node";
import window from "../../libs/window";
import { withSessionSsr } from "../../libs/with-session";
import { snackbarState } from "../../state/snackbar";
import { ethereumState } from "../../state/ethereum";
import useMetamaskUnlocked from "../../hooks/use-metamask-unlocked";
import useUpdateSession from "../../hooks/use-update-session";
import UnlockButton from "../../components/unlock-button";
import MetamaskButton from "../../components/web3/metamask-button";
import PaymentDialog from "../../components/checkout/payment-dialog";
import { useQuery } from "react-query";
import fetchThrowHttpError from "../../libs/fetch-throw-http-error.mjs";
import CheckoutLayout from "../../components/checkout/checkout-layout";
import CartSummary from "../../components/checkout/cart-summary";

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
    return { props: resultProps };
  }

  resultProps.user = {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    address1: user.shipping.address1,
    address2: user.shipping.address2,
    city: user.shipping.city,
    zip: user.shipping.zip,
    country: user.shipping.country,
  };

  return {
    props: resultProps,
  };
});

export default function Checkout({ user, address }) {
  const { t } = useTranslation("Checkout");
  const [, setSnackbar] = useRecoilState(snackbarState);

  const [formData, setFormData] = useState();

  const { error } = useQuery(
    ["/api/swell/upsert-customer", formData],
    () =>
      window
        ?.fetch("/api/swell/upsert-customer", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        })
        .then(fetchThrowHttpError)
        .then(async (res) => {
          const user = await res.json();
          if (user.errors) {
            throw Object.values(user.errors).map((e) => e.message);
          } else {
            return user;
          }
        }),
    {
      enabled: Boolean(formData),
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!error) {
      return;
    }

    setSnackbar({
      message: t("Error response", { ns: "Common" }) + " " + error,
    });
  }, [error, setSnackbar, t]);

  const { isSuccess: cartIsUpdated } = useQuery(
    ["/swell.cart.update/", formData],
    () =>
      swell.cart.update({
        shipping: {
          name: formData.firstName + " " + formData.lastName,
          address1: formData.address1,
          address2: formData.address2,
          city: formData.city,
          zip: formData.zip,
          country: formData.country,
        },
      }),
    {
      enabled: Boolean(formData),
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!cartIsUpdated) {
      return;
    }

    setSnackbar({
      message: t("Account successfully updated", { ns: "Common" }),
    });
    setPaymentDialogOpen(true);
  }, [cartIsUpdated, setSnackbar, t]);

  const [session] = useUpdateSession(address, "address");
  useUpdateSession(user, "user");

  const ethereum = useRecoilValue(ethereumState);

  const isUnlocked = useMetamaskUnlocked(session?.address);

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const handleClose = useCallback(() => setPaymentDialogOpen(false), []);

  let content;

  if (ethereum.account) {
    if (isUnlocked) {
      content = (
        <Form
          hideActions={paymentDialogOpen}
          initialFormState={user}
          onSubmit={setFormData}
        />
      );
    } else {
      content = (
        <Box display="flex" justifyContent="center">
          <UnlockButton size="large" sx={{ fontWeight: "bold" }} />
        </Box>
      );
    }
  } else {
    content = <MetamaskButton />;
  }

  return (
    <CheckoutLayout>
      <Fragment>
        <PaymentDialog handleClose={handleClose} open={paymentDialogOpen} />
        <Typography component="h3" variant="h5">
          {t("Checkout")}
        </Typography>
        {content}
      </Fragment>

      <Fragment>
        <Typography component="h3" sx={{ mb: 2 }} variant="h5">
          {t("Items")}
        </Typography>
        <Box sx={{ pr: { md: 5 } }}>
          <CartSummary />
        </Box>
      </Fragment>
    </CheckoutLayout>
  );
}

Checkout.propTypes = {
  address: PropTypes.string,
  user: PropTypes.object,
};
