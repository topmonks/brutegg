import PropTypes from "prop-types";
import { Fragment, useCallback, useEffect, useState } from "react";
import { alpha, Box, Container, GlobalStyles } from "@mui/material";
import Navbar from "./navbar";
import { NAVBAR_CHANGE } from "../state/event-target";
import useEventTarget from "../hooks/use-event-target";

import Skeletons from "./page-skeleton";
import { useTheme } from "@emotion/react";
import Footer from "./footer";

export default function Layout({ children, displayNavbar = true }) {
  const [SkeletonComponent, setSkeletonComponent] = useState();

  const onNavbarChange = useCallback((event) => {
    const target = event.detail.target;
    const Skeleton = Skeletons[target];
    if (Skeleton) {
      setSkeletonComponent(() => Skeleton);
    }
  }, []);

  useEventTarget(NAVBAR_CHANGE, onNavbarChange);

  useEffect(() => {
    setSkeletonComponent(null);
  }, [children]);

  const theme = useTheme();

  return (
    <Fragment>
      <GlobalStyles
        styles={{
          body: {
            [theme.breakpoints.up("lg")]: {
              background: `url("https://res.cloudinary.com/brutegg/image/upload/v1658220272/brutegg-swell/bg-blue_cyzyrn.png") no-repeat top left, url("https://res.cloudinary.com/brutegg/image/upload/v1657539255/brutegg-swell/bg-red_gyrdes.svg") no-repeat top right, ${alpha(
                "#000",
                1
              )}`,
              backgroundSize: "512px 1176px, auto",
            },
            overflowY: "scroll",
          },
        }}
      />
      <Container
        maxWidth="xl"
        sx={{
          px: {
            sm: 2,
            md: 1,
            lg: 2,
          },
        }}
      >
        {displayNavbar && !SkeletonComponent?.hideNavbar && <Navbar />}
        <Box
          sx={{
            mb: 2,
            boxShadow: {
              sm: `0 0 0 1px ${alpha("#fff", 0.2)}, 0 0 30px 0 ${alpha(
                "#000",
                1
              )}`,
            },
            background: `linear-gradient(0deg, ${alpha(
              "#101112",
              1
            )} calc(100% - 150px), ${alpha("#111214", 0)} 100%)`,
            p: { sm: 2 },
            pt: { sm: 0 },
          }}
        >
          {SkeletonComponent ? (
            <SkeletonComponent fromMainNavigation />
          ) : (
            children
          )}
        </Box>
        <Box sx={{ my: 5 }}>
          <Footer />
        </Box>
      </Container>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  displayNavbar: PropTypes.bool,
};
