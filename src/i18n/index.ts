import "server-only";

import { type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

// Re-export shared config so server-side callers can import everything from
// "@/i18n/index" without knowing about the internal split.
export {
  locales,
  defaultLocale,
  localeLabels,
  hasLocale,
  type Locale,
} from "@/i18n/config";

/**
 * Lazy-loaded dictionary map. Each locale is imported on demand to
 * keep the server bundle lean — only the requested locale is loaded.
 *
 * This is server-only (`import "server-only"` guard above).
 * Use it inside Server Components, layouts, and pages — never in Client
 * Components or the proxy.
 *
 * @example
 * const dict = await getDictionary("id");
 * return <h1>{dict.hero.headline}</h1>;
 */
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  id: () => import("@/i18n/dictionaries/id").then((m) => m.default),
  en: () => import("@/i18n/dictionaries/en").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
