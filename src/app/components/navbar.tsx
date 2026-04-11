"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/locale-context";
import { type Locale, locales } from "@/i18n/config";
import type { NavbarDictionary } from "@/i18n/types";
import { Container } from "@/app/components/ui/container";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  key: keyof NavbarDictionary["links"];
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { key: "services", href: "#services" },
  { key: "portfolio", href: "#portfolio" },
  { key: "testimonials", href: "#testimonials" },
  { key: "contact", href: "#contact" },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function BrandLogo() {
  return (
    <Link
      href="#hero"
      className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
      aria-label="Bratamedia Digital Solutions — back to top"
    >
      {/* Simple wordmark — logo asset TBD */}
      <span className="text-brand font-bold text-xl tracking-tight leading-none">
        brata
        <span className="text-foreground">media</span>
      </span>
    </Link>
  );
}

interface LanguageToggleProps {
  switchToLabel: string;
}

function LanguageToggle({ switchToLabel }: LanguageToggleProps) {
  const { locale, switchLocale } = useLocale();

  const nextLocale = locales.find((l) => l !== locale) as Locale;

  return (
    <button
      type="button"
      onClick={() => switchLocale(nextLocale)}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1",
        "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
        "hover:border-brand hover:text-brand",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
      )}
      aria-label={switchToLabel}
    >
      <span
        className={cn(
          "transition-colors",
          locale === "id" ? "text-brand" : "text-muted-foreground/50",
        )}
      >
        ID
      </span>
      <span className="text-border">/</span>
      <span
        className={cn(
          "transition-colors",
          locale === "en" ? "text-brand" : "text-muted-foreground/50",
        )}
      >
        EN
      </span>
    </button>
  );
}

interface NavLinksProps {
  links: NavbarDictionary["links"];
  onLinkClick?: () => void;
  orientation?: "horizontal" | "vertical";
}

function NavLinks({ links, onLinkClick, orientation = "horizontal" }: NavLinksProps) {
  return (
    <ul
      role="list"
      className={cn(
        orientation === "horizontal"
          ? "flex items-center gap-1"
          : "flex flex-col gap-1",
      )}
    >
      {NAV_LINKS.map(({ key, href }) => (
        <li key={key}>
          <a
            href={href}
            onClick={onLinkClick}
            className={cn(
              "relative rounded-md px-3 py-2 text-sm font-medium",
              "text-muted-foreground hover:text-foreground",
              "transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              // Underline accent on hover
              "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px]",
              "after:origin-left after:scale-x-0 after:rounded-full after:bg-brand",
              "after:transition-transform after:duration-200 hover:after:scale-x-100",
              orientation === "vertical" && "block w-full px-4 py-3 text-base",
            )}
          >
            {links[key]}
          </a>
        </li>
      ))}
    </ul>
  );
}

interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  label: string;
}

function HamburgerButton({ isOpen, onToggle, label }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label={label}
      className={cn(
        "relative flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-md",
        "text-foreground transition-colors hover:bg-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
      )}
    >
      <span
        className={cn(
          "block h-[2px] w-5 rounded-full bg-current transition-transform duration-200",
          isOpen && "translate-y-[7px] rotate-45",
        )}
      />
      <span
        className={cn(
          "block h-[2px] w-5 rounded-full bg-current transition-opacity duration-200",
          isOpen && "opacity-0",
        )}
      />
      <span
        className={cn(
          "block h-[2px] w-5 rounded-full bg-current transition-transform duration-200",
          isOpen && "-translate-y-[7px] -rotate-45",
        )}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main Navbar
// ---------------------------------------------------------------------------

export interface NavbarProps {
  dict: NavbarDictionary;
}

export function Navbar({ dict }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  // Track scroll position to apply background blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount in case page is already scrolled
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when Escape is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    [],
  );

  const mobileMenuVariants = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.18 } },
        exit: { opacity: 0, y: -8, transition: { duration: 0.14 } },
      };

  return (
    <header
      role="banner"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/90 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container>
        <nav
          aria-label="Main navigation"
          className="flex h-16 items-center justify-between"
        >
          {/* Brand */}
          <BrandLogo />

          {/* Desktop nav links */}
          <div className="hidden md:flex md:items-center md:gap-2">
            <NavLinks links={dict.links} />
          </div>

          {/* Desktop right actions */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <LanguageToggle switchToLabel={dict.languageToggle.switchTo} />
          </div>

          {/* Mobile: language toggle + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle switchToLabel={dict.languageToggle.switchTo} />
            <HamburgerButton
              isOpen={isMobileMenuOpen}
              onToggle={toggleMobileMenu}
              label={isMobileMenuOpen ? dict.closeMenu : dict.openMenu}
            />
          </div>
        </nav>
      </Container>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            aria-label={dict.mobileMenu}
            {...(shouldReduce ? {} : mobileMenuVariants)}
            className="border-t border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <Container>
              <div className="py-4">
                <NavLinks
                  links={dict.links}
                  onLinkClick={closeMobileMenu}
                  orientation="vertical"
                />
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
