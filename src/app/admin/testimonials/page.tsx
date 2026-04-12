import Link from "next/link";
import { MessageSquareQuote } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllTestimonials } from "@/lib/actions/admin/testimonials";
import { ToggleActiveButton } from "@/app/admin/testimonials/toggle-active-button";
import { DeleteTestimonialButton } from "@/app/admin/testimonials/delete-testimonial-button";

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Testimonials</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className={cn(buttonVariants({ variant: "brand", size: "sm" }))}
        >
          Add Testimonial
        </Link>
      </div>

      {/* Table or empty state */}
      {testimonials.length === 0 ? (
        <div className="rounded-xl border border-border bg-card flex flex-col items-center justify-center py-20 text-center">
          <MessageSquareQuote
            className="h-10 w-10 text-muted-foreground/40 mb-3"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-muted-foreground">
            No testimonials yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground/70">
            <Link
              href="/admin/testimonials/new"
              className="text-brand hover:text-brand-dark underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
            >
              Add your first testimonial
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
                  Client Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell"
                >
                  Quote (EN)
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
              {testimonials.map((testimonial) => (
                <tr
                  key={testimonial.id}
                  className={
                    "border-t border-border hover:bg-muted/20 transition-colors " +
                    (!testimonial.is_active ? "opacity-60" : "")
                  }
                >
                  {/* Sort order */}
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">
                    {testimonial.sort_order}
                  </td>

                  {/* Client Name */}
                  <td className="px-4 py-3 font-medium text-foreground">
                    {testimonial.client_name}
                  </td>

                  {/* Company */}
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    {testimonial.client_company ?? (
                      <span className="text-muted-foreground/50 text-xs italic">—</span>
                    )}
                  </td>

                  {/* Quote preview EN */}
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell max-w-xs">
                    <span className="truncate block" title={testimonial.quote_en}>
                      {testimonial.quote_en.length > 60
                        ? testimonial.quote_en.slice(0, 60) + "…"
                        : testimonial.quote_en}
                    </span>
                  </td>

                  {/* Status toggle */}
                  <td className="px-4 py-3">
                    <ToggleActiveButton
                      testimonialId={testimonial.id}
                      isActive={testimonial.is_active}
                    />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/testimonials/${testimonial.id}/edit`}
                        className="text-sm font-medium text-brand hover:text-brand-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                      >
                        Edit
                      </Link>
                      <DeleteTestimonialButton
                        testimonialId={testimonial.id}
                        clientName={testimonial.client_name}
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
