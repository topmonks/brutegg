import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";

import Form from "../../components/profile/form";
import ProfileLayout from "../../components/profile/profile-layout";
import UnlockMetamaskLayout from "../../components/unlock-metamask-layout";
import useUpdateSession from "../../hooks/use-update-session";
import { swellNodeClient } from "../../libs/swell-node";
import { removeEmpty } from "../../libs/util";
import window from "../../libs/window";
import { withSessionSsr } from "../../libs/with-session";
import { defaultFormState } from "../../state/profile";
import { snackbarState } from "../../state/snackbar";
import { composeVirtualEmailFromAddress } from "../../libs/web3";
import Head from "next/head";

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
    discord: user.discord_username,
    reddit: user.reddit_username,
    instagram: user.instagram_username,
    address1: user.shipping.address1,
    city: user.shipping.city,
    zip: user.shipping.zip,
    country: user.shipping.country,
  });

  return {
    props: resultProps,
  };
});

export default function Profile({ address, user }) {
  const { t } = useTranslation("Profile");
  useUpdateSession(address, "address");
  const [, , setSession] = useUpdateSession(user, "user");

  const [, setSnackbar] = useRecoilState(snackbarState);

  const upsertCustomer = useMutation(
    (body = {}) =>
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
              throw new Error(Object.values(user.errors).map((e) => e.message));
            }

            return user;
          } else {
            throw new Error(await res.text());
          }
        }),
    {
      onSuccess: (_data, formData) => {
        setSession((s) => ({ ...s, user: { ...s.user, ...formData } }));
        setSnackbar({
          message: t("Account successfully updated", { ns: "Common" }),
        });
      },
    }
  );

  return (
    <ProfileLayout>
      <Head>
        <title>{t("Profile", { ns: "Titles" })} | Brute</title>
      </Head>
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
        <Form
          initialFormState={user}
          onSubmit={upsertCustomer.mutate}
          onSubmitIsLoading={upsertCustomer.isLoading}
        />
      </UnlockMetamaskLayout>
    </ProfileLayout>
  );
}

Profile.propTypes = {
  address: PropTypes.string,
  user: PropTypes.object,
};
