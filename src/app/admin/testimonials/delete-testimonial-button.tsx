"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteTestimonial } from "@/lib/actions/admin/testimonials";

interface DeleteTestimonialButtonProps {
  testimonialId: string;
  clientName: string;
}

export function DeleteTestimonialButton({ testimonialId, clientName }: DeleteTestimonialButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (!confirm(`Are you sure you want to delete the testimonial from "${clientName}"? This action cannot be undone.`)) {
      return;
    }

    startTransition(async () => {
      const result = await deleteTestimonial(testimonialId);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error ?? "Failed to delete testimonial.");
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="text-sm font-medium text-destructive hover:text-destructive/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
