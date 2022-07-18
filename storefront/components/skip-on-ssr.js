import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";

export default function SkipOnSSR({ children }) {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    setDisplay(true);
  }, []);
  return <Fragment>{display && children}</Fragment>;
}

SkipOnSSR.propTypes = {
  children: PropTypes.node,
};
