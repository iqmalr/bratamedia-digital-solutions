"use client";

import {
  Globe,
  Smartphone,
  Palette,
  Megaphone,
  Cloud,
  Headphones,
} from "lucide-react";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { getMockServices } from "@/content/mock-data";
import { SectionWrapper } from "@/app/components/ui/section-wrapper";
import { SectionHeading } from "@/app/components/ui/section-heading";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/app/components/ui/motion";

// ---------------------------------------------------------------------------
// Icon map — keyed by the icon string stored in the data layer
// ---------------------------------------------------------------------------

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  smartphone: Smartphone,
  palette: Palette,
  megaphone: Megaphone,
  cloud: Cloud,
  headphones: Headphones,
};

// ---------------------------------------------------------------------------
// ServiceCard — isolated card for a single service item
// ---------------------------------------------------------------------------

interface ServiceCardProps {
  name: string;
  description: string;
  icon: string | null;
}

function ServiceCard({ name, description, icon }: ServiceCardProps) {
  const Icon = (icon !== null ? iconMap[icon] : undefined) ?? Globe;

  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md">
      {/* Icon container with orange accent background */}
      <div
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-subtle text-brand transition-colors duration-200 group-hover:bg-brand group-hover:text-brand-foreground"
      >
        <Icon className="h-6 w-6" />
      </div>

      {/* Service name */}
      <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
        {name}
      </h3>

      {/* Service description */}
      <p className="text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
    </article>
  );
}

// ---------------------------------------------------------------------------
// ServicesSection — Server Component
// ---------------------------------------------------------------------------

interface ServicesSectionProps {
  dictionary: Dictionary;
  locale: Locale;
}

/**
 * ServicesSection — displays the 3×2 grid of services on the landing page.
 *
 * Server Component: fetches mock data synchronously, no client-side state needed.
 * Animations are added in a separate task via Framer Motion.
 */
export function ServicesSection({ dictionary, locale }: ServicesSectionProps) {
  const services = getMockServices(locale);
  const { title, subtitle } = dictionary.services;

  return (
    <SectionWrapper id="services" background="muted" aria-labelledby="services-heading">
      <FadeInUp>
        <SectionHeading title={title} subtitle={subtitle} headingId="services-heading" />
      </FadeInUp>

      {/* Services grid — 1 col mobile / 2 col tablet / 3 col desktop */}
      <StaggerContainer
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service) => (
          <StaggerItem key={service.id} role="listitem">
            <ServiceCard
              name={service.name}
              description={service.description}
              icon={service.icon}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}
