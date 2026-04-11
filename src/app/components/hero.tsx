"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SectionWrapper } from "@/app/components/ui/section-wrapper";
import { FadeInUp } from "@/app/components/ui/motion";
import type { HeroDictionary } from "@/i18n/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroProps {
  dictionary: HeroDictionary;
}

// ---------------------------------------------------------------------------
// Decorative background — purely visual, aria-hidden
// ---------------------------------------------------------------------------

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Radial orange glow — top-right quadrant */}
      <div className="absolute -top-32 -right-32 h-[640px] w-[640px] rounded-full bg-brand/10 blur-3xl" />
      {/* Softer secondary glow — bottom-left */}
      <div className="absolute -bottom-24 -left-24 h-[480px] w-[480px] rounded-full bg-brand/6 blur-3xl" />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero — Server Component
// ---------------------------------------------------------------------------

/**
 * Hero — full-viewport banner section at the top of the landing page.
 *
 * Receives the `hero` slice of the dictionary as a prop (populated by the
 * page-level Server Component). No client-side interactivity; CTA buttons
 * use plain anchor tags styled with `buttonVariants`.
 *
 * Animations are handled separately in BRATA-017.
 */
export function Hero({ dictionary }: HeroProps) {
  const { headline, subheadline, cta } = dictionary;

  return (
    <SectionWrapper
      id="hero"
      aria-labelledby="hero-heading"
      className={cn(
        // Full-viewport centering — overrides SectionWrapper's default py-* via twMerge
        "relative flex min-h-[90vh] items-center",
        // py-0 cancels default py-16 sm:py-20 lg:py-28; explicit pt/pb below take effect
        "py-0 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24",
      )}
    >
      <HeroBackground />

      {/* Content column — centered text on mobile, left-aligned on lg+ */}
      <div className="w-full text-center">
        {/* Eyebrow badge */}
        <FadeInUp delay={0}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-subtle px-4 py-1.5 max-w-full">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full bg-brand animate-pulse"
            />
            <span className="text-xs font-semibold uppercase tracking-wide sm:tracking-widest text-brand truncate">
              Bratamedia Digital Solutions
            </span>
          </div>
        </FadeInUp>

        {/* Headline — h1 inherits scale from globals.css (text-4xl → text-6xl) */}
        <FadeInUp delay={0.1}>
          <h1 id="hero-heading" className="mx-auto max-w-4xl text-balance">
            {headline}
          </h1>
        </FadeInUp>

        {/* Subheadline */}
        <FadeInUp delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            {subheadline}
          </p>
        </FadeInUp>

        {/* CTA row — stacked on mobile, inline on sm+ */}
        <FadeInUp delay={0.3}>
          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <a
              href="#contact"
              className={cn(
                buttonVariants({ variant: "brand", size: "lg" }),
                "w-full sm:w-auto min-w-0 sm:min-w-[160px] px-8 py-3 text-base h-auto min-h-[44px] justify-center",
              )}
            >
              {cta.primary}
            </a>
            <a
              href="#portfolio"
              className={cn(
                buttonVariants({ variant: "brand-outline", size: "lg" }),
                "w-full sm:w-auto min-w-0 sm:min-w-[160px] px-8 py-3 text-base h-auto min-h-[44px] justify-center",
              )}
            >
              {cta.secondary}
            </a>
          </div>
        </FadeInUp>

        {/* Scroll hint — subtle indicator pointing downward */}
        <FadeInUp delay={0.5}>
          <div className="mt-16 flex justify-center">
            <a
              href="#services"
              className={cn(
                "flex flex-col items-center gap-1.5 text-muted-foreground/50",
                "transition-colors duration-200 hover:text-brand",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm",
              )}
              aria-label="Scroll to services"
            >
              <span className="text-xs font-medium tracking-widest uppercase">
                Scroll
              </span>
              {/* Animated chevron */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="animate-bounce"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </FadeInUp>
      </div>
    </SectionWrapper>
  );
}
