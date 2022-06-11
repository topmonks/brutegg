/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/quests",
        permanent: false,
      },
    ];
  },
  i18n: {
    locales: ["cs"],
    defaultLocale: "cs",
  },
};

module.exports = nextConfig;
