"use client";

import { motion, useReducedMotion } from "framer-motion";

// ---------------------------------------------------------------------------
// FadeInUp — fade + slide-up triggered when element enters the viewport
// ---------------------------------------------------------------------------

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeInUp({ children, delay = 0, className }: FadeInUpProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// StaggerContainer — parent that staggers its StaggerItem children
// ---------------------------------------------------------------------------

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  /** ARIA role override — use "list" when children represent list items */
  role?: string;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  role,
}: StaggerContainerProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div role={role} className={className}>{children}</div>;
  }

  return (
    <motion.div
      role={role}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// StaggerItem — individual animated child inside a StaggerContainer
// ---------------------------------------------------------------------------

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  /** ARIA role override — use "listitem" when inside a StaggerContainer with role="list" */
  role?: string;
}

export function StaggerItem({ children, className, role }: StaggerItemProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div role={role} className={className}>{children}</div>;
  }

  return (
    <motion.div
      role={role}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
