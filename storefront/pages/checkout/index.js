import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect } from "react";
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

  useEffect(() => {
    swell.cart.get().then((c) => console.log(c));
  }, []);

  const upsertCustomer = useCallback(
    (body = {}) => {
      window
        ?.fetch("/api/swell/upsert-customer", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(body),
        })
        .then(async (res) => {
          if (res.status === 200) {
            const user = await res.json();
            if (user.errors) {
              setSnackbar({
                message:
                  t("Error response", { ns: "Common" }) +
                  " " +
                  Object.values(user.errors).map((e) => e.message),
              });
            } else {
              setSnackbar({
                message: t("Account successfully updated", { ns: "Common" }),
              });
            }
          } else {
            setSnackbar({
              message:
                t("Error response", { ns: "Common" }) +
                " " +
                (await res.text()),
            });
          }
        });
    },
    [t, setSnackbar]
  );

  const [session] = useUpdateSession(address, "address");
  const ethereum = useRecoilValue(ethereumState);

  const isUnlocked = useMetamaskUnlocked(session?.address);

  console.log({ isUnlocked, session });

  let content;

  if (ethereum.account) {
    if (isUnlocked) {
      content = <Form initialFormState={user} onSubmit={upsertCustomer} />;
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
    <Grid container direction="row-reverse">
      <Grid item md={3} sm={5} xs={12}>
        <Typography component="h3" variant="h6">
          {t("Items")}
        </Typography>
      </Grid>
      <Grid item md={9} sm={7} xs={12}>
        <Box
          sx={{
            pl: {
              md: 5,
            },
          }}
        >
          <Typography component="h3" variant="h6">
            {t("Checkout")}
          </Typography>
          {content}
        </Box>
      </Grid>
    </Grid>
  );
}

Checkout.propTypes = {
  address: PropTypes.string,
  user: PropTypes.object,
};
