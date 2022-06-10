import PropTypes from "prop-types";
import { Fragment } from "react";

export default function Layout({ children }) {
  return <Fragment>{children}</Fragment>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
