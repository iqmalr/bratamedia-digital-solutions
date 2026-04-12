import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PortfolioForm } from "@/app/admin/(dashboard)/portfolio/portfolio-form";

export default function NewPortfolioItemPage() {
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
        <h1 className="text-2xl font-semibold text-foreground">Add Portfolio Item</h1>
      </div>

      <PortfolioForm />
    </div>
  );
}
