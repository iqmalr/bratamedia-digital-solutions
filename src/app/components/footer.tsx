"use client";

import { useLocale } from "@/i18n/locale-context";
import { Container } from "@/app/components/ui/container";
import type { ContactDictionary, FooterDictionary, NavbarDictionary } from "@/i18n/types";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FooterProps {
  dict: FooterDictionary;
  navLinks: NavbarDictionary["links"];
  contactInfo: ContactDictionary["info"];
}

// ---------------------------------------------------------------------------
// Section anchor links (mirrors Navbar)
// ---------------------------------------------------------------------------

const SECTION_LINKS: Array<{ key: keyof NavbarDictionary["links"]; href: string }> = [
  { key: "services", href: "#services" },
  { key: "portfolio", href: "#portfolio" },
  { key: "testimonials", href: "#testimonials" },
  { key: "contact", href: "#contact" },
];

// ---------------------------------------------------------------------------
// Social media placeholder data
// ---------------------------------------------------------------------------

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function TwitterXIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Footer sub-components
// ---------------------------------------------------------------------------

function FooterBrand({ tagline }: { tagline: string }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Wordmark — matches Navbar */}
      <a
        href="#hero"
        className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
        aria-label="Bratamedia Digital Solutions — back to top"
      >
        <span className="text-brand font-bold text-xl tracking-tight">
          brata
          <span className="text-foreground">media</span>
        </span>
      </a>
      <p className="text-sm text-muted-foreground max-w-[22rem] leading-relaxed">
        {tagline}
      </p>
    </div>
  );
}

function FooterQuickLinks({
  navLinks,
}: {
  navLinks: NavbarDictionary["links"];
}) {
  return (
    <nav aria-label="Footer navigation">
      <ul role="list" className="flex flex-col gap-2">
        {SECTION_LINKS.map(({ key, href }) => (
          <li key={key}>
            <a
              href={href}
              className={cn(
                "text-sm text-muted-foreground",
                "hover:text-brand transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm",
              )}
            >
              {navLinks[key]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterContactInfo({ info }: { info: ContactDictionary["info"] }) {
  return (
    <address className="not-italic flex flex-col gap-2 text-sm text-muted-foreground">
      <a
        href={`mailto:${info.email}`}
        className="hover:text-brand transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
      >
        {info.email}
      </a>
      <a
        href={`tel:${info.phone.replace(/\s/g, "")}`}
        className="hover:text-brand transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
      >
        {info.phone}
      </a>
      <span>{info.address}</span>
    </address>
  );
}

interface FooterSocialProps {
  followUs: string;
}

function FooterSocial({ followUs }: FooterSocialProps) {
  const socialLinks: SocialLink[] = [
    { name: "LinkedIn", href: "https://linkedin.com/company/bratamedia", icon: <LinkedInIcon /> },
    { name: "Instagram", href: "https://instagram.com/bratamedia", icon: <InstagramIcon /> },
    { name: "X (Twitter)", href: "https://x.com/bratamedia", icon: <TwitterXIcon /> },
  ];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-foreground">{followUs}</p>
      <ul role="list" className="flex items-center gap-3">
        {socialLinks.map(({ name, href, icon }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-md",
                "text-muted-foreground hover:text-brand",
                "border border-border hover:border-brand",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              )}
            >
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Footer bottom bar
// ---------------------------------------------------------------------------

interface FooterBottomBarProps {
  copyright: string;
  policyLinks: FooterDictionary["links"];
}

function FooterBottomBar({ copyright, policyLinks }: FooterBottomBarProps) {
  const year = new Date().getFullYear();
  const copyrightText = copyright.replace("{year}", String(year));

  return (
    <div className="flex flex-col items-center gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
      <p className="text-xs text-muted-foreground">{copyrightText}</p>
      <ul role="list" className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {(["privacy", "terms", "sitemap"] as const).map((key) => (
          <li key={key}>
            <a
              href={`#${key}`}
              className={cn(
                "text-xs text-muted-foreground",
                "hover:text-brand transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm",
              )}
            >
              {policyLinks[key]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Column heading helper
// ---------------------------------------------------------------------------

function FooterColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-foreground tracking-wide mb-4">
      {children}
    </h3>
  );
}

// ---------------------------------------------------------------------------
// Main Footer
// ---------------------------------------------------------------------------

export function Footer({ dict, navLinks, contactInfo }: FooterProps) {
  const { locale } = useLocale();

  const columnLabels = {
    quickLinks: locale === "id" ? "Navigasi" : "Navigation",
    contact: locale === "id" ? "Kontak" : "Contact",
  };

  return (
    <footer
      role="contentinfo"
      className="bg-muted/30 border-t border-border"
    >
      <Container>
        <div className="py-12 lg:py-16">
          {/* Main grid */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1 — Brand & tagline */}
            <div className="sm:col-span-2 lg:col-span-1">
              <FooterBrand tagline={dict.tagline} />
            </div>

            {/* Column 2 — Quick links */}
            <div>
              <FooterColumnHeading>{columnLabels.quickLinks}</FooterColumnHeading>
              <FooterQuickLinks navLinks={navLinks} />
            </div>

            {/* Column 3 — Contact info */}
            <div>
              <FooterColumnHeading>{columnLabels.contact}</FooterColumnHeading>
              <FooterContactInfo info={contactInfo} />
            </div>

            {/* Column 4 — Social media */}
            <div>
              <FooterSocial followUs={dict.social.followUs} />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 lg:mt-14">
            <FooterBottomBar
              copyright={dict.copyright}
              policyLinks={dict.links}
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}
