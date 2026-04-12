import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getPortfolioItemById } from "@/lib/actions/admin/portfolio";
import { PortfolioForm } from "@/app/admin/(dashboard)/portfolio/portfolio-form";

// Next.js 16: params is a Promise — must be awaited
export default async function EditPortfolioItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await getPortfolioItemById(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <Link
          href="/admin/portfolio"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm mb-3"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to Portfolio
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">Edit Portfolio Item</h1>
      </div>

      <PortfolioForm initialData={item} />
    </div>
  );
}
