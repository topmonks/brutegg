import PropTypes from "prop-types";
import { Fragment } from "react";
import PageLayout from "../page-layout";
import { TermsHeadline } from "./terms-headline";

export default function TermsLayout({ children, links }) {
  return (
    <Fragment>
      <TermsHeadline />

      <PageLayout links={links}>{children}</PageLayout>
    </Fragment>
  );
}

TermsLayout.propTypes = {
  children: PropTypes.node,
  links: PropTypes.array,
};
