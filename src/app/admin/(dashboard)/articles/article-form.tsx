"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { TiptapEditor } from "@/app/admin/(dashboard)/components/tiptap-editor";
import {
  createArticle,
  updateArticle,
  type AdminArticle,
} from "@/lib/actions/admin/articles";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ActionResult =
  | { success: true; id: string }
  | { success: false; error: string; fieldErrors?: Record<string, string> }
  | null;

interface ArticleFormProps {
  initialData?: AdminArticle;
}

// ---------------------------------------------------------------------------
// Styling helpers
// ---------------------------------------------------------------------------

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors";

const labelClass = "block text-sm font-medium text-foreground mb-1.5";

const errorClass = "mt-1 text-xs text-destructive";

// ---------------------------------------------------------------------------
// Slug helper
// ---------------------------------------------------------------------------

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ArticleForm({ initialData }: ArticleFormProps) {
  const router = useRouter();
  const isEditMode = initialData !== undefined;

  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [titleEn, setTitleEn] = useState(initialData?.title_en ?? "");
  const [contentId, setContentId] = useState<Record<string, unknown> | null>(
    initialData?.content_id ?? null
  );
  const [contentEn, setContentEn] = useState<Record<string, unknown> | null>(
    initialData?.content_en ?? null
  );

  async function formAction(
    _prevState: ActionResult,
    formData: FormData
  ): Promise<ActionResult> {
    if (isEditMode && initialData) {
      return updateArticle(initialData.id, formData);
    }
    return createArticle(formData);
  }

  const [state, dispatch, isPending] = useActionState(formAction, null);

  // Redirect to list on success
  useEffect(() => {
    if (state?.success) {
      router.push("/admin/articles");
    }
  }, [state, router]);

  const fieldErrors = state && !state.success ? state.fieldErrors : undefined;

  return (
    <form action={dispatch} className="space-y-6">
      {/* Global error */}
      {state && !state.success && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {state.error}
        </div>
      )}

      {/* Slug & Meta card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Slug &amp; Meta
        </h2>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <div className="flex gap-2">
            <input
              id="slug"
              name="slug"
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              aria-describedby={fieldErrors?.slug ? "slug-error" : "slug-hint"}
              aria-invalid={!!fieldErrors?.slug}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setSlug(generateSlug(titleEn))}
              className="shrink-0 rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
            >
              Generate
            </button>
          </div>
          {fieldErrors?.slug ? (
            <p id="slug-error" className={errorClass}>{fieldErrors.slug}</p>
          ) : (
            <p id="slug-hint" className="mt-1 text-xs text-muted-foreground">
              Lowercase letters, numbers, and hyphens only (e.g. my-article-title)
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Author name */}
          <div>
            <label htmlFor="author_name" className={labelClass}>
              Author Name
            </label>
            <input
              id="author_name"
              name="author_name"
              type="text"
              defaultValue={initialData?.author_name ?? "Bratamedia"}
              className={inputClass}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              defaultValue={initialData?.category ?? ""}
              placeholder="e.g. Engineering, Design"
              className={inputClass}
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className={labelClass}>
            Tags
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            defaultValue={initialData?.tags?.join(", ") ?? ""}
            aria-describedby="tags-hint"
            placeholder="nextjs, react, typescript"
            className={inputClass}
          />
          <p id="tags-hint" className="mt-1 text-xs text-muted-foreground">
            Comma-separated list of tags
          </p>
        </div>
      </div>

      {/* Title card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Title
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Indonesian title */}
          <div>
            <label htmlFor="title_id" className={labelClass}>
              Indonesian Title <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <input
              id="title_id"
              name="title_id"
              type="text"
              required
              defaultValue={initialData?.title_id ?? ""}
              aria-describedby={fieldErrors?.title_id ? "title_id-error" : undefined}
              aria-invalid={!!fieldErrors?.title_id}
              className={inputClass}
            />
            {fieldErrors?.title_id && (
              <p id="title_id-error" className={errorClass}>{fieldErrors.title_id}</p>
            )}
          </div>

          {/* English title */}
          <div>
            <label htmlFor="title_en" className={labelClass}>
              English Title <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <input
              id="title_en"
              name="title_en"
              type="text"
              required
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              aria-describedby={fieldErrors?.title_en ? "title_en-error" : undefined}
              aria-invalid={!!fieldErrors?.title_en}
              className={inputClass}
            />
            {fieldErrors?.title_en && (
              <p id="title_en-error" className={errorClass}>{fieldErrors.title_en}</p>
            )}
          </div>
        </div>
      </div>

      {/* Excerpt card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Excerpt
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Indonesian excerpt */}
          <div>
            <label htmlFor="excerpt_id" className={labelClass}>
              Indonesian Excerpt
            </label>
            <textarea
              id="excerpt_id"
              name="excerpt_id"
              rows={3}
              defaultValue={initialData?.excerpt_id ?? ""}
              placeholder="Short summary in Indonesian…"
              className={inputClass}
            />
          </div>

          {/* English excerpt */}
          <div>
            <label htmlFor="excerpt_en" className={labelClass}>
              English Excerpt
            </label>
            <textarea
              id="excerpt_en"
              name="excerpt_en"
              rows={3}
              defaultValue={initialData?.excerpt_en ?? ""}
              placeholder="Short summary in English…"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Content card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Content
        </h2>

        {/* Hidden inputs carry JSON to FormData */}
        <input
          type="hidden"
          name="content_id"
          value={contentId ? JSON.stringify(contentId) : ""}
        />
        <input
          type="hidden"
          name="content_en"
          value={contentEn ? JSON.stringify(contentEn) : ""}
        />

        {/* Indonesian content */}
        <div>
          <p className={labelClass} aria-hidden="true">Indonesian Content</p>
          <TiptapEditor
            content={contentId}
            onChange={setContentId}
            placeholder="Tulis konten dalam Bahasa Indonesia…"
          />
        </div>

        {/* English content */}
        <div>
          <p className={labelClass} aria-hidden="true">English Content</p>
          <TiptapEditor
            content={contentEn}
            onChange={setContentEn}
            placeholder="Write content in English…"
          />
        </div>
      </div>

      {/* Cover image card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Cover Image
        </h2>
        <div>
          <label htmlFor="cover_image_url" className={labelClass}>
            Cover Image URL
          </label>
          <input
            id="cover_image_url"
            name="cover_image_url"
            type="url"
            defaultValue={initialData?.cover_image_url ?? ""}
            placeholder="https://…"
            aria-describedby="cover-hint"
            className={inputClass}
          />
          <p id="cover-hint" className="mt-1 text-xs text-muted-foreground">
            Paste a direct image URL. File upload support will be added later.
          </p>
        </div>
      </div>

      {/* Settings card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Settings
        </h2>

        {/* Sort order */}
        <div className="max-w-xs">
          <label htmlFor="sort_order" className={labelClass}>
            Sort Order
          </label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            min={0}
            defaultValue={initialData?.sort_order ?? 0}
            aria-describedby={fieldErrors?.sort_order ? "sort_order-error" : undefined}
            aria-invalid={!!fieldErrors?.sort_order}
            className={inputClass}
          />
          {fieldErrors?.sort_order && (
            <p id="sort_order-error" className={errorClass}>{fieldErrors.sort_order}</p>
          )}
        </div>

        {/* Published */}
        <div className="flex items-center gap-3">
          <input
            id="is_published"
            name="is_published"
            type="checkbox"
            defaultChecked={initialData?.is_published ?? false}
            className="h-4 w-4 rounded border-border accent-brand focus:ring-2 focus:ring-brand/50 cursor-pointer"
          />
          <label
            htmlFor="is_published"
            className="text-sm font-medium text-foreground cursor-pointer select-none"
          >
            Published
          </label>
        </div>
      </div>

      {/* Form actions */}
      <div className="flex items-center gap-3">
        <Button type="submit" variant="brand" disabled={isPending}>
          {isPending
            ? isEditMode
              ? "Saving…"
              : "Creating…"
            : isEditMode
            ? "Save Changes"
            : "Create Article"}
        </Button>
      </div>
    </form>
  );
}
