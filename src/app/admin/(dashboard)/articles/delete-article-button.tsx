"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteArticle } from "@/lib/actions/admin/articles";

interface DeleteArticleButtonProps {
  articleId: string;
  articleTitle: string;
}

export function DeleteArticleButton({ articleId, articleTitle }: DeleteArticleButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (
      !confirm(
        `Are you sure you want to delete "${articleTitle}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await deleteArticle(articleId);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error ?? "Failed to delete article.");
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
