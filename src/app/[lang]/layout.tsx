import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales, type Locale } from "@/i18n/index";
import { LocaleProvider } from "@/i18n/locale-context";
import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";

// Pre-render a static page for each supported locale at build time.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Generate locale-aware metadata for the page.
export async function generateMetadata(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;

  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    title: {
      default: dict.seo.title,
      template: `%s | Bratamedia`,
    },
    description: dict.seo.description,
    applicationName: "Bratamedia Digital Solutions",
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        id: `${siteUrl}/id`,
        en: `${siteUrl}/en`,
      },
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}/${lang}`,
      siteName: "Bratamedia Digital Solutions",
      title: dict.seo.ogTitle,
      description: dict.seo.ogDescription,
      locale: lang === "id" ? "id_ID" : "en_US",
      alternateLocale: lang === "id" ? "en_US" : "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.ogTitle,
      description: dict.seo.ogDescription,
    },
    other: {
      "theme-color": "#f97316", // orange-500 — Bratamedia primary color
    },
  };
}

export default async function LangLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;

  // Return 404 for any unsupported locale that bypassed the proxy.
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <LocaleProvider initialLocale={lang as Locale}>
      {/*
       * Navbar and Footer are Client Components (they use useLocale) but they
       * receive dictionary data as props from this Server Component, so all
       * translation data is fetched server-side and passed down.
       */}
      <Navbar dict={dict.navbar} />
      {/*
       * pt-16 offsets the fixed Navbar height so page content starts below it.
       */}
      <div className="flex min-h-screen flex-col pt-16">
        <main className="flex-1">{props.children}</main>
        <Footer dict={dict.footer} navLinks={dict.navbar.links} />
      </div>
    </LocaleProvider>
  );
}
