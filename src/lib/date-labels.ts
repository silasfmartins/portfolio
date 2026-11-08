import { differenceInMonths, differenceInYears, type Locale } from "date-fns";
import { enUS, es, ptBR } from "date-fns/locale";

interface DateWords {
  and: string;
  dateLocale: Locale;
  month: string;
  months: string;
  present: string;
  year: string;
  years: string;
}

const DATE_WORDS: Record<string, DateWords> = {
  en: {
    and: "and",
    dateLocale: enUS,
    month: "month",
    months: "months",
    present: "present",
    year: "year",
    years: "years",
  },
  es: {
    and: "y",
    dateLocale: es,
    month: "mes",
    months: "meses",
    present: "la actualidad",
    year: "año",
    years: "años",
  },
  "pt-BR": {
    and: "e",
    dateLocale: ptBR,
    month: "mês",
    months: "meses",
    present: "o momento",
    year: "ano",
    years: "anos",
  },
};

function getWords(locale: string) {
  return DATE_WORDS[locale] ?? DATE_WORDS.en;
}

export function getDateLocale(locale: string) {
  return getWords(locale).dateLocale;
}

export function getPresentLabel(locale: string) {
  return getWords(locale).present;
}

/** "2 anos e 3 meses", "1 year", "5 meses". */
export function getDurationLabel(
  locale: string,
  startDate: Date,
  endDate: Date
) {
  const words = getWords(locale);
  const totalMonths = differenceInMonths(endDate, startDate);
  const years = differenceInYears(endDate, startDate);
  const months = years > 0 ? totalMonths % 12 : totalMonths;
  const yearsLabel = `${years} ${years > 1 ? words.years : words.year}`;
  const monthsLabel = `${months} ${months > 1 ? words.months : words.month}`;

  if (years === 0) {
    return monthsLabel;
  }

  return months > 0 ? `${yearsLabel} ${words.and} ${monthsLabel}` : yearsLabel;
}
