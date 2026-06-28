import { useAdmin } from "@/contexts/AdminContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ClipboardList,
  Crown,
  LogOut,
  Mail,
  Menu,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: Users, exact: true },
  {
    label: "Services",
    href: "/admin/services",
    icon: ClipboardList,
    exact: false,
  },
  { label: "Contact", href: "/admin/contact", icon: Mail, exact: false },
  { label: "Settings", href: "/admin/settings", icon: Settings, exact: false },
];

export function AdminSidebar() {
  const { logout, isSuperAdmin } = useAdmin();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const handleLogout = () => {
    logout();
    window.location.replace("/admin/login");
  };

  const sidebarContent = (
    <aside className="flex h-full w-64 flex-col bg-card border-r border-border/40 shadow-elevated">
      {/* Admin branding section */}
      <div className="flex flex-col items-center pt-7 pb-5 px-4 shrink-0 border-b border-border/30">
        {/* Glow orb */}
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.17 70 / 0.15) 0%, transparent 70%)",
            filter: "blur(16px)",
          }}
          aria-hidden="true"
        />

        {/* Logo */}
        <div className="relative flex items-center justify-center mb-3 w-[60px] h-[60px]">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: "2px solid transparent",
              borderTopColor: "oklch(0.72 0.17 70)",
              borderRightColor: "oklch(0.72 0.17 70 / 0.3)",
              animation: "spin 3s linear infinite",
            }}
            aria-hidden="true"
          />
          <div
            className="w-[52px] h-[52px] rounded-xl overflow-hidden flex items-center justify-center shrink-0"
            style={{
              border: "1px solid oklch(0.72 0.17 70 / 0.35)",
              boxShadow: "0 0 16px oklch(0.72 0.17 70 / 0.25)",
              background: "oklch(0.18 0.018 50)",
            }}
          >
            <span className="font-display font-bold text-primary text-xl">
              I
            </span>
          </div>
        </div>

        <p className="font-display font-black text-sm tracking-tight leading-none text-foreground">
          IGNOU
        </p>
        <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-primary/70">
          Admin Panel
        </p>
      </div>

      {/* Role badge */}
      <div
        className={`mx-3 mt-3 mb-1 rounded-lg px-3 py-1.5 flex items-center gap-2 ${
          isSuperAdmin
            ? "bg-accent/10 border border-accent/25"
            : "bg-primary/10 border border-primary/25"
        }`}
      >
        {isSuperAdmin ? (
          <Crown className="h-3 w-3 shrink-0 text-accent" />
        ) : (
          <ShieldCheck className="h-3 w-3 shrink-0 text-primary" />
        )}
        <span
          className={`text-[10px] font-bold uppercase tracking-wider ${
            isSuperAdmin ? "text-accent" : "text-primary"
          }`}
        >
          {isSuperAdmin ? "Superadmin" : "Administrator"}
        </span>
      </div>

      {/* Nav label */}
      <div className="px-5 pt-3 pb-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Management
        </p>
      </div>

      {/* Nav items */}
      <nav
        className="flex-1 space-y-0.5 px-3 pb-4 overflow-y-auto scrollbar-thin"
        aria-label="Admin navigation"
      >
        {navItems.map(({ label, href, icon: Icon, exact }, _index) => {
          const isActive = exact
            ? currentPath === href
            : currentPath.startsWith(href);
          return (
            <Link
              key={href}
              to={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-smooth",
              )}
              style={
                isActive
                  ? {
                      background: "oklch(0.72 0.17 70 / 0.12)",
                      border: "1px solid oklch(0.72 0.17 70 / 0.25)",
                      borderLeft: "3px solid oklch(0.72 0.17 70)",
                    }
                  : {}
              }
              data-ocid={`admin-nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
              aria-current={isActive ? "page" : undefined}
            >
              {!isActive && (
                <span
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-smooth"
                  style={{
                    background: "oklch(0.72 0.17 70 / 0.05)",
                    border: "1px solid oklch(0.72 0.17 70 / 0.08)",
                  }}
                />
              )}
              <Icon
                className="h-4 w-4 shrink-0 transition-fast"
                style={{
                  color: isActive
                    ? "oklch(0.72 0.17 70)"
                    : "oklch(0.52 0.012 55)",
                }}
              />
              <span
                className="flex-1 relative font-semibold"
                style={{
                  color: isActive
                    ? "oklch(0.72 0.17 70)"
                    : "oklch(0.82 0.01 60)",
                }}
              >
                {label}
              </span>
              {isActive && (
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background: "oklch(0.72 0.17 70)",
                    boxShadow: "0 0 6px oklch(0.72 0.17 70 / 0.8)",
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 space-y-1 shrink-0 border-t border-border/30">
        <button
          type="button"
          className="w-full flex items-center gap-3 h-9 px-3 text-xs font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
          onClick={handleLogout}
          data-ocid="admin-nav-logout"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign out</span>
        </button>

        <p className="text-[10px] text-center px-2 pt-0.5 pb-0.5 text-muted-foreground/50">
          Built with{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:opacity-70"
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
        <button
          type="button"
          className="fixed top-3 left-3 z-50 flex items-center justify-center h-11 w-11 rounded-xl border border-border bg-card text-foreground transition-fast active:scale-95"
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
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setMobileOpen(false);
              }}
              aria-label="Close admin sidebar"
            />
            <div
              className="fixed inset-y-0 left-0 z-50 w-64 animate-slide-in-left"
              style={{ boxShadow: "4px 0 40px oklch(0 0 0 / 0.5)" }}
            >
              {sidebarContent}
            </div>
          </>
        )}
      </>
    );
  }

  return sidebarContent;
}
