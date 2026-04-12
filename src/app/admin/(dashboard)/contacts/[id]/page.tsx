import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getContactById,
  markContactAsRead,
} from "@/lib/actions/admin/contacts";
import { ToggleReadButton } from "./toggle-read-button";

// Next.js 16: params is a Promise — must be awaited
export default async function ContactDetailPage({
  params,
}: PageProps<"/admin/contacts/[id]">) {
  const { id } = await params;

  const contact = await getContactById(id);

  if (!contact) {
    notFound();
  }

  // Auto-mark as read on detail view, mirroring email behavior
  if (!contact.is_read) {
    await markContactAsRead(contact.id);
    contact.is_read = true;
  }

  const submittedAt = new Date(contact.created_at);
  const dateTimeLabel = submittedAt.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Back link */}
      <Link
        href="/admin/contacts"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to contacts
      </Link>

      {/* Detail card */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Card header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              {contact.name}
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Submitted {dateTimeLabel}
            </p>
          </div>
          <ToggleReadButton contactId={contact.id} isRead={contact.is_read} />
        </div>

        {/* Contact metadata */}
        <dl className="divide-y divide-border">
          {/* Email */}
          <div className="grid grid-cols-[140px_1fr] gap-4 px-6 py-4">
            <dt className="text-sm font-medium text-muted-foreground self-start">
              Email
            </dt>
            <dd className="text-sm text-foreground">
              <a
                href={`mailto:${contact.email}`}
                className="text-brand hover:text-brand-dark underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
              >
                {contact.email}
              </a>
            </dd>
          </div>

          {/* Phone */}
          <div className="grid grid-cols-[140px_1fr] gap-4 px-6 py-4">
            <dt className="text-sm font-medium text-muted-foreground self-start">
              Phone
            </dt>
            <dd className="text-sm text-foreground">
              {contact.phone ? (
                <a
                  href={`tel:${contact.phone}`}
                  className="text-brand hover:text-brand-dark underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                >
                  {contact.phone}
                </a>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </dd>
          </div>

          {/* Subject */}
          <div className="grid grid-cols-[140px_1fr] gap-4 px-6 py-4">
            <dt className="text-sm font-medium text-muted-foreground self-start">
              Subject
            </dt>
            <dd className="text-sm text-foreground">
              {contact.subject ?? (
                <span className="text-muted-foreground">No subject</span>
              )}
            </dd>
          </div>

          {/* Message */}
          <div className="px-6 py-4">
            <dt className="text-sm font-medium text-muted-foreground mb-3">
              Message
            </dt>
            <dd className="text-sm text-foreground whitespace-pre-wrap leading-relaxed rounded-lg border border-border bg-muted/30 px-4 py-3">
              {contact.message}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
