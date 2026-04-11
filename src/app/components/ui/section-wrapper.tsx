import { cn } from "@/lib/utils";
import { Container } from "@/app/components/ui/container";

interface SectionWrapperProps {
  /** Used for anchor navigation (e.g. href="#services") */
  id?: string;
  /** Additional Tailwind classes applied to the outer <section> */
  className?: string;
  children: React.ReactNode;
  /**
   * Background variant.
   * - "default" — uses the page background color
   * - "muted"   — slightly tinted background for visual alternation
   */
  background?: "default" | "muted";
}

/**
 * SectionWrapper — consistent vertical rhythm for landing page sections.
 *
 * Wraps each section with standard padding and a centered Container.
 * Sections alternate between "default" and "muted" backgrounds to
 * create visual separation without heavy borders.
 *
 * Server Component — no interactivity needed.
 *
 * @example
 * <SectionWrapper id="services" background="muted">
 *   <SectionHeading title={dict.services.title} subtitle={dict.services.subtitle} />
 *   ...
 * </SectionWrapper>
 */
export function SectionWrapper({
  id,
  className,
  children,
  background = "default",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        // Vertical padding — generous on desktop, comfortable on mobile
        "py-16 sm:py-20 lg:py-28",
        // Background variants
        background === "muted" && "bg-muted/40",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
