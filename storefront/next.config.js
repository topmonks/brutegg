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
    loader: "cloudinary",
    path: "https://res.cloudinary.com/brutegg/image/fetch/",
    domains: ["cdn.schema.io"],
    formats: ["image/avif", "image/webp"],
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
