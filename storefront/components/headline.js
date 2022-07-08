import PropTypes from "prop-types";
import { Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Link from "next/link";
import { withLocale } from "../libs/router";
import { LINKS } from "./navbar";

export function Headline({ headlineText, paragraph, faqText }) {
  const router = useRouter();

  return (
    <Fragment>
      <Grid
        alignItems="center"
        container
        justifyContent="space-between"
        sx={{ my: { sm: 3, md: 5 } }}
      >
        <Grid item md="auto" sm={9}>
          <Typography display="block" variant="h5Outglow">
            {headlineText}
          </Typography>
          <Typography
            sx={{ opacity: "0.7", display: "inline" }}
            variant="subtitle1"
          >
            {paragraph}
          </Typography>
          {faqText && (
            <Typography sx={{ display: "inline", ml: 1 }} variant="link">
              <Link href={withLocale(router.locale, LINKS.FAQ)}>{faqText}</Link>
            </Typography>
          )}
        </Grid>
        <Grid item md="auto" sm={3} xs={12}></Grid>
      </Grid>
      <Divider />
    </Fragment>
  );
}

Headline.propTypes = {
  headlineText: PropTypes.node,
  paragraph: PropTypes.node,
  faqText: PropTypes.node,
};
