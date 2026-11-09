import { routing } from "@/i18n/routing";

// Each language is named in itself, so visitors find theirs in either version of the site.
const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  "pt-BR": "Português",
};

export interface ResumeDownloadOption {
  href: string;
  /** Full visible text, such as "Baixar em Português". */
  label: string;
  lang: string;
}

export function getResumeHref(locale: string, preview = false) {
  return `/api/resume/${locale}${preview ? "?preview=1" : ""}`;
}

/** One download per locale; `label` receives the language name. */
export function getResumeDownloadOptions(
  label: (language: string) => string
): ResumeDownloadOption[] {
  return routing.locales.map((locale) => ({
    href: getResumeHref(locale),
    label: label(LANGUAGE_NAMES[locale]),
    lang: locale,
  }));
}
