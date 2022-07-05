import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import ContextMenu from "../context-menu";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ethereumState } from "../../state/ethereum";
import { USER_LINKS } from "../navbar";

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
    <Grid container>
      <Grid item lg={2} sm={3} sx={{ display: { xs: "none", sm: "block" } }}>
        <ContextMenu links={links} />
      </Grid>
      <Grid item lg={10} sm={9} sx={{ pl: { md: 3 }, pt: { md: 2 } }} xs={12}>
        {children}
      </Grid>
    </Grid>
  );
}

ProfileLayout.propTypes = {
  children: PropTypes.node,
  rightExpanded: PropTypes.bool,
};
