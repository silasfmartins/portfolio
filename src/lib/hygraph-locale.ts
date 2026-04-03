export function toHygraphLocale(locale: string): string {
  if (locale === "pt-BR") {
    return "pt_BR";
  }

  return locale;
}
