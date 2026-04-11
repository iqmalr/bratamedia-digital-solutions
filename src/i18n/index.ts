import "server-only";

import type { Dictionary } from "@/i18n/types";

/**
 * Supported locales for the application.
 * Indonesian (id) is the default locale.
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
 * Lazy-loaded dictionary map. Each locale is imported on demand to
 * keep the server bundle lean — only the requested locale is loaded.
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  id: () => import("@/i18n/dictionaries/id").then((m) => m.default),
  en: () => import("@/i18n/dictionaries/en").then((m) => m.default),
};

/**
 * Type guard: narrows a plain string to a supported Locale.
 * Returns true when the value is a valid locale key.
 */
export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Load the translation dictionary for the given locale.
 * Falls back to the default locale when an unsupported locale is passed.
 *
 * This function is server-only (`import "server-only"` guard above).
 * Use it inside Server Components, layouts, and pages.
 *
 * @example
 * const dict = await getDictionary("id");
 * return <h1>{dict.hero.headline}</h1>;
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
