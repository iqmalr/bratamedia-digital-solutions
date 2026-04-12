"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  FolderOpen,
  MessageSquareQuote,
  Mail,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/actions/auth";

// ---------------------------------------------------------------------------
// Nav config
// ---------------------------------------------------------------------------

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Portfolio", href: "/admin/portfolio", icon: FolderOpen },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
];

// ---------------------------------------------------------------------------
// Wordmark
// ---------------------------------------------------------------------------

function AdminWordmark() {
  return (
    <Link
      href="/admin"
      className={cn(
        "flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm",
      )}
      aria-label="Bratamedia admin — go to dashboard"
    >
      <span className="text-brand font-bold text-xl tracking-tight leading-none">
        brata
        <span className="text-foreground">media</span>
      </span>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Nav link
// ---------------------------------------------------------------------------

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

function NavItem({ href, label, icon: Icon, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive =
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
          isActive
            ? "bg-brand/10 text-brand font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        )}
        aria-current={isActive ? "page" : undefined}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {label}
      </Link>
    </li>
  );
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

interface SidebarProps {
  userEmail: string;
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ userEmail, isOpen, onClose }: SidebarProps) {
  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Top: wordmark + close button (mobile only) */}
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        <AdminWordmark />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground",
            "hover:bg-muted hover:text-foreground transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
            "lg:hidden",
          )}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Middle: nav links */}
      <nav aria-label="Admin navigation" className="flex-1 overflow-y-auto p-3">
        <ul role="list" className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              onClick={onClose}
            />
          ))}
        </ul>
      </nav>

      {/* Bottom: user info + sign out */}
      <div className="border-t border-border p-3">
        <div className="mb-2 px-3 py-1">
          <p className="text-xs text-muted-foreground truncate" title={userEmail}>
            {userEmail}
          </p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm",
              "text-muted-foreground hover:text-destructive hover:bg-destructive/10",
              "transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <aside
        className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 bg-card border-r border-border"
        aria-label="Admin sidebar"
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar — slide-in overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            aria-hidden="true"
            onClick={onClose}
          />
          {/* Drawer */}
          <aside
            className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border lg:hidden"
            aria-label="Admin sidebar"
          >
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

interface HeaderProps {
  userEmail: string;
  onMenuToggle: () => void;
  isMobileOpen: boolean;
}

function Header({ userEmail, onMenuToggle, isMobileOpen }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 flex h-14 items-center justify-between border-b border-border bg-card px-4">
      {/* Left: hamburger (mobile only) */}
      <button
        type="button"
        onClick={onMenuToggle}
        aria-expanded={isMobileOpen}
        aria-label={isMobileOpen ? "Close navigation" : "Open navigation"}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground",
          "hover:bg-muted hover:text-foreground transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
          "lg:hidden",
        )}
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Spacer for desktop (hamburger not shown) */}
      <div className="hidden lg:block" />

      {/* Right: user email (desktop only) */}
      <div className="hidden lg:flex items-center gap-2">
        <span className="text-sm text-muted-foreground truncate max-w-[200px]" title={userEmail}>
          {userEmail}
        </span>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Admin Shell
// ---------------------------------------------------------------------------

export interface AdminShellProps {
  children: React.ReactNode;
  userEmail: string;
}

export function AdminShell({ children, userEmail }: AdminShellProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const openMobile = useCallback(() => setIsMobileOpen(true), []);
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        closeMobile();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, closeMobile]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        userEmail={userEmail}
        isOpen={isMobileOpen}
        onClose={closeMobile}
      />

      {/* Content area — offset by sidebar width on desktop */}
      <div className="lg:pl-64">
        <Header
          userEmail={userEmail}
          onMenuToggle={openMobile}
          isMobileOpen={isMobileOpen}
        />

        {/* Page content — top padding accounts for fixed header */}
        <main className="pt-14 min-h-screen" id="main-content">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
