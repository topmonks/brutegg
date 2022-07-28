import PropTypes from "prop-types";
import { memo, useEffect, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { useTranslation } from "react-i18next";
import deburr from "lodash.deburr";
import { Box } from "@mui/material";
import _window from "../libs/window";

function Anchor({ children, href }) {
  const { t } = useTranslation("Common");
  return (
    <span style={{ display: "flex", alignItems: "baseline" }}>
      <a
        href={href}
        style={{ display: "flex", marginRight: "8px" }}
        title={t("Copy link to paragraph")}
      >
        <svg
          aria-hidden="true"
          height="20"
          version="1.1"
          viewBox="0 0 16 16"
          width="20"
        >
          <path
            d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
            fill="white"
          />
        </svg>
      </a>
      <span>{children}</span>
    </span>
  );
}

Anchor.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
};

const VALID_ID_REGEX = /([A-Za-z])+([A-Za-z0-9-_.:])*/gm;

function AnchoredHeaders({ children, onGenerateHeadings = () => {} }) {
  const localRef = useRef();
  const [headingsHrefs, setHeadingsHrefs] = useState();

  useEffect(() => {
    const el = localRef.current;
    const headings = Array.from(el.querySelectorAll("h1,h2,h3,h4,h5"));

    headings.forEach((h) => {
      h.id = deburr(h.innerText)
        .trim()
        .replace(/[ ,]/g, "-")
        .match(VALID_ID_REGEX)?.[0]
        .toLowerCase();
    });

    const headingsHrefs = headings.map((h) => ({
      href: `#${h.getAttribute("id")}`,
      textPrimary: h.innerText,
      el: h,
    }));

    headingsHrefs.forEach(({ href, textPrimary, el: h }) => {
      h.innerHTML = renderToStaticMarkup(
        <Anchor href={href}>{textPrimary}</Anchor>
      );
    });

    setHeadingsHrefs(headingsHrefs);
  }, [children]);

  useEffect(() => {
    if (!headingsHrefs) {
      return;
    }

    onGenerateHeadings(headingsHrefs);
  }, [headingsHrefs, onGenerateHeadings]);

  const scrolledTo = useRef(false);
  useEffect(() => {
    if (!headingsHrefs?.length) {
      return;
    }
    if (scrolledTo.current) {
      return;
    }

    if (!_window.location.hash) {
      return;
    }

    _window.document.querySelector(_window.location.hash)?.scrollIntoView();

    scrolledTo.current = true;
  }, [headingsHrefs]);

  return <Box ref={localRef}>{children}</Box>;
}

AnchoredHeaders.propTypes = {
  children: PropTypes.node,
  onGenerateHeadings: PropTypes.func,
};

export default memo(AnchoredHeaders);
