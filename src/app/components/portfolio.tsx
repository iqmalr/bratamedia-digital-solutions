"use client";

import { FolderOpen, ExternalLink } from "lucide-react";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import type { LocalizedPortfolioItem } from "@/lib/actions/portfolio";
import { getMockPortfolio } from "@/content/mock-data";
import { SectionWrapper } from "@/app/components/ui/section-wrapper";
import { SectionHeading } from "@/app/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/app/components/ui/motion";

// ---------------------------------------------------------------------------
// Category color mapping — subtle visual differentiation per industry
// ---------------------------------------------------------------------------

const categoryColors: Record<string, { bg: string; text: string }> = {
  "E-Commerce": {
    bg: "bg-brand-subtle",
    text: "text-brand-dark",
  },
  Healthcare: {
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  "Mobile App": {
    bg: "bg-purple-50",
    text: "text-purple-700",
  },
  Government: {
    bg: "bg-green-50",
    text: "text-green-700",
  },
  Fintech: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  EdTech: {
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
};

// ---------------------------------------------------------------------------
// ImagePlaceholder — gradient placeholder since image_url is null
// ---------------------------------------------------------------------------

interface ImagePlaceholderProps {
  category: string | null;
  title: string;
}

function ImagePlaceholder({ category, title }: ImagePlaceholderProps) {
  // Vary the gradient hue slightly by category for visual variety
  const gradientMap: Record<string, string> = {
    "E-Commerce": "from-orange-100 to-orange-200",
    Healthcare: "from-blue-100 to-blue-200",
    "Mobile App": "from-purple-100 to-purple-200",
    Government: "from-green-100 to-green-200",
    Fintech: "from-emerald-100 to-emerald-200",
    EdTech: "from-amber-100 to-amber-200",
  };

  const gradient =
    category && gradientMap[category]
      ? gradientMap[category]
      : "from-muted to-muted-foreground/10";

  return (
    <div
      aria-hidden="true"
      className={`flex h-48 w-full items-center justify-center bg-gradient-to-br ${gradient}`}
    >
      <FolderOpen className="h-12 w-12 text-muted-foreground/50" />
      <span className="sr-only">{`Project image for ${title}`}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TagBadge — small pill for each technology tag
// ---------------------------------------------------------------------------

interface TagBadgeProps {
  tag: string;
}

function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-subtle px-2.5 py-0.5 text-xs font-medium text-brand-dark">
      {tag}
    </span>
  );
}

// ---------------------------------------------------------------------------
// CategoryBadge — subtle label showing the project industry
// ---------------------------------------------------------------------------

interface CategoryBadgeProps {
  category: string;
}

function CategoryBadge({ category }: CategoryBadgeProps) {
  const colors = categoryColors[category] ?? {
    bg: "bg-muted",
    text: "text-muted-foreground",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${colors.bg} ${colors.text}`}
    >
      {category}
    </span>
  );
}

// ---------------------------------------------------------------------------
// PortfolioCard — isolated card for a single portfolio item
// ---------------------------------------------------------------------------

interface PortfolioCardProps {
  item: LocalizedPortfolioItem;
  viewProjectLabel: string;
}

function PortfolioCard({ item, viewProjectLabel }: PortfolioCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
      {/* Image area */}
      <div className="overflow-hidden">
        <ImagePlaceholder category={item.category} title={item.title} />
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Category label */}
        {item.category && <CategoryBadge category={item.category} />}

        {/* Project title */}
        <h3 className="text-xl font-semibold leading-snug text-foreground sm:text-2xl">
          {item.title}
        </h3>

        {/* Description — clamped to 3 lines */}
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {/* Tags — pushed to bottom with mt-auto */}
        {item.tags.length > 0 && (
          <div
            aria-label="Technologies used"
            className="mt-auto flex flex-wrap gap-1.5 pt-2"
          >
            {item.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        {/* View Project link — placeholder href, will route to project detail page in a later task */}
        <a
          href="#portfolio"
          aria-label={`${viewProjectLabel}: ${item.title}`}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors duration-150 hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {viewProjectLabel}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// PortfolioSection — Server Component
// ---------------------------------------------------------------------------

interface PortfolioSectionProps {
  dictionary: Dictionary;
  locale: Locale;
}

/**
 * PortfolioSection — showcases 6 portfolio items in a responsive grid.
 *
 * Server Component: fetches mock data synchronously, no client-side state needed.
 * Uses the "default" background to alternate visually with the muted Services section.
 * Animations are added in a separate task via Framer Motion.
 *
 * @example
 * <PortfolioSection dictionary={dict} locale={lang} />
 */
export function PortfolioSection({ dictionary, locale }: PortfolioSectionProps) {
  const items = getMockPortfolio(locale);
  const { title, subtitle, viewProject, viewAll } = dictionary.portfolio;

  return (
    <SectionWrapper id="portfolio" background="default" aria-labelledby="portfolio-heading">
      <FadeInUp>
        <SectionHeading title={title} subtitle={subtitle} headingId="portfolio-heading" />
      </FadeInUp>

      {/* Portfolio grid — 1 col mobile / 2 col tablet / 3 col desktop */}
      <StaggerContainer
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <StaggerItem key={item.id} role="listitem">
            <PortfolioCard item={item} viewProjectLabel={viewProject} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* View All Projects CTA */}
      <FadeInUp delay={0.2}>
        <div className="mt-12 flex justify-center">
          {/* Non-functional placeholder — will wire up to /portfolio route in a later task */}
          <Button variant="brand-outline" size="lg" aria-label={viewAll}>
            {viewAll}
          </Button>
        </div>
      </FadeInUp>
    </SectionWrapper>
  );
}
