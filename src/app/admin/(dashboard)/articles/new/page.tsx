import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ArticleForm } from "@/app/admin/(dashboard)/articles/article-form";

export default function NewArticlePage() {
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
        <h1 className="text-2xl font-semibold text-foreground">New Article</h1>
      </div>

      <ArticleForm />
    </div>
  );
}
