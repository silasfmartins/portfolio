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

/** Rendered by the root layout only on Vercel (see `isOnVercel`), where the script exists. */
export function SiteAnalytics() {
  return <Analytics beforeSend={withoutQuery} />;
}
