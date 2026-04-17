import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { createStaticClient } from "@/lib/supabase/static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Static routes
  const routes: MetadataRoute.Sitemap = [
    // Root redirect
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Locale landing pages
    ...locales.map((locale) => ({
      url: `${siteUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    })),
    // Blog listing pages
    ...locales.map((locale) => ({
      url: `${siteUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];

  // Dynamic routes — published blog articles
  try {
    const supabase = createStaticClient();
    const { data } = await supabase
      .from("articles")
      .select("slug, published_at, updated_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (data) {
      for (const article of data) {
        const lastMod = article.updated_at || article.published_at || new Date().toISOString();
        for (const locale of locales) {
          routes.push({
            url: `${siteUrl}/${locale}/blog/${article.slug}`,
            lastModified: new Date(lastMod),
            changeFrequency: "monthly",
            priority: 0.7,
          });
        }
      }
    }
  } catch (error) {
    console.error("[sitemap] Failed to fetch articles:", error);
  }

  return routes;
}
