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
  images: {
    domains: ["cdn.schema.io"],
    // experimental
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "cdn.schema.io",
    //     port: "",
    //     pathname: "/brute/**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
