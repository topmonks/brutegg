import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useState } from "react";
import Navbar from "./navbar";
import { Box, Container } from "@mui/material";
import { NAVBAR_CHANGE } from "../state/event-target";
import useEventTarget from "../hooks/use-event-target";

import Skeletons from "./page-skeleton";

export default function Layout({ children }) {
  const [SkeletonComponent, setSkeletonComponent] = useState();

  const onNavbarChange = useCallback((event) => {
    const target = event.detail.target;
    const skeleton = Skeletons[target];
    if (skeleton) {
      setSkeletonComponent(() => skeleton);
    }
  }, []);

  useEventTarget(NAVBAR_CHANGE, onNavbarChange);

  useEffect(() => {
    setSkeletonComponent(null);
  }, [children]);

  return (
    <Fragment>
      <Container maxWidth="xl">
        <Navbar />
        <Box sx={{ mt: 2, mb: 2 }}>
          {SkeletonComponent ? (
            <SkeletonComponent fromMainNavigation />
          ) : (
            children
          )}
        </Box>
      </Container>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
