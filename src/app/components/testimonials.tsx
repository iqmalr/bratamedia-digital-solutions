import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import type { LocalizedTestimonial } from "@/lib/actions/testimonials";
import { getMockTestimonials } from "@/content/mock-data";
import { SectionWrapper } from "@/app/components/ui/section-wrapper";
import { SectionHeading } from "@/app/components/ui/section-heading";

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
    <article className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-7">
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
        {/* Avatar — initials placeholder */}
        <div
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground text-sm font-semibold select-none"
        >
          {initials}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">
            {testimonial.client_name}
          </span>
          {byline && (
            <span className="text-sm text-muted-foreground">{byline}</span>
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
  locale: Locale;
}

/**
 * TestimonialsSection — displays a 2×2 grid of client testimonials.
 *
 * Server Component: fetches mock data synchronously, no client-side state needed.
 * Animations are added in a separate task via Framer Motion.
 *
 * Uses "default" background to alternate visually with the preceding
 * ServicesSection (muted) and PortfolioSection (default).
 */
export function TestimonialsSection({
  dictionary,
  locale,
}: TestimonialsSectionProps) {
  const testimonials = getMockTestimonials(locale);
  const { title, subtitle } = dictionary.testimonials;

  return (
    <SectionWrapper id="testimonials" background="muted">
      <SectionHeading title={title} subtitle={subtitle} />

      {/* Testimonials grid — 1 col mobile / 2 col tablet and desktop */}
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        {testimonials.map((testimonial) => (
          <li key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
