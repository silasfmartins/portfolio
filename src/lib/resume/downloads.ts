import { routing } from "@/i18n/routing";

// Each language is named in itself, so visitors find theirs in either version of the site.
const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  "pt-BR": "Português",
};

export interface ResumeDownloadOption {
  href: string;
  /** Language name, in the language itself. */
  label: string;
  lang: string;
}

export function getResumeHref(locale: string, preview = false) {
  return `/api/resume/${locale}${preview ? "?preview=1" : ""}`;
}

/** One download per locale, labeled with the language name. */
export function getResumeDownloadOptions(): ResumeDownloadOption[] {
  return routing.locales.map((locale) => ({
    href: getResumeHref(locale),
    label: LANGUAGE_NAMES[locale],
    lang: locale,
  }));
}
