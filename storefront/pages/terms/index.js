import { useMemo, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import AnchoredHeaders from "../../components/anchored-headers";
import { getTermsQuery } from "../../libs/swell";
import _window from "../../libs/window";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import StyledDescription from "../../components/styled-description";
import TermsLayout from "../../components/terms/terms-layout";
import { withSwellLanguageStaticProps } from "../../libs/with-swell-language";

export const getStaticProps = withSwellLanguageStaticProps(
  async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["terms"], getTermsQuery);

    if (!queryClient.getQueryData(["terms"])) {
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

export default function Terms() {
  const { data: terms } = useQuery(["terms"], getTermsQuery);
  const [headings, setHeadings] = useState([]);

  const content = useMemo(
    () => (
      <StyledDescription
        dangerouslySetInnerHTML={{ __html: terms?.description }}
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
    [terms]
  );

  const { t } = useTranslation();

  return (
    <TermsLayout links={headings}>
      <Head>
        <title>
          {t("General terms and conditions", { ns: "Titles" })} | Brute
        </title>
      </Head>
      <AnchoredHeaders onGenerateHeadings={setHeadings}>
        {content}
      </AnchoredHeaders>
    </TermsLayout>
  );
}
