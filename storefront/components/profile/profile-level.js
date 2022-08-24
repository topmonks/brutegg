import { Fragment, useMemo } from "react";
import {
  alpha,
  Box,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from "@mui/material";
import { bruteState } from "../../state/brute-token";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import PriceTag from "../price-tag";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import fetchThrowHttpError from "../../libs/fetch-throw-http-error.mjs";
import { sessionState } from "../../state/session";

const BalanceItem = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const LevelProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 6,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 6,
    boxShadow: `0 0 10px 0 ${alpha(theme.palette.primary.main, 1)}`,
  },
}));

export function ProfileLevel() {
  const { t } = useTranslation("Profile");
  const brute = useRecoilValueLoadable(bruteState);
  const session = useRecoilValue(sessionState);
  const firstName = session?.user?.firstName;
  const lastName = session?.user?.lastName;

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

  const { data: levels } = useQuery(
    ["/api/swell/get-profile-levels/"],
    /**
     * @returns {Promise<import("../types/swell")>}
     */
    () =>
      window
        ?.fetch("/api/swell/get-profile-levels")
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

  const level = useMemo(() => {
    if (!levels) {
      return null;
    }

    if (!customer) {
      return null;
    }

    const spentBrute = customer.spent_brute || 0;

    let currentLevel = null;

    for (const level of levels) {
      if (level.required_spent <= spentBrute) {
        currentLevel = level;
      } else {
        continue;
      }
    }

    return currentLevel;
  }, [levels, customer]);

  const levelIx = useMemo(() => {
    if (!level) {
      return null;
    }

    return levels.findIndex((l) => l.id === level.id);
  }, [levels, level]);

  const nextLevel = useMemo(() => {
    if (levelIx == null) {
      return;
    }

    return levels[levelIx + 1];
  }, [levelIx, levels]);

  const spentBrute = customer?.spent_brute || 0;
  const remaining = nextLevel?.required_spent - spentBrute;
  const remainingPercent = nextLevel
    ? spentBrute / (nextLevel.required_spent / 100)
    : 100;

  return (
    <Fragment>
      <Box
        sx={{
          px: { xs: 1, md: 4 },
          py: { xs: 1, md: 6 },
          position: { sm: "sticky" },
          top: { sm: 0 },
          mb: { xs: 5, sm: 0 },
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
          {firstName} {lastName}
        </Typography>
        {level?.avatar_url && (
          <Box sx={{ my: 1, textAlign: "center" }}>
            <img
              src={level.avatar_url}
              style={{
                maxWidth: "min(100%, 260px)",
                margin: "auto",
                display: "block",
              }}
            />
            <LevelProgress
              sx={{ mt: 2 }}
              value={remainingPercent}
              variant="determinate"
            />
            {nextLevel && (
              <Typography sx={{ mt: 1, display: "block" }} variant="caption">
                <PriceTag
                  amount={spentBrute}
                  displayLetter={false}
                  displayLogo={false}
                  sx={{ fontWeight: "bold" }}
                />{" "}
                /{" "}
                <PriceTag
                  amount={nextLevel.required_spent}
                  displayLetter
                  displayLogo={false}
                  sx={{ fontWeight: "bold" }}
                />
              </Typography>
            )}

            <Typography
              component="span"
              sx={{ mt: 2, display: "block" }}
              variant="h6"
            >
              {t("Level")} {levelIx + 1} <b>{level.label}</b>
            </Typography>
            <Box
              sx={{
                position: "absolute",
                width: "50%",
                left: 0,
                right: 0,
                margin: "auto",
                top: "25%",
                aspectRatio: "1/1",
                borderRadius: "50%",
                zIndex: -1,
                border: "2px solid " + alpha("#fff", 0.1),
                background: alpha("#fff", 0.05),
                boxShadow: "0 0 20px 2px " + alpha("#fff", 0.1),
              }}
            />
          </Box>
        )}
        <BalanceItem sx={{ mb: { xs: 0.5, sm: 2 }, mt: { xs: 2, sm: 6 } }}>
          <Typography>{t("Wallet balance")}</Typography>
          <PriceTag
            amount={brute.contents?.account?.balance || ""}
            displayLetter
            displayLogo={false}
            sx={{ fontWeight: "bold" }}
          />
        </BalanceItem>
        <BalanceItem sx={{ mb: { xs: 0.5, sm: 2 } }}>
          <Typography>{t("Total spending")}</Typography>
          <PriceTag
            amount={customer?.spent_brute || "0"}
            displayLetter
            displayLogo={false}
            sx={{ fontWeight: "bold" }}
          />
        </BalanceItem>
        {nextLevel && (
          <BalanceItem sx={{ mb: { xs: 0.5, sm: 2 } }}>
            <Typography>
              {t("To progress to the {{nextLevel.label}}", { nextLevel })}
            </Typography>
            <PriceTag
              amount={remaining || "0"}
              displayLetter
              displayLogo={false}
              sx={{ fontWeight: "bold" }}
            />
          </BalanceItem>
        )}
      </Box>
    </Fragment>
  );
}

ProfileLevel.propTypes = {};
