/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/store",
        permanent: false,
      },
    ];
  },
  i18n: {
    locales: ["cs", "en"],
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
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
