import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/index";
import { Hero } from "@/app/components/hero";
import { ServicesSection } from "@/app/components/services";
import { PortfolioSection } from "@/app/components/portfolio";
import { TestimonialsSection } from "@/app/components/testimonials";
import { ContactSection } from "@/app/components/contact";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Hero dictionary={dict.hero} />
      <ServicesSection dictionary={dict} locale={lang as Locale} />
      <PortfolioSection dictionary={dict} locale={lang as Locale} />
      <TestimonialsSection dictionary={dict} locale={lang as Locale} />
      <ContactSection dictionary={dict.contact} />
    </>
  );
}
