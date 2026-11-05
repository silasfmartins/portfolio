import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  // The floating dev button covers fields in the corner of the screen on phones.
  devIndicators: false,
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
