import PropTypes from "prop-types";
import { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import { bruteState } from "../../state/brute-token";
import { useRecoilValueLoadable } from "recoil";
import PriceTag from "../price-tag";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import fetchThrowHttpError from "../../libs/fetch-throw-http-error.mjs";
import { maxWidth } from "@mui/system";

const BalanceItem = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export function ProfileLevel({ user }) {
  const { t } = useTranslation("Profile");
  const brute = useRecoilValueLoadable(bruteState);
  const { data: customer } = useQuery(
    ["/api/swell/get-customer/"],
    /**
     * @returns {Promise<import("../types/swell")>}
     */
    () =>
      window
        ?.fetch("/api/swell/get-customer")
        .then(fetchThrowHttpError)
        .then((res) => res.json())
        .catch((e) => {
          if (e.status === 404) {
            return null;
          }

          return e;
        })
  );

  const { data: level } = useQuery(
    ["/api/swell/get-profile-levels/"],
    /**
     * @returns {Promise<import("../types/swell")>}
     */
    () =>
      window
        ?.fetch(
          "/api/swell/get-profile-levels?spentBrute=" +
            (customer.spent_brute || 0)
        )
        .then(fetchThrowHttpError)
        .then((res) => res.json())
        .catch((e) => {
          if (e.status === 404) {
            return null;
          }

          return e;
        }),
    { enabled: Boolean(customer) }
  );

  console.log({ customer, level });

  return (
    <Fragment>
      <Box
        sx={{
          pl: { xs: 0, md: 8 },
          pr: { xs: 0, md: 3 },
          position: { sm: "sticky" },
          top: { sm: 24 },
        }}
      >
        <Typography
          component="h3"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            display: "block",
            wordSpacing: {
              xs: "normal",
              md: "100vw",
            },
            mb: { xs: 2, md: 5 },
          }}
          variant="h5"
        >
          {user.firstName} {user.lastName}
        </Typography>
        {level?.avatar_url && (
          <Box sx={{ my: 1 }}>
            <img
              src={level.avatar_url}
              style={{
                maxWidth: "min(100%, 260px)",
                margin: "auto",
                display: "block",
              }}
            />
          </Box>
        )}
        <BalanceItem sx={{ mb: { xs: 0.5, sm: 2 } }}>
          <Typography>{t("Wallet balance")}</Typography>
          <PriceTag
            amount={brute.contents?.account?.balance || ""}
            displayLetter
            displayLogo={false}
            sx={{ fontWeight: "bold" }}
          ></PriceTag>
        </BalanceItem>
        <BalanceItem sx={{ mb: { xs: 0.5, sm: 2 } }}>
          <Typography>{t("Total spending")}</Typography>
          <PriceTag
            amount={customer?.spent_brute || "0"}
            displayLetter
            displayLogo={false}
            sx={{ fontWeight: "bold" }}
          ></PriceTag>
        </BalanceItem>
      </Box>
    </Fragment>
  );
}

ProfileLevel.propTypes = {
  user: PropTypes.object,
};
