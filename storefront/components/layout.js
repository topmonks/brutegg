import PropTypes from "prop-types";
import { Fragment } from "react";
import Navbar from "./navbar";
import GlobalHead from "./global-head";
import { Container } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Fragment>
      <Container maxWidth="lg">
        <GlobalHead />
        <Navbar />
        {children}
      </Container>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
