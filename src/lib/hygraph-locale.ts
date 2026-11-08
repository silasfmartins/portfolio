// The CMS has no Spanish content yet: `es` reads the English entries.
const HYGRAPH_LOCALES: Record<string, string> = {
  en: "en",
  es: "en",
  "pt-BR": "pt_BR",
};

export function toHygraphLocale(locale: string): string {
  return HYGRAPH_LOCALES[locale] ?? "en";
}
