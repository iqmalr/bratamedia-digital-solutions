export const revalidate = 3600;

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Link as TiptapLink } from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import { hasLocale, type Locale } from "@/i18n/index";
import { getArticleBySlug } from "@/lib/actions/articles";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Converts a Tiptap JSON document to an HTML string.
 * Returns an empty string when content is null or generation fails.
 */
function renderContent(content: Record<string, unknown> | null): string {
  if (!content) return "";
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return generateHTML(content as any, [StarterKit, TiptapLink, TiptapImage]);
  } catch {
    return "";
  }
}

/**
 * Formats an ISO date string to a human-readable date.
 * Falls back to the raw string if parsing fails.
 */
function formatDate(iso: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await props.params;

  if (!hasLocale(lang)) return {};

  const result = await getArticleBySlug(slug, lang as Locale);
  if (!result.success) return {};

  const article = result.data;

  return {
    title: article.title,
    description: article.excerpt ?? undefined,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      type: "article",
      publishedTime: article.published_at ?? undefined,
      authors: [article.author_name],
      images: article.cover_image_url ? [article.cover_image_url] : undefined,
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ArticleDetailPage(props: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await props.params;

  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const result = await getArticleBySlug(slug, locale);

  if (!result.success) notFound();

  const article = result.data;
  const contentHtml = renderContent(article.content);
  const backHref = `/${lang}/blog`;

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        {/* Back link */}
        <Link
          href={backHref}
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
          aria-label={locale === "id" ? "Kembali ke Blog" : "Back to Blog"}
        >
          <span aria-hidden="true">&larr;</span>
          <span>{locale === "id" ? "Kembali ke Blog" : "Back to Blog"}</span>
        </Link>

        {/* Cover image */}
        {article.cover_image_url && (
          <div className="mb-8 overflow-hidden rounded-xl">
            <Image
              src={article.cover_image_url}
              alt={article.title}
              width={900}
              height={400}
              className="h-auto max-h-[400px] w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Metadata row */}
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          {article.category && (
            <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              {article.category}
            </span>
          )}
          {article.published_at && (
            <time dateTime={article.published_at}>
              {formatDate(article.published_at, lang)}
            </time>
          )}
          <span>&middot;</span>
          <span>{article.author_name}</span>
        </div>

        {/* Title */}
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {article.title}
        </h1>

        {/* Article body */}
        {contentHtml ? (
          <div
            className="article-content [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-brand-dark [&_blockquote]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-brand/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h4]:mb-2 [&_h4]:mt-4 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground [&_hr]:my-8 [&_hr]:border-border [&_img]:max-w-full [&_img]:rounded-lg [&_li]:mb-1 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-foreground/80 [&_pre]:mb-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-4 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        ) : (
          article.excerpt && (
            <p className="text-base leading-relaxed text-foreground/80">
              {article.excerpt}
            </p>
          )
        )}

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-8">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom back link */}
        <div className="mt-10">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
          >
            <span aria-hidden="true">&larr;</span>
            <span>{locale === "id" ? "Kembali ke Blog" : "Back to Blog"}</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
