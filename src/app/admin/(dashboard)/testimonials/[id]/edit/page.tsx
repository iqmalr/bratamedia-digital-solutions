import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getTestimonialById } from "@/lib/actions/admin/testimonials";
import { TestimonialForm } from "@/app/admin/(dashboard)/testimonials/testimonial-form";

// Next.js 16: params is a Promise — must be awaited
export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const testimonial = await getTestimonialById(id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <Link
          href="/admin/testimonials"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm mb-3"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to Testimonials
        </Link>
        <h1 className="text-2xl font-semibold text-foreground">Edit Testimonial</h1>
      </div>

      <TestimonialForm initialData={testimonial} />
    </div>
  );
}
