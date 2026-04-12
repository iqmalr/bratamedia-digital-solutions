"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  createService,
  updateService,
  type AdminService,
} from "@/lib/actions/admin/services";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ActionResult =
  | { success: true; id: string }
  | { success: false; error: string; fieldErrors?: Record<string, string> }
  | null;

interface ServiceFormProps {
  initialData?: AdminService;
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

export function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const isEditMode = initialData !== undefined;

  async function formAction(
    _prevState: ActionResult,
    formData: FormData
  ): Promise<ActionResult> {
    if (isEditMode && initialData) {
      return updateService(initialData.id, formData);
    }
    return createService(formData);
  }

  const [state, dispatch, isPending] = useActionState(formAction, null);

  // Redirect to list on success
  useEffect(() => {
    if (state?.success) {
      router.push("/admin/services");
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

      {/* Bilingual name fields */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Service Name
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Indonesian Name */}
          <div>
            <label htmlFor="name_id" className={labelClass}>
              Indonesian Name <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <input
              id="name_id"
              name="name_id"
              type="text"
              required
              defaultValue={initialData?.name_id ?? ""}
              aria-describedby={fieldErrors?.name_id ? "name_id-error" : undefined}
              aria-invalid={!!fieldErrors?.name_id}
              className={inputClass}
            />
            {fieldErrors?.name_id && (
              <p id="name_id-error" className={errorClass}>
                {fieldErrors.name_id}
              </p>
            )}
          </div>

          {/* English Name */}
          <div>
            <label htmlFor="name_en" className={labelClass}>
              English Name <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <input
              id="name_en"
              name="name_en"
              type="text"
              required
              defaultValue={initialData?.name_en ?? ""}
              aria-describedby={fieldErrors?.name_en ? "name_en-error" : undefined}
              aria-invalid={!!fieldErrors?.name_en}
              className={inputClass}
            />
            {fieldErrors?.name_en && (
              <p id="name_en-error" className={errorClass}>
                {fieldErrors.name_en}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bilingual description fields */}
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

      {/* Metadata fields */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Settings
        </h2>

        {/* Icon */}
        <div>
          <label htmlFor="icon" className={labelClass}>
            Icon
          </label>
          <input
            id="icon"
            name="icon"
            type="text"
            defaultValue={initialData?.icon ?? ""}
            aria-describedby="icon-hint"
            className={inputClass}
          />
          <p id="icon-hint" className="mt-1 text-xs text-muted-foreground">
            Lucide icon name (e.g. globe, smartphone, palette)
          </p>
        </div>

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
            : "Create Service"}
        </Button>
      </div>
    </form>
  );
}
