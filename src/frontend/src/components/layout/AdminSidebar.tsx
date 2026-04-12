import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Award,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAdmin } from "../../contexts/AdminContext";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Signals", href: "/admin/signals", icon: TrendingUp, exact: false },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
    exact: false,
  },
  {
    label: "Certificates",
    href: "/admin/certificates",
    icon: Award,
    exact: false,
  },
  { label: "Settings", href: "/admin/settings", icon: Settings, exact: false },
];

export function AdminSidebar() {
  const { clear } = useInternetIdentity();
  const { logout } = useAdmin();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleLogout = () => {
    logout();
    clear();
    window.location.replace("/admin/login");
  };

  const sidebarContent = (
    <aside className="flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Admin branding section */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4 shrink-0">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-destructive/25 shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.62 0.22 22 / 0.2) 0%, oklch(0.72 0.19 220 / 0.12) 100%)",
            boxShadow: "0 2px 8px oklch(0.62 0.22 22 / 0.12)",
          }}
        >
          <ShieldCheck className="h-5 w-5 text-destructive" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-sm font-bold text-sidebar-foreground tracking-tight leading-tight">
            Admin Panel
          </p>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            TradeSignal Pro
          </p>
        </div>
      </div>

      {/* Role badge */}
      <div
        className="mx-3 mt-3 mb-1 rounded-lg border border-destructive/20 px-3 py-1.5 flex items-center gap-2"
        style={{ background: "oklch(0.62 0.22 22 / 0.08)" }}
      >
        <ShieldCheck className="h-3 w-3 text-destructive shrink-0" />
        <span className="text-[10px] font-semibold text-destructive uppercase tracking-wider">
          Administrator
        </span>
      </div>

      {/* Nav label */}
      <div className="px-5 pt-3 pb-1">
        <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest">
          Management
        </p>
      </div>

      {/* Nav items */}
      <nav
        className="flex-1 space-y-0.5 px-3 pb-4 overflow-y-auto scrollbar-thin"
        aria-label="Admin navigation"
      >
        {navItems.map(({ label, href, icon: Icon, exact }, index) => {
          const isActive = exact
            ? currentPath === href
            : currentPath.startsWith(href);
          return (
            <Link
              key={href}
              to={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth animate-slide-in-left",
                `stagger-${Math.min(index + 1, 4)}`,
                isActive
                  ? "bg-primary/12 text-primary nav-item-active"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
              data-ocid={`admin-nav-${label.toLowerCase()}`}
              aria-current={isActive ? "page" : undefined}
            >
              {/* Active background glow */}
              {isActive && (
                <span
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.72 0.19 220 / 0.1) 0%, transparent 100%)",
                  }}
                />
              )}

              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-fast",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-sidebar-accent-foreground",
                )}
              />
              <span className="flex-1 relative">{label}</span>

              {/* Active accent dot */}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3 space-y-1 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent h-9 px-3 text-xs font-medium"
          onClick={handleLogout}
          data-ocid="admin-nav-logout"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign out</span>
        </Button>

        <p className="text-[10px] text-muted-foreground/40 text-center px-2 pt-0.5 pb-0.5">
          Built with{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground/70 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </aside>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile hamburger — min 44px touch target */}
        <button
          type="button"
          className="fixed top-3 left-3 z-50 flex items-center justify-center h-11 w-11 rounded-xl border border-border/60 bg-card shadow-elevated text-foreground transition-fast hover:bg-muted active:scale-95"
          onClick={() => setMobileOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setMobileOpen((v) => !v);
          }}
          aria-label={mobileOpen ? "Close admin sidebar" : "Open admin sidebar"}
          data-ocid="admin-sidebar-toggle"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {mobileOpen && (
          <>
            <div
              role="button"
              tabIndex={0}
              className="modal-backdrop z-40"
              onClick={() => setMobileOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setMobileOpen(false);
              }}
              aria-label="Close admin sidebar"
            />
            <div className="fixed inset-y-0 left-0 z-50 w-64 animate-slide-in-left shadow-premium">
              {sidebarContent}
            </div>
          </>
        )}
      </>
    );
  }

  return sidebarContent;
}
