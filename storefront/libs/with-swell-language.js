import swell from "swell-js";

export function withSwellLanguageStaticProps(handler) {
  return async function getStaticProps(context) {
    swell.init(
      process.env.NEXT_PUBLIC_SWELL_STORE_ID,
      process.env.NEXT_PUBLIC_SWELL_PUBLIC_KEY,
      {
        locale: context.locale,
      }
    );

    return handler(context);
  };
}
