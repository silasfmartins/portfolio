const HYGRAPH_LOCALES: Record<string, string> = {
  en: "en",
  "pt-BR": "pt_BR",
};

export function toHygraphLocale(locale: string): string {
  return HYGRAPH_LOCALES[locale] ?? "en";
}
