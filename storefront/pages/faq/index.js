import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import AnchoredHeaders from "../../components/anchored-headers";
import FAQLayout from "../../components/faq/faq-layout";
import { getProduct } from "../../libs/swell";
import { ProductPropTypes } from "../../types/swell";

export async function getStaticProps() {
  const faq = await getProduct("faq");

  if (!faq) {
    return {
      notFound: true,
    };
  }

  return {
    props: { faq },
  };
}

export default function FAQ({ faq }) {
  const [headings, setHeadings] = useState([]);

  const content = useMemo(
    () => (
      <Box
        dangerouslySetInnerHTML={{ __html: faq.description }}
        sx={{
          "& h1,h2,h3,h4": {
            scrollMarginTop: "30px",
          },
        }}
      ></Box>
    ),
    [faq]
  );

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
