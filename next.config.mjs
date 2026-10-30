import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: "media.graphassets.com",
        protocol: "https",
      },
      {
        hostname: "sa-east-1.graphassets.com",
        protocol: "https",
      },
    ],
  },
  partialPrefetching: true,
};

export default withNextIntl(nextConfig);
