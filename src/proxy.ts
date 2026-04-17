import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, hasLocale } from "@/i18n/config";

/**
 * Detect the best matching locale from the Accept-Language header.
 * Falls back to the defaultLocale when no supported locale is found.
 */
function detectLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";

  // Parse locale tags in priority order (e.g. "en-US,en;q=0.9,id;q=0.8")
  const preferred = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.trim().toLowerCase(), q: q ? parseFloat(q) : 1.0 };
    })
    .sort((a, b) => b.q - a.q)
    .map(({ tag }) => tag);

  for (const tag of preferred) {
    // Exact match first (e.g. "id", "en")
    if (hasLocale(tag)) return tag;
    // Prefix match (e.g. "en-US" -> "en")
    const base = tag.split("-")[0];
    if (hasLocale(base)) return base;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes are not locale-prefixed — handle them separately.
  if (pathname.startsWith("/admin")) {
    // The login page itself is always accessible without an auth check.
    if (pathname === "/admin/login") return;

    // First-pass guard: check for a Supabase auth cookie.
    // The SSR client stores auth in cookies named "sb-<project-ref>-auth-token*".
    // This is a presence-only check — actual admin role verification happens
    // server-side in the admin layout via requireAdmin().
    const hasAuthCookie = request.cookies
      .getAll()
      .some(
        (cookie) =>
          cookie.name.startsWith("sb-") &&
          cookie.name.includes("-auth-token"),
      );

    if (!hasAuthCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Auth cookie present — allow the request through.
    return;
  }

  // Check whether the pathname already starts with a supported locale segment.
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Detect and redirect to the appropriate locale prefix.
  const locale = detectLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static  (static assets)
     * - _next/image   (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt  (metadata files)
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api|googlee8d172a19cbe1893.html).*)",
  ],
};
