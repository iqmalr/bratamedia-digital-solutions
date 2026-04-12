"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  createTestimonial,
  updateTestimonial,
  type AdminTestimonial,
} from "@/lib/actions/admin/testimonials";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ActionResult =
  | { success: true; id: string }
  | { success: false; error: string; fieldErrors?: Record<string, string> }
  | null;

interface TestimonialFormProps {
  initialData?: AdminTestimonial;
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

export function TestimonialForm({ initialData }: TestimonialFormProps) {
  const router = useRouter();
  const isEditMode = initialData !== undefined;

  async function formAction(
    _prevState: ActionResult,
    formData: FormData
  ): Promise<ActionResult> {
    if (isEditMode && initialData) {
      return updateTestimonial(initialData.id, formData);
    }
    return createTestimonial(formData);
  }

  const [state, dispatch, isPending] = useActionState(formAction, null);

  // Redirect to list on success
  useEffect(() => {
    if (state?.success) {
      router.push("/admin/testimonials");
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

      {/* Quote card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Quote
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Indonesian Quote */}
          <div>
            <label htmlFor="quote_id" className={labelClass}>
              Indonesian Quote <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <textarea
              id="quote_id"
              name="quote_id"
              rows={5}
              required
              defaultValue={initialData?.quote_id ?? ""}
              aria-describedby={fieldErrors?.quote_id ? "quote_id-error" : undefined}
              aria-invalid={!!fieldErrors?.quote_id}
              className={inputClass}
            />
            {fieldErrors?.quote_id && (
              <p id="quote_id-error" className={errorClass}>
                {fieldErrors.quote_id}
              </p>
            )}
          </div>

          {/* English Quote */}
          <div>
            <label htmlFor="quote_en" className={labelClass}>
              English Quote <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <textarea
              id="quote_en"
              name="quote_en"
              rows={5}
              required
              defaultValue={initialData?.quote_en ?? ""}
              aria-describedby={fieldErrors?.quote_en ? "quote_en-error" : undefined}
              aria-invalid={!!fieldErrors?.quote_en}
              className={inputClass}
            />
            {fieldErrors?.quote_en && (
              <p id="quote_en-error" className={errorClass}>
                {fieldErrors.quote_en}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Client Info card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Client Info
        </h2>

        {/* Client Name */}
        <div>
          <label htmlFor="client_name" className={labelClass}>
            Client Name <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <input
            id="client_name"
            name="client_name"
            type="text"
            required
            defaultValue={initialData?.client_name ?? ""}
            aria-describedby={fieldErrors?.client_name ? "client_name-error" : undefined}
            aria-invalid={!!fieldErrors?.client_name}
            className={inputClass}
          />
          {fieldErrors?.client_name && (
            <p id="client_name-error" className={errorClass}>
              {fieldErrors.client_name}
            </p>
          )}
        </div>

        {/* Client Role */}
        <div>
          <label htmlFor="client_role" className={labelClass}>
            Client Role
          </label>
          <input
            id="client_role"
            name="client_role"
            type="text"
            defaultValue={initialData?.client_role ?? ""}
            aria-describedby="client_role-hint"
            className={inputClass}
          />
          <p id="client_role-hint" className="mt-1 text-xs text-muted-foreground">
            e.g. CEO, CTO, Product Manager
          </p>
        </div>

        {/* Client Company */}
        <div>
          <label htmlFor="client_company" className={labelClass}>
            Client Company
          </label>
          <input
            id="client_company"
            name="client_company"
            type="text"
            defaultValue={initialData?.client_company ?? ""}
            aria-describedby="client_company-hint"
            className={inputClass}
          />
          <p id="client_company-hint" className="mt-1 text-xs text-muted-foreground">
            e.g. Nusantara Retail Group
          </p>
        </div>
      </div>

      {/* Media card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Media
        </h2>

        {/* Avatar URL */}
        <div>
          <label htmlFor="avatar_url" className={labelClass}>
            Avatar URL
          </label>
          <input
            id="avatar_url"
            name="avatar_url"
            type="text"
            defaultValue={initialData?.avatar_url ?? ""}
            aria-describedby="avatar_url-hint"
            className={inputClass}
          />
          <p id="avatar_url-hint" className="mt-1 text-xs text-muted-foreground">
            Direct image URL — upload feature coming soon
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
            : "Create Testimonial"}
        </Button>
      </div>
    </form>
  );
}
