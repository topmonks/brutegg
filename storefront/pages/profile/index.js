import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import Form from "../../components/profile/form";
import ProfileLayout from "../../components/profile/profile-layout";
import UnlockButton from "../../components/unlock-button";
import MetamaskButton from "../../components/web3/metamask-button";
import useMetamaskUnlocked from "../../hooks/use-metamask-unlocked";
import useUpdateSession from "../../hooks/use-update-session";
import { swellNodeClient } from "../../libs/swell-node";
import window from "../../libs/window";
import { withSessionSsr } from "../../libs/with-session";
import { ethereumState } from "../../state/ethereum";
import { snackbarState } from "../../state/snackbar";

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

export default function Profile({ address, user }) {
  const { t } = useTranslation("Profile");
  const [session] = useUpdateSession(address, "address");
  useUpdateSession(user, "user");

  const ethereum = useRecoilValue(ethereumState);
  const [, setSnackbar] = useRecoilState(snackbarState);

  const isUnlocked = useMetamaskUnlocked(session?.address);

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

  let content;

  if (ethereum.account) {
    if (isUnlocked) {
      content = <Form initialFormState={user} onSubmit={upsertCustomer} />;
    } else {
      content = (
        <Box display="flex" justifyContent="flex-start">
          <UnlockButton size="large" sx={{ fontWeight: "bold" }} />
        </Box>
      );
    }
  } else {
    content = (
      <Box display="flex" justifyContent="flex-start">
        <MetamaskButton />
      </Box>
    );
  }

  return <ProfileLayout>{content}</ProfileLayout>;
}

Profile.propTypes = {
  address: PropTypes.string,
  user: PropTypes.object,
};
