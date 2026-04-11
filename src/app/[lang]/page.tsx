import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/index";
import { Hero } from "@/app/components/hero";
import { ServicesSection } from "@/app/components/services";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      {/*
       * Landing page sections will be implemented as separate components.
       * Each section receives the relevant slice of the dictionary as a prop.
       * Placeholder content is rendered here until components are built.
       *
       * The <main> wrapper lives in [lang]/layout.tsx.
       */}
      <Hero dictionary={dict.hero} />

      <ServicesSection dictionary={dict} locale={lang as Locale} />
    </>
  );
}
