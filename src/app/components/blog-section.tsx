import Link from "next/link";
import { FileText } from "lucide-react";
import type { Dictionary } from "@/i18n/types";
import { getPublishedArticles, type LocalizedArticle } from "@/lib/actions/articles";
import { SectionWrapper } from "@/app/components/ui/section-wrapper";
import { SectionHeading } from "@/app/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/app/components/ui/motion";

// ---------------------------------------------------------------------------
// CoverImage — real image or gradient placeholder
// ---------------------------------------------------------------------------

interface CoverImageProps {
  src: string | null;
  alt: string;
  category: string | null;
}

function CoverImage({ src, alt, category }: CoverImageProps) {
  const gradientMap: Record<string, string> = {
    Technology: "from-blue-100 to-blue-200",
    Design: "from-purple-100 to-purple-200",
    Business: "from-emerald-100 to-emerald-200",
    Tutorial: "from-amber-100 to-amber-200",
    News: "from-sky-100 to-sky-200",
  };

  const gradient =
    category && gradientMap[category]
      ? gradientMap[category]
      : "from-orange-100 to-orange-200";

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="h-48 w-full object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`flex h-48 w-full items-center justify-center bg-gradient-to-br ${gradient}`}
    >
      <FileText className="h-12 w-12 text-muted-foreground/50" aria-hidden="true" />
      <span className="sr-only">{`Cover image for ${alt}`}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CategoryBadge
// ---------------------------------------------------------------------------

interface CategoryBadgeProps {
  category: string;
}

function CategoryBadge({ category }: CategoryBadgeProps) {
  const colorMap: Record<string, { bg: string; text: string }> = {
    Technology: { bg: "bg-blue-50", text: "text-blue-700" },
    Design: { bg: "bg-purple-50", text: "text-purple-700" },
    Business: { bg: "bg-emerald-50", text: "text-emerald-700" },
    Tutorial: { bg: "bg-amber-50", text: "text-amber-700" },
    News: { bg: "bg-sky-50", text: "text-sky-700" },
  };

  const colors = colorMap[category] ?? { bg: "bg-muted", text: "text-muted-foreground" };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${colors.bg} ${colors.text}`}
    >
      {category}
    </span>
  );
}

// ---------------------------------------------------------------------------
// TagBadge
// ---------------------------------------------------------------------------

function TagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-subtle px-2.5 py-0.5 text-xs font-medium text-brand-dark">
      {tag}
    </span>
  );
}

// ---------------------------------------------------------------------------
// ArticleCard
// ---------------------------------------------------------------------------

interface ArticleCardProps {
  article: LocalizedArticle;
  lang: string;
  locale: "id" | "en";
}

function ArticleCard({ article, lang, locale }: ArticleCardProps) {
  const dateStr = article.published_at
    ? new Date(article.published_at).toLocaleDateString(
        locale === "id" ? "id-ID" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : null;

  const visibleTags = article.tags.slice(0, 3);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
      {/* Cover image */}
      <div className="overflow-hidden">
        <CoverImage
          src={article.cover_image_url}
          alt={article.title}
          category={article.category}
        />
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Category badge */}
        {article.category && <CategoryBadge category={article.category} />}

        {/* Title — linked to article detail */}
        <h3 className="text-lg font-semibold leading-snug text-foreground">
          <Link
            href={`/${lang}/blog/${article.slug}`}
            className="hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
        )}

        {/* Tags */}
        {visibleTags.length > 0 && (
          <div aria-label="Article tags" className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {visibleTags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        {/* Author + date footer */}
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="font-medium">{article.author_name}</span>
          {dateStr && (
            <time dateTime={article.published_at ?? undefined}>{dateStr}</time>
          )}
        </div>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// BlogSection — Server Component
// ---------------------------------------------------------------------------

interface BlogSectionProps {
  lang: string;
  locale: "id" | "en";
  dictionary: Dictionary;
}

/**
 * BlogSection — displays up to 3 of the most recent published articles.
 *
 * Fetches data server-side. If no articles are published, the section is
 * omitted entirely to avoid an empty state on the landing page.
 *
 * Server Component — no "use client" needed.
 */
export async function BlogSection({ lang, locale, dictionary }: BlogSectionProps) {
  const result = await getPublishedArticles(locale);
  const articles = result.success ? result.data.slice(0, 3) : [];

  // Do not render the section if there are no published articles
  if (articles.length === 0) return null;

  const { title, subtitle, viewAll } = dictionary.blog;

  return (
    <SectionWrapper id="blog" background="default" aria-labelledby="blog-section-heading">
      <FadeInUp>
        <SectionHeading
          title={title}
          subtitle={subtitle}
          headingId="blog-section-heading"
        />
      </FadeInUp>

      {/* Article grid — 1 col mobile / 3 col desktop */}
      <StaggerContainer
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {articles.map((article) => (
          <StaggerItem key={article.id} role="listitem">
            <ArticleCard article={article} lang={lang} locale={locale} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* View All Articles CTA */}
      <FadeInUp delay={0.2}>
        <div className="mt-12 flex justify-center">
          <Button variant="brand-outline" size="lg" asChild>
            <Link href={`/${lang}/blog`} aria-label={viewAll}>
              {viewAll}
            </Link>
          </Button>
        </div>
      </FadeInUp>
    </SectionWrapper>
  );
}
