export const revalidate = 3600 // Revalidate every hour

import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/i18n/index";
import { getServices } from "@/lib/actions/services";
import { getPortfolioItems } from "@/lib/actions/portfolio";
import { getTestimonials } from "@/lib/actions/testimonials";
import { Hero } from "@/app/components/hero";
import { ServicesSection } from "@/app/components/services";
import { PortfolioSection } from "@/app/components/portfolio";
import { TestimonialsSection } from "@/app/components/testimonials";
import { ContactSection } from "@/app/components/contact";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;

  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;

  const [dict, servicesResult, portfolioResult, testimonialsResult] =
    await Promise.all([
      getDictionary(locale),
      getServices(locale),
      getPortfolioItems(locale),
      getTestimonials(locale),
    ]);

  const services = servicesResult.success ? servicesResult.data : [];
  const portfolio = portfolioResult.success ? portfolioResult.data : [];
  const testimonials = testimonialsResult.success ? testimonialsResult.data : [];

  return (
    <>
      <Hero dictionary={dict.hero} />
      <ServicesSection dictionary={dict} services={services} />
      <PortfolioSection dictionary={dict} items={portfolio} />
      <TestimonialsSection dictionary={dict} testimonials={testimonials} />
      <ContactSection dictionary={dict.contact} />
    </>
  );
}
