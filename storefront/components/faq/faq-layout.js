import PropTypes from "prop-types";
import { alpha, Box, Grid } from "@mui/material";
import ContextMenu from "../context-menu";
import { Fragment } from "react";
import DoubleBorderBox from "../double-border-box";
import { FAQHeadline } from "./faq-headline";

export default function FAQLayout({ children, links }) {
  return (
    <Fragment>
      <FAQHeadline />
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

FAQLayout.propTypes = {
  children: PropTypes.node,
  links: PropTypes.array,
};