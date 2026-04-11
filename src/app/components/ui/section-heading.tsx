import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Main section title — rendered as <h2> */
  title: string;
  /** Supporting subtitle text — rendered as <p> */
  subtitle?: string;
  /** Text alignment (default: "center") */
  align?: "left" | "center";
  /** Additional Tailwind classes on the wrapper */
  className?: string;
  /**
   * Decorative accent line above the title.
   * When true, renders an orange horizontal rule before the title.
   * Default: true
   */
  withAccent?: boolean;
}

/**
 * SectionHeading — standardized title + subtitle block for landing sections.
 *
 * Used at the top of every major section (Services, Portfolio, etc.).
 * Maintains heading hierarchy: the parent page has <h1> in the Hero,
 * so all sections use <h2>.
 *
 * Server Component — no interactivity needed.
 *
 * @example
 * <SectionHeading
 *   title={dict.services.title}
 *   subtitle={dict.services.subtitle}
 * />
 */
export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
  withAccent = true,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {withAccent && (
        <span
          aria-hidden="true"
          className={cn(
            "mb-4 inline-block h-1 w-12 rounded-full bg-brand",
            align === "center" && "mx-auto",
          )}
        />
      )}

      <h2
        className={cn(
          // h2 base styles come from globals.css @layer base
          "text-foreground",
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-lg text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
