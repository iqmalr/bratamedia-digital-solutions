"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleServiceActive } from "@/lib/actions/admin/services";
import { cn } from "@/lib/utils";

interface ToggleActiveButtonProps {
  serviceId: string;
  isActive: boolean;
}

export function ToggleActiveButton({ serviceId, isActive }: ToggleActiveButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleToggle() {
    startTransition(async () => {
      await toggleServiceActive(serviceId, !isActive);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      aria-label={isActive ? "Deactivate service" : "Activate service"}
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors",
        isActive
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200",
        isPending && "opacity-50 cursor-not-allowed"
      )}
    >
      {isActive ? "Active" : "Inactive"}
    </button>
  );
}
