import PropTypes from "prop-types";
import { alpha, Box, Grid } from "@mui/material";
import ContextMenu from "../context-menu";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ethereumState } from "../../state/ethereum";
import { USER_LINKS } from "../navbar";
import DoubleBorderBox from "../double-border-box";
import { ProfileHeadline } from "./profile-headline";

export default function ProfileLayout({ children }) {
  const { t } = useTranslation("Profile");
  const router = useRouter();
  const ethereum = useRecoilValue(ethereumState);

  useEffect(() => {
    if (ethereum.initialized && !ethereum.account) {
      // router.push(withLocale(router.locale, "/store"));
    }
  }, [router, ethereum]);

  const links = [
    {
      textPrimary: t("Profile", { ns: "Navbar" }),
      href: USER_LINKS.PROFILE,
    },
    {
      textPrimary: t("Wallet"),
      href: USER_LINKS.WALLET,
    },
    {
      textPrimary: t("List Rewards", { ns: "Titles" }),
      href: USER_LINKS.LIST_ORDERS,
    },
  ];

  return (
    <Fragment>
      <ProfileHeadline />
      <DoubleBorderBox>
        <Grid container>
          <Grid
            item
            lg={2}
            sm={3}
            sx={{
              borderBottom: {
                xs: `2px solid ${alpha("#fff", 0.2)}`,
                sm: "none",
              },
            }}
            xs={12}
          >
            <Box sx={{ position: { sm: "sticky" }, top: { sm: 8 } }}>
              <ContextMenu links={links} />
            </Box>
          </Grid>
          <Grid
            item
            lg={10}
            sm={9}
            sx={{
              minHeight: "80vh",
              borderLeft: { xs: "none", sm: `2px solid ${alpha("#fff", 0.2)}` },
            }}
            xs={12}
          >
            {children}
          </Grid>
        </Grid>
      </DoubleBorderBox>
    </Fragment>
  );
}

ProfileLayout.propTypes = {
  children: PropTypes.node,
  rightExpanded: PropTypes.bool,
};
