"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

/**
 * Vercel Web Analytics: page views without cookies or a visitor ID. The query string is
 * removed before sending, so search text (`?q=`, `?search=`) never leaves the browser.
 */
function withoutQuery(event: BeforeSendEvent) {
  const url = new URL(event.url);
  url.search = "";
  return { ...event, url: url.toString() };
}

/** The script only exists on Vercel, so it is left out locally and in CI. */
export function SiteAnalytics() {
  if (!process.env.NEXT_PUBLIC_VERCEL_ENV) {
    return null;
  }

  return <Analytics beforeSend={withoutQuery} />;
}
