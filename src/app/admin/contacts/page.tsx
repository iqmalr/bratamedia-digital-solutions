import Link from "next/link";
import { Mail } from "lucide-react";
import { getContactSubmissions } from "@/lib/actions/admin/contacts";

export default async function ContactSubmissionsPage() {
  const submissions = await getContactSubmissions();

  const unreadCount = submissions.filter((s) => !s.is_read).length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Contact Submissions
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {submissions.length} submission{submissions.length !== 1 ? "s" : ""}
          {unreadCount > 0 && (
            <span className="ml-1 text-brand font-medium">
              , {unreadCount} unread
            </span>
          )}
        </p>
      </div>

      {/* Table or empty state */}
      {submissions.length === 0 ? (
        <div className="rounded-xl border border-border bg-card flex flex-col items-center justify-center py-20 text-center">
          <Mail className="h-10 w-10 text-muted-foreground/40 mb-3" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            No contact submissions yet
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Subject
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => {
                const submittedAt = new Date(submission.created_at);
                const dateLabel = submittedAt.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
                const timeLabel = submittedAt.toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <tr
                    key={submission.id}
                    className={
                      "border-t border-border hover:bg-muted/20 transition-colors " +
                      (!submission.is_read ? "bg-brand/5" : "")
                    }
                  >
                    {/* Name */}
                    <td className="px-4 py-3 text-foreground">
                      <span
                        className={
                          !submission.is_read ? "font-semibold" : "font-normal"
                        }
                      >
                        {submission.name}
                      </span>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {submission.email}
                    </td>

                    {/* Subject */}
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                      <span
                        className="block max-w-[200px] truncate"
                        title={submission.subject ?? undefined}
                      >
                        {submission.subject ?? "—"}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap hidden lg:table-cell">
                      <span>{dateLabel}</span>
                      <span className="ml-1 text-xs text-muted-foreground/70">
                        {timeLabel}
                      </span>
                    </td>

                    {/* Status badge */}
                    <td className="px-4 py-3">
                      {submission.is_read ? (
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700">
                          Read
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700">
                          New
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/contacts/${submission.id}`}
                        className="text-sm font-medium text-brand hover:text-brand-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
