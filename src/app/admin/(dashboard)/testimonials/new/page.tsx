import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { TestimonialForm } from "@/app/admin/(dashboard)/testimonials/testimonial-form";

export default function NewTestimonialPage() {
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
        <h1 className="text-2xl font-semibold text-foreground">Add Testimonial</h1>
      </div>

      <TestimonialForm />
    </div>
  );
}
