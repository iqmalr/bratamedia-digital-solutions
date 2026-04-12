import Link from "next/link";
import {
  Wrench,
  FolderOpen,
  MessageSquareQuote,
  Mail,
} from "lucide-react";
import {
  getDashboardStats,
  getRecentContacts,
  type DashboardStats,
  type RecentContact,
} from "@/lib/actions/admin/dashboard";

// ---------------------------------------------------------------------------
// Stat card
// ---------------------------------------------------------------------------

interface StatCardProps {
  label: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
}

function StatCard({ label, count, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-3xl font-bold tabular-nums">{count}</p>
        </div>
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Stat cards grid
// ---------------------------------------------------------------------------

function StatsGrid({ stats }: { stats: DashboardStats }) {
  const cards = [
    { label: "Services", count: stats.totalServices, icon: Wrench },
    { label: "Portfolio Items", count: stats.totalPortfolio, icon: FolderOpen },
    {
      label: "Testimonials",
      count: stats.totalTestimonials,
      icon: MessageSquareQuote,
    },
    { label: "Unread Messages", count: stats.unreadContacts, icon: Mail },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------

function StatusBadge({ isRead }: { isRead: boolean }) {
  if (isRead) {
    return (
      <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
        Read
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-brand/10 text-brand">
      Unread
    </span>
  );
}

// ---------------------------------------------------------------------------
// Recent contacts table
// ---------------------------------------------------------------------------

function RecentContactsTable({ contacts }: { contacts: RecentContact[] }) {
  return (
    <section aria-labelledby="recent-contacts-heading">
      <h2
        id="recent-contacts-heading"
        className="text-lg font-semibold mt-8 mb-4"
      >
        Recent Contact Submissions
      </h2>

      {contacts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No submissions yet.</p>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell"
                >
                  Subject
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-t border-border hover:bg-muted/20 transition-colors duration-150"
                >
                  <td className="px-4 py-3">
                    <Link
                      href="/admin/contacts"
                      className="font-medium hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                    >
                      {contact.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                    {contact.email}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    {contact.subject ?? (
                      <span className="italic text-muted-foreground/60">
                        No subject
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge isRead={contact.is_read} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function AdminDashboardPage() {
  const [stats, recentContacts] = await Promise.all([
    getDashboardStats(),
    getRecentContacts(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="mt-6">
        <StatsGrid stats={stats} />
      </div>
      <RecentContactsTable contacts={recentContacts} />
    </div>
  );
}
