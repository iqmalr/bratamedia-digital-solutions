"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, type SignInResult } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Action wrapper — required by useActionState signature
// ---------------------------------------------------------------------------

async function loginAction(
  _prevState: SignInResult | null,
  formData: FormData
): Promise<SignInResult> {
  return signIn(formData);
}

// ---------------------------------------------------------------------------
// Input styles
// ---------------------------------------------------------------------------

const inputClasses =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors";

const errorInputClasses = "border-red-500 focus:ring-red-300 focus:border-red-500";

// ---------------------------------------------------------------------------
// AdminLoginPage
// ---------------------------------------------------------------------------

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, null);

  const fieldErrors =
    state?.success === false ? state.fieldErrors : undefined;

  useEffect(() => {
    if (state?.success === true) {
      router.push("/admin");
    }
  }, [state, router]);

  return (
    <main className="min-h-screen bg-muted/40 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
        {/* Wordmark */}
        <div className="mb-6 text-center">
          <span className="text-brand font-bold text-xl tracking-tight leading-none">
            brata
            <span className="text-foreground">media</span>
          </span>
          <p className="mt-1 text-sm text-muted-foreground">Admin Dashboard</p>
        </div>

        {/* General error */}
        {state?.success === false && state.error && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {state.error}
          </div>
        )}

        <form action={formAction} noValidate className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@example.com"
              aria-describedby={fieldErrors?.email ? "email-error" : undefined}
              aria-invalid={!!fieldErrors?.email}
              className={cn(inputClasses, fieldErrors?.email && errorInputClasses)}
            />
            {fieldErrors?.email && (
              <p id="email-error" role="alert" className="text-sm text-red-600 mt-1">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              aria-describedby={fieldErrors?.password ? "password-error" : undefined}
              aria-invalid={!!fieldErrors?.password}
              className={cn(inputClasses, fieldErrors?.password && errorInputClasses)}
            />
            {fieldErrors?.password && (
              <p id="password-error" role="alert" className="text-sm text-red-600 mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="brand"
            disabled={isPending}
            className="mt-1 w-full"
            aria-busy={isPending}
          >
            {isPending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}
