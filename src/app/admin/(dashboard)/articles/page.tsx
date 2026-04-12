import Link from "next/link";
import { FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllArticles } from "@/lib/actions/admin/articles";
import { TogglePublishedButton } from "@/app/admin/(dashboard)/articles/toggle-published-button";
import { DeleteArticleButton } from "@/app/admin/(dashboard)/articles/delete-article-button";

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Articles</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {articles.length} article{articles.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className={cn(buttonVariants({ variant: "brand", size: "sm" }))}
        >
          Add Article
        </Link>
      </div>

      {/* Table or empty state */}
      {articles.length === 0 ? (
        <div className="rounded-xl border border-border bg-card flex flex-col items-center justify-center py-20 text-center">
          <FileText
            className="h-10 w-10 text-muted-foreground/40 mb-3"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-muted-foreground">No articles yet</p>
          <p className="mt-1 text-sm text-muted-foreground/70">
            <Link
              href="/admin/articles/new"
              className="text-brand hover:text-brand-dark underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
            >
              Write your first article
            </Link>
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Title (EN)
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell"
                >
                  Published Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className={
                    "border-t border-border hover:bg-muted/20 transition-colors " +
                    (!article.is_published ? "opacity-70" : "")
                  }
                >
                  {/* Title EN */}
                  <td className="px-4 py-3 font-medium text-foreground max-w-xs truncate">
                    {article.title_en}
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    {article.category ? (
                      <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs">
                        {article.category}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/50 text-xs italic">—</span>
                    )}
                  </td>

                  {/* Status toggle */}
                  <td className="px-4 py-3">
                    <TogglePublishedButton
                      articleId={article.id}
                      isPublished={article.is_published}
                    />
                  </td>

                  {/* Published date */}
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell tabular-nums text-xs">
                    {article.published_at
                      ? new Date(article.published_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : <span className="italic">Not published</span>}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="text-sm font-medium text-brand hover:text-brand-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                      >
                        Edit
                      </Link>
                      <DeleteArticleButton
                        articleId={article.id}
                        articleTitle={article.title_en}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
