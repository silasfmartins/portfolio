/**
 * Simple in-memory limit per key (the visitor IP). Each server instance keeps its own count,
 * so it slows down abuse but is not a strict global limit.
 */
const attempts = new Map<string, number[]>();

export function isRateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter(
    (time) => now - time < windowMs
  );

  if (recent.length >= limit) {
    attempts.set(key, recent);
    return true;
  }

  recent.push(now);
  attempts.set(key, recent);
  return false;
}
