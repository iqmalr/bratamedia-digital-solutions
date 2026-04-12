"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteService } from "@/lib/actions/admin/services";

interface DeleteServiceButtonProps {
  serviceId: string;
  serviceName: string;
}

export function DeleteServiceButton({ serviceId, serviceName }: DeleteServiceButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${serviceName}"? This action cannot be undone.`)) {
      return;
    }

    startTransition(async () => {
      const result = await deleteService(serviceId);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error ?? "Failed to delete service.");
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
