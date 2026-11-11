import { routing } from "@/i18n/routing";
import { RESUME_STYLES, type ResumeStyle } from "./resume-styles";

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

interface ResumeHrefOptions {
  preview?: boolean;
  style?: ResumeStyle;
}

/** `/api/resume/pt-BR`, `/api/resume/en?preview=1&style=simple`... (modern is the default). */
export function getResumeHref(
  locale: string,
  { preview = false, style = "modern" }: ResumeHrefOptions = {}
) {
  const params = new URLSearchParams();

  if (preview) {
    params.set("preview", "1");
  }
  if (style !== "modern") {
    params.set("style", style);
  }

  const query = params.toString();
  return `/api/resume/${locale}${query ? `?${query}` : ""}`;
}

/** For each style, one download per locale, labeled with the language name. */
export function getResumeDownloadGroups() {
  return RESUME_STYLES.map((style) => ({
    options: routing.locales.map(
      (locale): ResumeDownloadOption => ({
        href: getResumeHref(locale, { style }),
        label: LANGUAGE_NAMES[locale],
        lang: locale,
      })
    ),
    style,
  }));
}
