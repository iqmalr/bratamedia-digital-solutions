import { cn } from "@/lib/utils";

interface ContainerProps {
  /** Additional Tailwind classes */
  className?: string;
  children: React.ReactNode;
  /** HTML element to render as (default: "div") */
  as?: React.ElementType;
}

/**
 * Container — max-width wrapper with responsive horizontal padding.
 *
 * Provides consistent horizontal containment across all sections.
 * Centered, with padding that increases at wider breakpoints.
 *
 * Server Component — no interactivity needed.
 */
export function Container({
  className,
  children,
  as: Element = "div",
}: ContainerProps) {
  return (
    <Element
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </Element>
  );
}
