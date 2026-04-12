import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getServiceById } from "@/lib/actions/admin/services";
import { ServiceForm } from "@/app/admin/services/service-form";

// Next.js 16: params is a Promise — must be awaited
export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm mb-3"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to Services
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">Edit Service</h1>
      </div>

      <ServiceForm initialData={service} />
    </div>
  );
}
