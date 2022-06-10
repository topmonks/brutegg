import PropTypes from "prop-types";
import { Fragment } from "react";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <Fragment>
      <Navbar />
      {children}
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
