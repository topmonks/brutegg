import PropTypes from "prop-types";
import { alpha, Grid } from "@mui/material";
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
            <ContextMenu links={links} />
          </Grid>
          <Grid
            item
            lg={10}
            sm={9}
            sx={{
              px: { xs: 1, md: 5 },
              py: { xs: 1, md: 4 },
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
