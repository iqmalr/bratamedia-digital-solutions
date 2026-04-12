"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleArticlePublished } from "@/lib/actions/admin/articles";
import { cn } from "@/lib/utils";

interface TogglePublishedButtonProps {
  articleId: string;
  isPublished: boolean;
}

export function TogglePublishedButton({ articleId, isPublished }: TogglePublishedButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleToggle() {
    startTransition(async () => {
      await toggleArticlePublished(articleId, !isPublished);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      aria-label={isPublished ? "Unpublish article" : "Publish article"}
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium transition-colors",
        isPublished
          ? "bg-green-100 text-green-700 hover:bg-green-200"
          : "bg-amber-100 text-amber-700 hover:bg-amber-200",
        isPending && "opacity-50 cursor-not-allowed"
      )}
    >
      {isPublished ? "Published" : "Draft"}
    </button>
  );
}
