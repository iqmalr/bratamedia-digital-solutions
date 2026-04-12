"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/app/admin/components/image-upload";
import {
  createPortfolioItem,
  updatePortfolioItem,
  type AdminPortfolioItem,
} from "@/lib/actions/admin/portfolio";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ActionResult =
  | { success: true; id: string }
  | { success: false; error: string; fieldErrors?: Record<string, string> }
  | null;

interface PortfolioFormProps {
  initialData?: AdminPortfolioItem;
}

// ---------------------------------------------------------------------------
// Input styling helpers
// ---------------------------------------------------------------------------

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors";

const labelClass = "block text-sm font-medium text-foreground mb-1.5";

const errorClass = "mt-1 text-xs text-destructive";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PortfolioForm({ initialData }: PortfolioFormProps) {
  const router = useRouter();
  const isEditMode = initialData !== undefined;

  const [imageUrl, setImageUrl] = useState<string | null>(
    initialData?.image_url ?? null
  );

  async function formAction(
    _prevState: ActionResult,
    formData: FormData
  ): Promise<ActionResult> {
    if (isEditMode && initialData) {
      return updatePortfolioItem(initialData.id, formData);
    }
    return createPortfolioItem(formData);
  }

  const [state, dispatch, isPending] = useActionState(formAction, null);

  // Redirect to list on success
  useEffect(() => {
    if (state?.success) {
      router.push("/admin/portfolio");
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

      {/* Title card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Title
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Indonesian Title */}
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
              <p id="title_id-error" className={errorClass}>
                {fieldErrors.title_id}
              </p>
            )}
          </div>

          {/* English Title */}
          <div>
            <label htmlFor="title_en" className={labelClass}>
              English Title <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <input
              id="title_en"
              name="title_en"
              type="text"
              required
              defaultValue={initialData?.title_en ?? ""}
              aria-describedby={fieldErrors?.title_en ? "title_en-error" : undefined}
              aria-invalid={!!fieldErrors?.title_en}
              className={inputClass}
            />
            {fieldErrors?.title_en && (
              <p id="title_en-error" className={errorClass}>
                {fieldErrors.title_en}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Description card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Description
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Indonesian Description */}
          <div>
            <label htmlFor="description_id" className={labelClass}>
              Indonesian Description <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <textarea
              id="description_id"
              name="description_id"
              rows={4}
              required
              defaultValue={initialData?.description_id ?? ""}
              aria-describedby={fieldErrors?.description_id ? "description_id-error" : undefined}
              aria-invalid={!!fieldErrors?.description_id}
              className={inputClass}
            />
            {fieldErrors?.description_id && (
              <p id="description_id-error" className={errorClass}>
                {fieldErrors.description_id}
              </p>
            )}
          </div>

          {/* English Description */}
          <div>
            <label htmlFor="description_en" className={labelClass}>
              English Description <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <textarea
              id="description_en"
              name="description_en"
              rows={4}
              required
              defaultValue={initialData?.description_en ?? ""}
              aria-describedby={fieldErrors?.description_en ? "description_en-error" : undefined}
              aria-invalid={!!fieldErrors?.description_en}
              className={inputClass}
            />
            {fieldErrors?.description_en && (
              <p id="description_en-error" className={errorClass}>
                {fieldErrors.description_en}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Details card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Details
        </h2>

        {/* Image Upload */}
        <div>
          <ImageUpload
            bucket="portfolio-images"
            currentUrl={imageUrl}
            onUploadComplete={setImageUrl}
            onRemove={() => setImageUrl(null)}
          />
          {/* Hidden input carries the resolved URL into the form submission */}
          <input type="hidden" name="image_url" value={imageUrl ?? ""} />
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
            defaultValue={initialData?.tags.join(", ") ?? ""}
            aria-describedby="tags-hint"
            className={inputClass}
          />
          <p id="tags-hint" className="mt-1 text-xs text-muted-foreground">
            Comma-separated, e.g. Next.js, React, Tailwind CSS
          </p>
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
            aria-describedby="category-hint"
            className={inputClass}
          />
          <p id="category-hint" className="mt-1 text-xs text-muted-foreground">
            e.g. E-Commerce, Healthcare, Mobile App
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
            <p id="sort_order-error" className={errorClass}>
              {fieldErrors.sort_order}
            </p>
          )}
        </div>

        {/* Active toggle */}
        <div className="flex items-center gap-3">
          <input
            id="is_active"
            name="is_active"
            type="checkbox"
            defaultChecked={initialData?.is_active ?? true}
            className="h-4 w-4 rounded border-border accent-brand focus:ring-2 focus:ring-brand/50 cursor-pointer"
          />
          <label
            htmlFor="is_active"
            className="text-sm font-medium text-foreground cursor-pointer select-none"
          >
            Active
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
            : "Create Portfolio Item"}
        </Button>
      </div>
    </form>
  );
}
