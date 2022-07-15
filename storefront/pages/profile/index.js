import PropTypes from "prop-types";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";

import Form from "../../components/profile/form";
import ProfileLayout from "../../components/profile/profile-layout";
import UnlockMetamaskLayout from "../../components/unlock-metamask-layout";
import useUpdateSession from "../../hooks/use-update-session";
import { swellNodeClient } from "../../libs/swell-node";
import window from "../../libs/window";
import { withSessionSsr } from "../../libs/with-session";
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
  useUpdateSession(address, "address");
  useUpdateSession(user, "user");

  const [, setSnackbar] = useRecoilState(snackbarState);

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

  return (
    <ProfileLayout>
      <UnlockMetamaskLayout
        AlignProps={{
          sx: {
            justifyContent: "flex-start !important",
            alignItems: "flex-start !important",
            "& .inner": {
              width: {
                md: "60%",
              },
            },
          },
        }}
      >
        <Form initialFormState={user} onSubmit={upsertCustomer} />
      </UnlockMetamaskLayout>
    </ProfileLayout>
  );
}

Profile.propTypes = {
  address: PropTypes.string,
  user: PropTypes.object,
};
