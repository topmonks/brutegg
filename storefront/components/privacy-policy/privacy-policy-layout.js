import PropTypes from "prop-types";
import { Fragment } from "react";
import PageLayout from "../page-layout";
import { PrivacyPolicyHeadline } from "./privacy-policy-headline";

export default function PrivacyPolicyLayout({ children, links }) {
  return (
    <Fragment>
      <PrivacyPolicyHeadline />

      <PageLayout links={links}>{children}</PageLayout>
    </Fragment>
  );
}

PrivacyPolicyLayout.propTypes = {
  children: PropTypes.node,
  links: PropTypes.array,
};
