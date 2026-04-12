import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllPortfolioItems } from "@/lib/actions/admin/portfolio";
import { ToggleActiveButton } from "@/app/admin/portfolio/toggle-active-button";
import { DeletePortfolioButton } from "@/app/admin/portfolio/delete-portfolio-button";

export default async function PortfolioPage() {
  const items = await getAllPortfolioItems();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Portfolio</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className={cn(buttonVariants({ variant: "brand", size: "sm" }))}
        >
          Add Portfolio Item
        </Link>
      </div>

      {/* Table or empty state */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-border bg-card flex flex-col items-center justify-center py-20 text-center">
          <LayoutGrid
            className="h-10 w-10 text-muted-foreground/40 mb-3"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-muted-foreground">
            No portfolio items yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground/70">
            <Link
              href="/admin/portfolio/new"
              className="text-brand hover:text-brand-dark underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
            >
              Add your first portfolio item
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
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-16"
                >
                  Order
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Title (ID)
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell"
                >
                  Title (EN)
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden xl:table-cell"
                >
                  Tags
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Status
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
              {items.map((item) => (
                <tr
                  key={item.id}
                  className={
                    "border-t border-border hover:bg-muted/20 transition-colors " +
                    (!item.is_active ? "opacity-60" : "")
                  }
                >
                  {/* Sort order */}
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">
                    {item.sort_order}
                  </td>

                  {/* Title ID */}
                  <td className="px-4 py-3 font-medium text-foreground max-w-[200px]">
                    <span className="block truncate" title={item.title_id}>
                      {item.title_id}
                    </span>
                  </td>

                  {/* Title EN */}
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell max-w-[200px]">
                    <span className="block truncate" title={item.title_en}>
                      {item.title_en}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {item.category ? (
                      <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                        {item.category}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/50 text-xs italic">—</span>
                    )}
                  </td>

                  {/* Tags */}
                  <td className="px-4 py-3 hidden xl:table-cell">
                    {item.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-md bg-brand/10 px-1.5 py-0.5 text-xs font-medium text-brand"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                            +{item.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground/50 text-xs italic">—</span>
                    )}
                  </td>

                  {/* Status toggle */}
                  <td className="px-4 py-3">
                    <ToggleActiveButton
                      itemId={item.id}
                      isActive={item.is_active}
                    />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/portfolio/${item.id}/edit`}
                        className="text-sm font-medium text-brand hover:text-brand-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                      >
                        Edit
                      </Link>
                      <DeletePortfolioButton
                        itemId={item.id}
                        itemTitle={item.title_en}
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
