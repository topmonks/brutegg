import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { Fragment } from "react";
import { QuestHeadline } from "./quests-headline";

export default function QuestsLayout({
  children,
  rightExpanded,
  displayHeadline = true,
}) {
  return (
    <Fragment>
      {displayHeadline && <QuestHeadline />}

      <Grid container justifyContent={rightExpanded ? "flex-start" : "center"}>
        <Grid
          item
          sm={rightExpanded ? 5 : 8}
          sx={[rightExpanded && { display: { xs: "none", sm: "block" } }]}
          xs={12}
        >
          {children[0]}
        </Grid>
        <Grid item sm={7} sx={[!rightExpanded && { display: "none" }]} xs={12}>
          {children[1]}
        </Grid>
      </Grid>
    </Fragment>
  );
}

QuestsLayout.propTypes = {
  children: PropTypes.node,
  displayHeadline: PropTypes.bool,
  rightExpanded: PropTypes.bool,
};
