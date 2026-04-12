import { requireAdmin } from "@/lib/actions/auth";
import { AdminShell } from "@/app/admin/components/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <AdminShell userEmail={user.email ?? "Admin"}>{children}</AdminShell>
  );
}
