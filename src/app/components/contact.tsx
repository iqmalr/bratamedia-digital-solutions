"use client";

import { useActionState } from "react";
import { MapPin, Mail, Phone, CheckCircle2 } from "lucide-react";
import type { ContactDictionary } from "@/i18n/types";
import { submitContactForm, type ContactFormResult } from "@/lib/actions/contact";
import { SectionWrapper } from "@/app/components/ui/section-wrapper";
import { SectionHeading } from "@/app/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FadeInUp } from "@/app/components/ui/motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContactSectionProps {
  dictionary: ContactDictionary;
}

// ---------------------------------------------------------------------------
// Action wrapper — required by useActionState signature
// ---------------------------------------------------------------------------

async function contactAction(
  _prevState: ContactFormResult | null,
  formData: FormData
): Promise<ContactFormResult> {
  return submitContactForm(formData);
}

// ---------------------------------------------------------------------------
// FormField — labelled input/textarea wrapper
// ---------------------------------------------------------------------------

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-foreground"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Input styles
// ---------------------------------------------------------------------------

const inputClasses =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-colors";

const errorInputClasses = "border-red-500 focus:ring-red-300 focus:border-red-500";

// ---------------------------------------------------------------------------
// ContactForm — the form portion (client-interactive)
// ---------------------------------------------------------------------------

interface ContactFormProps {
  form: ContactDictionary["form"];
}

function ContactForm({ form }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(contactAction, null);

  const fieldErrors =
    state?.success === false ? state.fieldErrors : undefined;

  if (state?.success === true) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center gap-4 rounded-xl border border-green-200 bg-green-50 p-10 text-center"
      >
        <CheckCircle2
          aria-hidden="true"
          className="h-12 w-12 text-green-500"
        />
        <p className="text-base font-medium text-green-800">
          {form.successMessage}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {/* General error */}
      {state?.success === false && !fieldErrors && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {form.errorMessage}
        </div>
      )}

      {/* Name */}
      <FormField id="name" label={form.name.label} error={fieldErrors?.name}>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={form.name.placeholder}
          aria-describedby={fieldErrors?.name ? "name-error" : undefined}
          aria-invalid={!!fieldErrors?.name}
          className={cn(inputClasses, fieldErrors?.name && errorInputClasses)}
        />
      </FormField>

      {/* Email */}
      <FormField id="email" label={form.email.label} error={fieldErrors?.email}>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={form.email.placeholder}
          aria-describedby={fieldErrors?.email ? "email-error" : undefined}
          aria-invalid={!!fieldErrors?.email}
          className={cn(inputClasses, fieldErrors?.email && errorInputClasses)}
        />
      </FormField>

      {/* Phone */}
      <FormField id="phone" label={form.phone.label} error={fieldErrors?.phone}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={form.phone.placeholder}
          aria-describedby={fieldErrors?.phone ? "phone-error" : undefined}
          aria-invalid={!!fieldErrors?.phone}
          className={cn(inputClasses, fieldErrors?.phone && errorInputClasses)}
        />
      </FormField>

      {/* Subject */}
      <FormField id="subject" label={form.subject.label} error={fieldErrors?.subject}>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder={form.subject.placeholder}
          aria-describedby={fieldErrors?.subject ? "subject-error" : undefined}
          aria-invalid={!!fieldErrors?.subject}
          className={cn(inputClasses, fieldErrors?.subject && errorInputClasses)}
        />
      </FormField>

      {/* Message */}
      <FormField id="message" label={form.message.label} error={fieldErrors?.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={form.message.placeholder}
          aria-describedby={fieldErrors?.message ? "message-error" : undefined}
          aria-invalid={!!fieldErrors?.message}
          className={cn(
            inputClasses,
            "resize-y",
            fieldErrors?.message && errorInputClasses
          )}
        />
      </FormField>

      {/* Submit */}
      <Button
        type="submit"
        variant="brand"
        disabled={isPending}
        className="mt-1 w-full sm:w-auto"
        aria-busy={isPending}
      >
        {isPending ? form.submitting : form.submit}
      </Button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// ContactInfoItem — single row in the info sidebar
// ---------------------------------------------------------------------------

interface ContactInfoItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

function ContactInfoItem({ icon, children }: ContactInfoItemProps) {
  return (
    <div className="flex items-start gap-4">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-subtle text-brand"
      >
        {icon}
      </span>
      <div className="flex-1 text-sm leading-relaxed text-foreground/80">
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ContactSection — public-facing export
// ---------------------------------------------------------------------------

/**
 * ContactSection — contact form + info sidebar for the landing page.
 *
 * Client Component: manages form state via useActionState (React 19).
 * Two-column layout on lg+: form (7 cols) + info sidebar (5 cols).
 *
 * Uses "default" background to alternate with the preceding TestimonialsSection
 * (muted).
 */
export function ContactSection({ dictionary }: ContactSectionProps) {
  const { title, subtitle, form, info } = dictionary;

  return (
    <SectionWrapper id="contact" background="default">
      <FadeInUp>
        <SectionHeading title={title} subtitle={subtitle} />
      </FadeInUp>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Form column */}
        <FadeInUp delay={0.1} className="lg:col-span-7">
          <ContactForm form={form} />
        </FadeInUp>

        {/* Info sidebar */}
        <FadeInUp delay={0.2} className="lg:col-span-5">
          <aside aria-label="Contact information">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <h3 className="mb-6 text-base font-semibold text-foreground">
                {/* Decorative accent to tie sidebar visually to the brand */}
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block h-1 w-6 translate-y-[-3px] rounded-full bg-brand align-middle"
                />
                Bratamedia Digital Solutions
              </h3>

              <ul role="list" className="flex flex-col gap-6">
                {/* Address */}
                <li>
                  <ContactInfoItem icon={<MapPin className="h-5 w-5" />}>
                    <address className="not-italic">{info.address}</address>
                  </ContactInfoItem>
                </li>

                {/* Email */}
                <li>
                  <ContactInfoItem icon={<Mail className="h-5 w-5" />}>
                    <a
                      href={`mailto:${info.email}`}
                      className="break-all hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm"
                    >
                      {info.email}
                    </a>
                  </ContactInfoItem>
                </li>

                {/* Phone */}
                <li>
                  <ContactInfoItem icon={<Phone className="h-5 w-5" />}>
                    <a
                      href={`tel:${info.phone}`}
                      className="hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 rounded-sm"
                    >
                      {info.phone}
                    </a>
                  </ContactInfoItem>
                </li>
              </ul>
            </div>
          </aside>
        </FadeInUp>
      </div>
    </SectionWrapper>
  );
}
