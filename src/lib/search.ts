const COMBINING_MARKS = /\p{M}/gu;
const WHITESPACE = /\s+/gu;

/** Normalizes text for search: no accents, lowercase and single spaces. */
export function normalizeSearch(text: string): string {
  return text
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .replace(WHITESPACE, " ")
    .trim();
}

/** True when every word of the query appears in the text, in any order. */
export function matchesSearch(text: string, query: string): boolean {
  const normalizedQuery = normalizeSearch(query);
  if (!normalizedQuery) {
    return true;
  }

  const haystack = normalizeSearch(text);
  return normalizedQuery.split(" ").every((word) => haystack.includes(word));
}
