import { Box } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import AnchoredHeaders from "../../components/anchored-headers";
import FAQLayout from "../../components/faq/faq-layout";
import { getFAQQuery } from "../../libs/swell";
import _window from "../../libs/window";
import { ProductPropTypes } from "../../types/swell";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["faq"], getFAQQuery);

  if (!queryClient.getQueryData(["faq"])) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function FAQ() {
  const { data: faq } = useQuery(["faq"], getFAQQuery);

  const [headings, setHeadings] = useState([]);

  const content = useMemo(
    () => (
      <Box
        dangerouslySetInnerHTML={{ __html: faq.description }}
        sx={{
          "& h1,h2,h3,h4": {
            scrollMarginTop: "16px",
          },
        }}
      ></Box>
    ),
    [faq]
  );

  const scrolledTo = useRef(false);
  useEffect(() => {
    if (!headings.length) {
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
  }, [headings]);

  return (
    <FAQLayout links={headings}>
      <AnchoredHeaders onGenerateHeadings={setHeadings}>
        {content}
      </AnchoredHeaders>
    </FAQLayout>
  );
}

FAQ.propTypes = {
  faq: ProductPropTypes,
};
