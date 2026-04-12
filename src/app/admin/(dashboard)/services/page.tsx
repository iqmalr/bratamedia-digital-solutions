import Link from "next/link";
import { Wrench } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getAllServices } from "@/lib/actions/admin/services";
import { ToggleActiveButton } from "@/app/admin/(dashboard)/services/toggle-active-button";
import { DeleteServiceButton } from "@/app/admin/(dashboard)/services/delete-service-button";

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Services</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {services.length} service{services.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className={cn(buttonVariants({ variant: "brand", size: "sm" }))}
        >
          Add Service
        </Link>
      </div>

      {/* Table or empty state */}
      {services.length === 0 ? (
        <div className="rounded-xl border border-border bg-card flex flex-col items-center justify-center py-20 text-center">
          <Wrench
            className="h-10 w-10 text-muted-foreground/40 mb-3"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-muted-foreground">
            No services yet
          </p>
          <p className="mt-1 text-sm text-muted-foreground/70">
            <Link
              href="/admin/services/new"
              className="text-brand hover:text-brand-dark underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
            >
              Add your first service
            </Link>
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-16"
                >
                  Order
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Name (ID)
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell"
                >
                  Name (EN)
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell"
                >
                  Icon
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr
                  key={service.id}
                  className={
                    "border-t border-border hover:bg-muted/20 transition-colors " +
                    (!service.is_active ? "opacity-60" : "")
                  }
                >
                  {/* Sort order */}
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">
                    {service.sort_order}
                  </td>

                  {/* Name ID */}
                  <td className="px-4 py-3 font-medium text-foreground">
                    {service.name_id}
                  </td>

                  {/* Name EN */}
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    {service.name_en}
                  </td>

                  {/* Icon */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {service.icon ? (
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
                        {service.icon}
                      </code>
                    ) : (
                      <span className="text-muted-foreground/50 text-xs italic">—</span>
                    )}
                  </td>

                  {/* Status toggle */}
                  <td className="px-4 py-3">
                    <ToggleActiveButton
                      serviceId={service.id}
                      isActive={service.is_active}
                    />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/services/${service.id}/edit`}
                        className="text-sm font-medium text-brand hover:text-brand-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                      >
                        Edit
                      </Link>
                      <DeleteServiceButton
                        serviceId={service.id}
                        serviceName={service.name_en}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
