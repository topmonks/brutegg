import PropTypes from "prop-types";
import { Fragment } from "react";
import PageLayout from "../page-layout";
import { FAQHeadline } from "./faq-headline";

export default function FAQLayout({ children, links }) {
  return (
    <Fragment>
      <FAQHeadline />

      <PageLayout links={links}>{children}</PageLayout>
    </Fragment>
  );
}

FAQLayout.propTypes = {
  children: PropTypes.node,
  links: PropTypes.array,
};
