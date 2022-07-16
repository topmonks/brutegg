import PropTypes from "prop-types";
import { Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Link from "next/link";
import { withLocale } from "../libs/router";
import { LINKS } from "./navbar";

export function Headline({
  headlineText,
  paragraph,
  faqText,
  faqLink,
  center = false,
}) {
  const router = useRouter();

  return (
    <Fragment>
      <Grid
        alignItems="center"
        container
        justifyContent="space-between"
        sx={[{ my: { sm: 3, md: 5 } }, center && { textAlign: "center" }]}
      >
        <Grid item md={center ? 12 : "auto"} sm={center ? 12 : 9}>
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
              <Link href={faqLink || withLocale(router.locale, LINKS.FAQ)}>
                {faqText}
              </Link>
            </Typography>
          )}
        </Grid>
        <Grid
          item
          md={center ? 12 : "auto"}
          sm={center ? 12 : 3}
          xs={12}
        ></Grid>
      </Grid>
      <Divider />
    </Fragment>
  );
}

Headline.propTypes = {
  center: PropTypes.bool,
  faqLink: PropTypes.string,
  faqText: PropTypes.node,
  headlineText: PropTypes.node,
  paragraph: PropTypes.node,
};
