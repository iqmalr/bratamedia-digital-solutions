/**
 * Shared locale configuration — safe to import from both Server Components,
 * Client Components, and the proxy (Edge runtime).
 *
 * Do NOT import "server-only" here; this file is intentionally isomorphic.
 */

export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "id";

/**
 * Map of locale codes to their human-readable labels.
 */
export const localeLabels: Record<Locale, string> = {
  id: "Indonesia",
  en: "English",
};

/**
 * Type guard: narrows a plain string to a supported Locale.
 */
export function hasLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}
