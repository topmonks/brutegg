import { useMemo, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import AnchoredHeaders from "../../components/anchored-headers";
import { getPrivacyPolicyQuery } from "../../libs/swell";
import _window from "../../libs/window";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import StyledDescription from "../../components/styled-description";
import PrivacyPolicyLayout from "../../components/privacy-policy/privacy-policy-layout";
import { withSwellLanguageStaticProps } from "../../libs/with-swell-language";

export const getStaticProps = withSwellLanguageStaticProps(
  async function getStaticProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["privacy-policy"], getPrivacyPolicyQuery);

    if (!queryClient.getQueryData(["privacy-policy"])) {
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

export default function PrivacyPolicy() {
  const { data: privacyPolicy } = useQuery(
    ["privacy-policy"],
    getPrivacyPolicyQuery
  );
  const [headings, setHeadings] = useState([]);

  const content = useMemo(
    () => (
      <StyledDescription
        dangerouslySetInnerHTML={{ __html: privacyPolicy?.description }}
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
    [privacyPolicy]
  );

  const { t } = useTranslation();

  return (
    <PrivacyPolicyLayout links={headings}>
      <Head>
        <title>{t("Privacy policy", { ns: "Titles" })} | Brute</title>
      </Head>
      <AnchoredHeaders onGenerateHeadings={setHeadings}>
        {content}
      </AnchoredHeaders>
    </PrivacyPolicyLayout>
  );
}
