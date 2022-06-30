import { Button, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { withLocale } from "../../libs/router";
import { LINKS } from "../navbar";

export function QuestHeadline() {
  const { t } = useTranslation("Quests");
  const router = useRouter();

  return (
    <Fragment>
      <Grid container justifyContent="space-between" sx={{ my: { sm: 3 } }}>
        <Grid item md="auto" sm={9}>
          <Typography component="h4" variant="h4">
            {t("Complete the tasks")}
          </Typography>
          <Typography variant="subtitle1">
            {t("Earn amazing rewards by completing community challenges")}
          </Typography>
        </Grid>
        <Grid item md="auto" sm={3} xs={12}>
          <Button
            disableElevation
            onClick={() => router.push(withLocale(router.locale, LINKS.FAQ))}
            size="large"
            sx={{
              height: "100%",
              width: { xs: "100%", sm: "250px" },
              fontWeight: "bold",
            }}
            type="submit"
            variant="contained"
          >
            {t("How to start")}
          </Button>
        </Grid>
      </Grid>
      <Divider />
    </Fragment>
  );
}