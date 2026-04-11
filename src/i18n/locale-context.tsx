"use client";

import {
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { type Locale, locales } from "@/i18n/config";

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------

interface LocaleContextValue {
  /** The currently active locale. */
  locale: Locale;
  /** Navigate to the same path under a different locale. */
  switchLocale: (next: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface LocaleProviderProps {
  children: ReactNode;
  /** The locale resolved by the server — passed down from the layout. */
  initialLocale: Locale;
}

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const switchLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;

      // Replace the current locale segment in the pathname.
      // Pathname always starts with /<locale>/... or /<locale>
      const segments = pathname.split("/");
      // segments[0] is always "" (before the leading slash)
      // segments[1] is the current locale segment
      if (locales.includes(segments[1] as Locale)) {
        segments[1] = next;
      } else {
        // Fallback: prepend the new locale (should not normally happen)
        segments.splice(1, 0, next);
      }

      const newPath = segments.join("/") || "/";
      setLocale(next);
      router.push(newPath);
    },
    [locale, pathname, router],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, switchLocale }),
    [locale, switchLocale],
  );

  return (
    <LocaleContext value={value}>
      {children}
    </LocaleContext>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access the current locale and the locale switcher inside any Client Component.
 *
 * Must be used within a component tree that is wrapped by `<LocaleProvider>`.
 *
 * @example
 * const { locale, switchLocale } = useLocale();
 * switchLocale("en");
 */
export function useLocale(): LocaleContextValue {
  const ctx = use(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within <LocaleProvider>");
  }
  return ctx;
}
