import { useMemo, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useTranslation } from "react-i18next";

import AnchoredHeaders from "../../components/anchored-headers";
import { getFAQQuery } from "../../libs/swell";
import _window from "../../libs/window";
import StyledDescription from "../../components/styled-description";
import FAQLayout from "../../components/faq/faq-layout";
import { withSwellLanguageStaticProps } from "../../libs/with-swell-language";

export const getStaticProps = withSwellLanguageStaticProps(
  async function getStaticProps() {
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
);

export default function FAQ() {
  const { data: faq } = useQuery(["faq"], getFAQQuery);
  const [headings, setHeadings] = useState([]);

  const content = useMemo(
    () => (
      <StyledDescription
        dangerouslySetInnerHTML={{ __html: faq.description }}
        sx={{
          "& h1,h2,h3,h4": {
            scrollMarginTop: "16px",
          },
          "&>:first-child": {
            marginTop: 0,
          },
        }}
      />
    ),
    [faq]
  );

  const { t } = useTranslation();

  return (
    <FAQLayout links={headings}>
      <Head>
        <title>{t("FAQ", { ns: "Titles" })} | Brute</title>
      </Head>
      <AnchoredHeaders onGenerateHeadings={setHeadings}>
        {content}
      </AnchoredHeaders>
    </FAQLayout>
  );
}
