"use client";

import type { Dictionary } from "@/i18n/types";
import type { LocalizedTestimonial } from "@/lib/actions/testimonials";
import { SectionWrapper } from "@/app/components/ui/section-wrapper";
import { SectionHeading } from "@/app/components/ui/section-heading";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/app/components/ui/motion";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extracts initials from a display name.
 * "Budi Santoso"     → "BS"
 * "dr. Ratna Kusuma" → "RK"  (skips honorific prefixes ending with ".")
 * "Sari"             → "S"
 */
function getInitials(name: string): string {
  const parts = name
    .split(/\s+/)
    .filter((part) => part.length > 0 && !part.endsWith("."));

  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

  return (
    parts[0].charAt(0).toUpperCase() +
    parts[parts.length - 1].charAt(0).toUpperCase()
  );
}

/**
 * Formats the client role and company into a single readable string.
 * "CEO" + "Nusantara Retail Group" → "CEO, Nusantara Retail Group"
 */
function formatByline(
  role: string | null,
  company: string | null
): string | null {
  if (!role && !company) return null;
  if (!company) return role;
  if (!role) return company;
  return `${role}, ${company}`;
}

// ---------------------------------------------------------------------------
// TestimonialCard — isolated card for a single testimonial
// ---------------------------------------------------------------------------

interface TestimonialCardProps {
  testimonial: LocalizedTestimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = getInitials(testimonial.client_name);
  const byline = formatByline(
    testimonial.client_role,
    testimonial.client_company
  );

  return (
    <article className="flex h-full flex-col gap-5 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-7">
      {/* Decorative opening quotation mark */}
      <span
        aria-hidden="true"
        className="text-5xl font-serif leading-none text-brand/25 select-none"
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <blockquote className="flex-1 text-base leading-relaxed text-foreground/90">
        {testimonial.quote}
      </blockquote>

      {/* Divider */}
      <hr className="border-border" />

      {/* Client attribution */}
      <footer className="flex items-center gap-4">
        {/* Avatar — real photo or initials fallback */}
        {testimonial.avatar_url ? (
          <img
            src={testimonial.avatar_url}
            alt={testimonial.client_name}
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground text-sm font-semibold select-none"
          >
            {initials}
          </div>
        )}

        <div className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold text-foreground">
            {testimonial.client_name}
          </span>
          {byline && (
            <span className="text-sm text-muted-foreground break-words">{byline}</span>
          )}
        </div>
      </footer>
    </article>
  );
}

// ---------------------------------------------------------------------------
// TestimonialsSection — Server Component
// ---------------------------------------------------------------------------

interface TestimonialsSectionProps {
  dictionary: Dictionary;
  testimonials: LocalizedTestimonial[];
}

export function TestimonialsSection({
  dictionary,
  testimonials,
}: TestimonialsSectionProps) {
  const { title, subtitle } = dictionary.testimonials;

  return (
    <SectionWrapper id="testimonials" background="muted" aria-labelledby="testimonials-heading">
      <FadeInUp>
        <SectionHeading title={title} subtitle={subtitle} headingId="testimonials-heading" />
      </FadeInUp>

      {/* Testimonials grid — 1 col mobile / 2 col tablet and desktop */}
      <StaggerContainer
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.id} role="listitem" className="h-full">
            <TestimonialCard testimonial={testimonial} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  );
}
