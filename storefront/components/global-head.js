import Head from "next/head";

export default function GlobalHead() {
  return (
    <Head>
      <title>Brute merch</title>
      <link
        href="/apple-touch-icon.png"
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href="/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link
        href="/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link href="/site.webmanifest" rel="manifest" />
      <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" />
      <meta content="#b91d47" name="msapplication-TileColor" />
      <meta content="#333333" name="theme-color" />

      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link crossOrigin href="https://fonts.gstatic.com" rel="preconnect" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
        rel="stylesheet"
      ></link>
    </Head>
  );
}
