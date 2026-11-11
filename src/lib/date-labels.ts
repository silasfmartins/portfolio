import { differenceInMonths, differenceInYears, type Locale } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";

interface DateWords {
  age: (years: number) => string;
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
    age: (years) => `${years} years old`,
    and: "and",
    dateLocale: enUS,
    month: "month",
    months: "months",
    present: "present",
    year: "year",
    years: "years",
  },
  "pt-BR": {
    age: (years) => `${years} anos`,
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

/** "22 anos", "22 years old": always the current age, so the resume never goes stale. */
export function getAgeLabel(
  locale: string,
  birthDate: string,
  today = new Date()
) {
  return getWords(locale).age(
    differenceInYears(today, new Date(`${birthDate}T12:00:00`))
  );
}
