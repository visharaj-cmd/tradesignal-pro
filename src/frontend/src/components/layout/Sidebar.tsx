import { GoldenTickBadge } from "@/components/GoldenTickBadge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCertificateStatus } from "@/hooks/useCertificateStatus";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  TrendingUp,
  User,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useSubscriptionStatus } from "../../hooks/useSubscription";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Payment", href: "/payment", icon: CreditCard },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Get Certificate", href: "/certificates", icon: Award },
];

export function Sidebar() {
  const { clear } = useInternetIdentity();
  const { currentSession, profile, logout } = useAuth();
  const { data: isSubscribed } = useSubscriptionStatus();
  const { hasCertificate } = useCertificateStatus();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const displayName = profile.username || currentSession?.name || "Trader";
  const isVerified = !!isSubscribed;

  const handleLogout = () => {
    logout();
    clear();
    window.location.replace("/login");
  };

  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sidebarContent = (
    <aside className="flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo section */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4 shrink-0">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.22) 0%, oklch(0.76 0.21 210 / 0.15) 100%)",
            boxShadow: "0 2px 8px oklch(0.72 0.19 220 / 0.15)",
          }}
        >
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-sm font-bold text-sidebar-foreground tracking-tight leading-tight">
            TradeSignal
          </p>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Pro Platform
          </p>
        </div>
      </div>

      {/* Nav label */}
      <div className="px-5 pt-4 pb-1">
        <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest">
          Navigation
        </p>
      </div>

      {/* Nav items */}
      <nav
        className="flex-1 space-y-0.5 px-3 pb-4 overflow-y-auto scrollbar-thin"
        aria-label="Main navigation"
      >
        {navItems.map(({ label, href, icon: Icon }, index) => {
          const isActive =
            currentPath === href || currentPath.startsWith(`${href}/`);
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
              data-ocid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
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

      {/* Subscription status pill */}
      {isVerified && (
        <div
          className="mx-3 mb-3 rounded-lg border border-success/20 px-3 py-2 flex items-center gap-2"
          style={{ background: "oklch(0.65 0.25 142 / 0.08)" }}
        >
          <Zap className="h-3.5 w-3.5 text-success shrink-0" />
          <span className="text-xs font-semibold text-success">
            Active Plan
          </span>
        </div>
      )}

      {/* User footer */}
      <div className="border-t border-sidebar-border p-3 space-y-1 shrink-0">
        <Link
          to="/profile"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-sidebar-accent transition-smooth group"
          data-ocid="nav-user-profile"
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={displayName}
                className="w-9 h-9 rounded-full object-cover border-2 border-border"
              />
            ) : (
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center border border-primary/20"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.2) 0%, oklch(0.76 0.21 210 / 0.12) 100%)",
                }}
              >
                <span className="font-display font-bold text-xs text-primary">
                  {initials}
                </span>
              </div>
            )}
            {isVerified && (
              <div
                className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center border border-background"
                style={{ background: "oklch(0.62 0.22 22)" }}
              >
                <BadgeCheck className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">
                {displayName}
              </p>
              {isVerified && (
                <BadgeCheck className="w-3.5 h-3.5 text-destructive shrink-0" />
              )}
              <GoldenTickBadge show={hasCertificate} size="sm" />
            </div>
            <p className="text-xs text-muted-foreground truncate leading-tight">
              {currentSession?.email ?? "View profile"}
            </p>
          </div>
        </Link>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent h-9 px-3 text-xs font-medium"
          onClick={handleLogout}
          data-ocid="nav-logout"
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
          aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
          data-ocid="sidebar-toggle"
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
              aria-label="Close sidebar"
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
