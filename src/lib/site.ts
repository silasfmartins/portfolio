import { routing } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://silasmartins.vercel.app";

export const SITE_NAME = "Silas Martins";

/** `hreflang` links of a path, one per locale. */
export function getLanguageAlternates(path = "") {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, `/${locale}${path}`])
  );
}
