/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
