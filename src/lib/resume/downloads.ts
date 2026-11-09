import { routing } from "@/i18n/routing";

// Each language is named in itself, so visitors find theirs in either version of the site.
const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  "pt-BR": "Português",
};

export interface ResumeDownloadOption {
  ariaLabel: string;
  href: string;
  label: string;
  lang: string;
}

export function getResumeHref(locale: string, preview = false) {
  return `/api/resume/${locale}${preview ? "?preview=1" : ""}`;
}

/** One download per locale; `ariaLabel` receives the language name. */
export function getResumeDownloadOptions(
  ariaLabel: (language: string) => string
): ResumeDownloadOption[] {
  return routing.locales.map((locale) => ({
    ariaLabel: ariaLabel(LANGUAGE_NAMES[locale]),
    href: getResumeHref(locale),
    label: LANGUAGE_NAMES[locale],
    lang: locale,
  }));
}
