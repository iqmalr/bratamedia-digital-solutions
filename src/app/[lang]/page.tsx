import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/index";

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
      <section id="hero" aria-label={dict.hero.headline} className="px-4 py-24 sm:px-6 lg:px-8">
        <h1>{dict.hero.headline}</h1>
        <p>{dict.hero.subheadline}</p>
      </section>
    </>
  );
}
