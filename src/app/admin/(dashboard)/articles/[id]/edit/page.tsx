import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getArticleById } from "@/lib/actions/admin/articles";
import { ArticleForm } from "@/app/admin/(dashboard)/articles/article-form";

// Next.js 16: params is a Promise — must be awaited
export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm mb-3"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to Articles
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">Edit Article</h1>
      </div>

      <ArticleForm initialData={article} />
    </div>
  );
}
