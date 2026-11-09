import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Only the CI test build sets this: it exposes the API used by `instant()` from @next/playwright.
const exposeTestingApi = process.env.EXPOSE_TESTING_API === "1";

const SECURITY_HEADERS = [
  // The site never needs to be shown inside another site (clickjacking).
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  // The floating dev button covers fields in the corner of the screen on phones.
  devIndicators: false,
  experimental: {
    exposeTestingApiInProductionBuild: exposeTestingApi,
  },
  headers() {
    return [{ headers: SECURITY_HEADERS, source: "/:path*" }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Hygraph asset URLs never change content, so optimized copies can live for 30 days.
    minimumCacheTTL: 60 * 60 * 24 * 30,
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
