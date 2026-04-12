import { SignalType, TradeStatus } from "@/backend";
import { GoldenTickBadge } from "@/components/GoldenTickBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useBackend } from "@/hooks/useBackend";
import { useCertificateStatus } from "@/hooks/useCertificateStatus";
import {
  useSubscription,
  useSubscriptionStatus,
} from "@/hooks/useSubscription";
import type { Signal } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Clock,
  CreditCard,
  Image as ImageIcon,
  Lock,
  RefreshCw,
  Search,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// ---- Countdown ----
function useCountdown(expiresAtNs: bigint) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, Number(expiresAtNs / 1_000_000n) - Date.now()),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, Number(expiresAtNs / 1_000_000n) - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [expiresAtNs]);

  const totalSecs = Math.floor(remaining / 1000);
  return {
    h: Math.floor(totalSecs / 3600),
    m: Math.floor((totalSecs % 3600) / 60),
    s: totalSecs % 60,
    expired: remaining === 0,
    totalSecs,
  };
}

// ---- Subscription Card ----
function SubscriptionCard({
  expiresAt,
  isActive,
}: { expiresAt: bigint; isActive: boolean }) {
  const { h, m, s, expired, totalSecs } = useCountdown(expiresAt);
  const active = isActive && !expired;
  const pad = (n: number) => String(n).padStart(2, "0");

  const isWarning = totalSecs <= 1800 && totalSecs > 300;
  const isCritical = totalSecs <= 300 && totalSecs > 0;

  const timerColorClass = isCritical
    ? "timer-critical"
    : isWarning
      ? "timer-warning"
      : "text-primary";

  const separatorClass = isCritical
    ? "timer-critical"
    : isWarning
      ? "timer-warning"
      : "text-primary";

  return (
    <div className="card-premium h-full relative overflow-hidden">
      {active && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none rounded-xl" />
      )}
      <div className="relative flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="stat-icon-bg"
            style={{
              background: active
                ? "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.25) 0%, oklch(0.76 0.21 210 / 0.18) 100%)"
                : "linear-gradient(135deg, oklch(0.53 0.02 260 / 0.15) 0%, oklch(0.53 0.02 260 / 0.1) 100%)",
            }}
          >
            <Clock
              className={`w-5 h-5 ${active ? "text-primary" : "text-muted-foreground"}`}
            />
          </div>
          <div>
            <p className="stat-label text-xs">Subscription Timer</p>
            <p className="font-display font-semibold text-sm text-foreground">
              Plan:{" "}
              <span
                className={active ? "text-emerald-400" : "text-destructive"}
              >
                {active ? "Active" : "Expired"}
              </span>
            </p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
            active
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 animate-pulse"
              : "bg-destructive/10 border-destructive/30 text-destructive"
          }`}
          data-ocid="subscription-badge"
        >
          {active && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
          )}
          {active ? "Premium" : "Expired"}
        </span>
      </div>

      {active ? (
        <div className="relative">
          <div className="flex items-center gap-1 mb-3">
            {[
              { val: pad(h), label: "HRS" },
              { val: pad(m), label: "MIN" },
              { val: pad(s), label: "SEC" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-1">
                <div
                  className={`rounded-xl border px-3 py-2.5 min-w-[62px] text-center transition-all duration-300 ${
                    isCritical
                      ? "bg-destructive/10 border-destructive/30"
                      : isWarning
                        ? "bg-warning/10 border-warning/30"
                        : "bg-primary/10 border-primary/20"
                  }`}
                >
                  <span
                    className={`timer-digit text-3xl ${timerColorClass}`}
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {item.val}
                  </span>
                  <p className="text-[9px] text-muted-foreground tracking-widest font-mono mt-0.5">
                    {item.label}
                  </p>
                </div>
                {i < 2 && (
                  <span
                    className={`font-bold text-2xl leading-none px-0.5 ${separatorClass}`}
                  >
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
          {(isWarning || isCritical) && (
            <p
              className={`text-xs font-medium flex items-center gap-1.5 ${isCritical ? "timer-critical" : "timer-warning"}`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              {isCritical
                ? "Critical: Subscription expiring very soon!"
                : "Time runs low, take action."}
            </p>
          )}
          {!isWarning && !isCritical && (
            <p className="text-xs text-muted-foreground font-mono">
              Time Remaining: {pad(h)}H {pad(m)}M {pad(s)}S
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Your subscription has expired. Renew to access live signals.
          </p>
          <Button
            size="sm"
            className="self-start gap-1.5 h-8"
            onClick={() => {
              window.location.href = "/payment";
            }}
            data-ocid="renew-inline-btn"
          >
            <Zap className="w-3.5 h-3.5" />
            Renew Now
          </Button>
        </div>
      )}
    </div>
  );
}

// ---- Trade Stats Row ----
interface TradeStats {
  totalTrades: number;
  successCount: number;
  failedCount: number;
  winRate: string;
}

type StatAccent = "indigo" | "success" | "destructive" | "cyan";

function TradeStatCard({
  label,
  value,
  icon: Icon,
  accent,
  stagger,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  accent: StatAccent;
  stagger: 1 | 2 | 3 | 4;
}) {
  const accentStyles: Record<
    StatAccent,
    { iconGrad: string; textColor: string; borderColor: string }
  > = {
    indigo: {
      iconGrad:
        "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.25) 0%, oklch(0.72 0.19 220 / 0.12) 100%)",
      textColor: "text-primary",
      borderColor: "border-l-primary",
    },
    success: {
      iconGrad:
        "linear-gradient(135deg, oklch(0.65 0.25 142 / 0.25) 0%, oklch(0.65 0.25 142 / 0.12) 100%)",
      textColor: "text-emerald-400",
      borderColor: "border-l-emerald-500",
    },
    destructive: {
      iconGrad:
        "linear-gradient(135deg, oklch(0.62 0.22 22 / 0.25) 0%, oklch(0.62 0.22 22 / 0.12) 100%)",
      textColor: "text-rose-400",
      borderColor: "border-l-rose-500",
    },
    cyan: {
      iconGrad:
        "linear-gradient(135deg, oklch(0.76 0.21 210 / 0.25) 0%, oklch(0.76 0.21 210 / 0.12) 100%)",
      textColor: "text-accent",
      borderColor: "border-l-accent",
    },
  };

  const style = accentStyles[accent];
  const staggerClass = `stagger-${stagger}`;

  return (
    <div
      className={`stat-card-accent border-l-4 ${style.borderColor} ${staggerClass} animate-slide-in`}
      data-ocid="trade-stat-card"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="stat-icon-bg w-11 h-11"
          style={{ background: style.iconGrad }}
        >
          <Icon className={`w-5 h-5 ${style.textColor}`} />
        </div>
        <span className={`text-xs font-mono opacity-40 ${style.textColor}`}>
          ↗
        </span>
      </div>
      <p className={`stat-value text-3xl ${style.textColor} tabular-nums`}>
        {value}
      </p>
      <p className="stat-label text-xs mt-1">{label}</p>
    </div>
  );
}

// ---- Trade Status Badge ----
function TradeStatusBadge({ status }: { status: TradeStatus }) {
  if (status === TradeStatus.success) {
    return <span className="badge-success">SUCCESS</span>;
  }
  if (status === TradeStatus.failed) {
    return <span className="badge-failed">FAILED</span>;
  }
  return <span className="badge-pending">PENDING</span>;
}

// ---- Screenshot Thumbnail + Modal ----
function ScreenshotThumb({
  screenshotKey,
  pair,
  signal,
}: { screenshotKey: string; pair: string; signal: Signal }) {
  const [open, setOpen] = useState(false);
  const imgUrl = screenshotKey.startsWith("http") ? screenshotKey : undefined;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View screenshot for ${pair}`}
        className="inline-flex items-center gap-1 ml-1.5 opacity-70 hover:opacity-100 transition-smooth group"
        data-ocid="screenshot-thumb-btn"
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={`${pair} screenshot`}
            className="w-8 h-8 rounded-md object-cover border border-border ring-1 ring-primary/20 group-hover:ring-primary/60 group-hover:scale-110 transition-smooth shadow-sm"
          />
        ) : (
          <span className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
            <ImageIcon className="w-3.5 h-3.5 text-primary" />
          </span>
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl card-modal p-0 overflow-hidden border-border/60">
          <DialogHeader className="px-6 pt-5 pb-4 border-b border-border/60 bg-gradient-to-r from-card to-muted/20">
            <div className="flex items-center justify-between">
              <DialogTitle className="font-display font-semibold text-foreground flex items-center gap-2.5">
                <div className="stat-icon-bg w-8 h-8 shrink-0">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                {pair} Signal Details
              </DialogTitle>
            </div>
          </DialogHeader>
          <div className="p-5 space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Entry",
                  value: signal.entryPrice.toFixed(4),
                  color: "text-foreground",
                },
                {
                  label: "Stop Loss",
                  value: signal.stopLoss.toFixed(4),
                  color: "text-rose-400",
                },
                {
                  label: "Take Profit",
                  value: signal.takeProfit.toFixed(4),
                  color: "text-emerald-400",
                },
                {
                  label: "Confidence",
                  value: `${signal.confidence}%`,
                  color: "text-primary",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-muted/30 border border-border rounded-lg p-3 text-center"
                >
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p
                    className={`font-mono font-bold text-base tabular-nums ${item.color}`}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge
                variant={signal.signalType === SignalType.buy ? "buy" : "sell"}
              >
                {signal.signalType === SignalType.buy ? "BUY" : "SELL"}
              </StatusBadge>
              <TradeStatusBadge status={signal.tradeStatus} />
            </div>
            {imgUrl ? (
              <img
                src={imgUrl}
                alt={`${pair} full screenshot`}
                className="w-full rounded-xl object-contain max-h-[55vh] border border-border shadow-elevated"
              />
            ) : (
              <div className="empty-state py-10 text-muted-foreground">
                <div className="empty-state-icon mx-auto mb-3">
                  <ImageIcon className="w-7 h-7" />
                </div>
                <p className="text-sm">Screenshot preview unavailable</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ---- Confidence Bar ----
function ConfidenceBar({ value }: { value: number }) {
  const color =
    value >= 90
      ? "bg-emerald-500"
      : value >= 75
        ? "bg-primary"
        : "bg-amber-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden min-w-[48px]">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-mono text-foreground tabular-nums w-9 text-right">
        {value}%
      </span>
    </div>
  );
}

// ---- Sort Icon ----
type SortDir = "asc" | "desc" | "none";
function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active || dir === "none")
    return <ChevronsUpDown className="w-3 h-3 text-muted-foreground ml-1" />;
  return dir === "asc" ? (
    <ChevronUp className="w-3 h-3 text-primary ml-1" />
  ) : (
    <ChevronDown className="w-3 h-3 text-primary ml-1" />
  );
}

// ---- Subscribe CTA Banner ----
function SubscribeCTABanner() {
  const navigate = useNavigate();
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-primary/30 mb-0"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.04 265 / 0.95) 0%, oklch(0.22 0.06 260 / 0.95) 50%, oklch(0.16 0.05 270 / 0.95) 100%)",
      }}
      data-ocid="subscribe-cta-banner"
    >
      {/* Subtle shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 px-5 py-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.22 65 / 0.25) 0%, oklch(0.72 0.22 65 / 0.12) 100%)",
              border: "1px solid oklch(0.72 0.22 65 / 0.35)",
            }}
          >
            <Lock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground leading-snug">
              You are viewing past successful trades only.
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Subscribe to access all live signals with entry, SL &amp; TP in
              real time.
            </p>
          </div>
        </div>
        <Button
          className="shrink-0 gap-2 h-9 px-5 font-semibold text-sm shadow-elevated"
          onClick={() => navigate({ to: "/payment" })}
          data-ocid="subscribe-cta-btn"
        >
          <Zap className="w-3.5 h-3.5" />
          Subscribe Now
        </Button>
      </div>
    </div>
  );
}

// ---- Signals Table ----
type SortKey = "pair" | "confidence" | "timestamp";

function SignalsTable({
  signals,
  isPublicView,
}: { signals: Signal[]; isPublicView?: boolean }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({
    key: "timestamp",
    dir: "desc",
  });

  function toggleSort(key: SortKey) {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      if (prev.dir === "desc") return { key, dir: "none" };
      return { key, dir: "asc" };
    });
  }

  const filtered = useMemo(() => {
    let list = signals.filter((s) =>
      s.pair.toLowerCase().includes(search.toLowerCase()),
    );
    if (sort.dir !== "none") {
      list = [...list].sort((a, b) => {
        let cmp = 0;
        if (sort.key === "pair") cmp = a.pair.localeCompare(b.pair);
        else if (sort.key === "confidence")
          cmp = Number(a.confidence) - Number(b.confidence);
        else cmp = Number(a.timestamp) - Number(b.timestamp);
        return sort.dir === "asc" ? cmp : -cmp;
      });
    }
    return list;
  }, [signals, search, sort]);

  function formatTs(ns: bigint) {
    return new Date(Number(ns / 1_000_000n)).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  const cols: {
    key: SortKey | "signal" | "entry" | "stopLoss" | "takeProfit" | "status";
    label: string;
    sortable?: boolean;
  }[] = [
    { key: "pair", label: "Pair", sortable: true },
    { key: "signal", label: "Signal", sortable: false },
    { key: "entry", label: "Entry", sortable: false },
    { key: "stopLoss", label: "SL", sortable: false },
    { key: "takeProfit", label: "TP", sortable: false },
    { key: "confidence", label: "Confidence", sortable: true },
    { key: "status", label: "Status", sortable: false },
    { key: "timestamp", label: "Timestamp", sortable: true },
  ];

  return (
    <div className="card-premium p-0 overflow-hidden">
      {/* CTA banner for public view — sticky above table */}
      {isPublicView && <SubscribeCTABanner />}

      {/* Table header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-border bg-gradient-to-r from-muted/20 to-transparent">
        <div>
          <h2 className="text-heading-3 flex items-center gap-2.5">
            <div className="stat-icon-bg w-8 h-8 shrink-0">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            {isPublicView ? "Successful Trades" : "Trading Signals"}
            <span className="text-xs bg-primary/15 border border-primary/25 text-primary px-2 py-0.5 rounded-full font-mono">
              {filtered.length}
            </span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5 ml-10">
            {isPublicView
              ? "Past verified successful trades — subscribe for live signals"
              : "Live signals with entry, SL & TP"}
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search pair..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm input-premium"
            data-ocid="signals-search-input"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {cols.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none ${col.sortable ? "cursor-pointer hover:text-foreground transition-colors" : ""}`}
                  onClick={
                    col.sortable
                      ? () => toggleSort(col.key as SortKey)
                      : undefined
                  }
                  onKeyDown={
                    col.sortable
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ")
                            toggleSort(col.key as SortKey);
                        }
                      : undefined
                  }
                  tabIndex={col.sortable ? 0 : undefined}
                  role={col.sortable ? "button" : undefined}
                >
                  <span className="inline-flex items-center">
                    {col.label}
                    {col.sortable && (
                      <SortIcon active={sort.key === col.key} dir={sort.dir} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <div className="empty-state py-16">
                    <div className="empty-state-icon mx-auto">
                      <TrendingUp className="w-8 h-8" />
                    </div>
                    <p className="font-semibold text-foreground mb-1">
                      {search ? "No matching signals" : "No signals yet"}
                    </p>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      {search
                        ? "Try a different search term."
                        : "New signals will appear here as they are added."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((signal) => {
                const isBuy = signal.signalType === SignalType.buy;
                return (
                  <tr
                    key={String(signal.id)}
                    className="signal-row border-b border-border last:border-b-0 hover:bg-primary/5 transition-smooth group"
                    data-ocid="signal-row"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-0.5">
                        <span className="font-mono font-semibold text-foreground group-hover:text-primary transition-smooth">
                          {signal.pair}
                        </span>
                        {signal.screenshotKey && (
                          <ScreenshotThumb
                            screenshotKey={signal.screenshotKey}
                            pair={signal.pair}
                            signal={signal}
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge variant={isBuy ? "buy" : "sell"}>
                        {isBuy ? "BUY" : "SELL"}
                      </StatusBadge>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-foreground tabular-nums text-sm">
                      {signal.entryPrice.toFixed(4)}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-rose-400 tabular-nums text-sm">
                      {signal.stopLoss.toFixed(4)}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-emerald-400 tabular-nums text-sm">
                      {signal.takeProfit.toFixed(4)}
                    </td>
                    <td className="px-4 py-3.5 w-40">
                      <ConfidenceBar value={Number(signal.confidence)} />
                    </td>
                    <td className="px-4 py-3.5">
                      <TradeStatusBadge status={signal.tradeStatus} />
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground whitespace-nowrap font-mono">
                      {formatTs(signal.timestamp)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden divide-y divide-border">
        {filtered.length === 0 ? (
          <div className="empty-state py-12">
            <div className="empty-state-icon mx-auto mb-3">
              <TrendingUp className="w-8 h-8" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">
              {search ? "No matching signals" : "No signals yet"}
            </p>
            <p className="text-xs text-muted-foreground">
              {search
                ? "Try a different search term."
                : "New signals will appear here."}
            </p>
          </div>
        ) : (
          filtered.map((signal) => {
            const isBuy = signal.signalType === SignalType.buy;
            return (
              <div
                key={String(signal.id)}
                className="p-4 space-y-3 hover:bg-muted/10 transition-smooth"
                data-ocid="signal-row-mobile"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-semibold text-foreground">
                      {signal.pair}
                    </span>
                    {signal.screenshotKey && (
                      <ScreenshotThumb
                        screenshotKey={signal.screenshotKey}
                        pair={signal.pair}
                        signal={signal}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <StatusBadge variant={isBuy ? "buy" : "sell"}>
                      {isBuy ? "BUY" : "SELL"}
                    </StatusBadge>
                    <TradeStatusBadge status={signal.tradeStatus} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs bg-muted/20 rounded-lg p-3">
                  <div>
                    <p className="text-muted-foreground mb-0.5 uppercase tracking-wide text-[10px]">
                      Entry
                    </p>
                    <p className="font-mono text-foreground tabular-nums font-medium">
                      {signal.entryPrice.toFixed(4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5 uppercase tracking-wide text-[10px]">
                      Stop Loss
                    </p>
                    <p className="font-mono text-rose-400 tabular-nums font-medium">
                      {signal.stopLoss.toFixed(4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5 uppercase tracking-wide text-[10px]">
                      Take Profit
                    </p>
                    <p className="font-mono text-emerald-400 tabular-nums font-medium">
                      {signal.takeProfit.toFixed(4)}
                    </p>
                  </div>
                </div>
                <ConfidenceBar value={Number(signal.confidence)} />
                <p className="text-xs text-muted-foreground font-mono">
                  {formatTs(signal.timestamp)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ---- Expired CTA ----
function ExpiredState() {
  const navigate = useNavigate();
  return (
    <div
      className="card-premium text-center py-16 relative overflow-hidden"
      data-ocid="expired-state"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5 pointer-events-none rounded-xl" />
      <div className="relative">
        <div
          className="empty-state-icon mx-auto mb-5 w-20 h-20"
          style={{
            background: "oklch(0.72 0.22 68 / 0.15)",
            border: "1px solid oklch(0.72 0.22 68 / 0.3)",
          }}
        >
          <AlertTriangle className="w-10 h-10 text-amber-400" />
        </div>
        <h3 className="text-heading-2 mb-3">Subscription Required</h3>
        <p className="text-muted-foreground mb-2 max-w-sm mx-auto">
          Your subscription has expired. Renew for{" "}
          <strong className="text-foreground">₹1/day</strong> to access live
          trading signals with entry, SL &amp; TP levels.
        </p>
        <p className="text-xs text-muted-foreground mb-8 max-w-xs mx-auto">
          Pay via UPI → Upload screenshot → Admin approves → Signals unlocked
          instantly
        </p>
        <Button
          className="gap-2 h-12 px-10 font-semibold text-base shadow-elevated hover:shadow-premium transition-smooth"
          onClick={() => navigate({ to: "/payment" })}
          data-ocid="pay-now-btn"
        >
          <CreditCard className="w-5 h-5" />
          Pay Now — ₹1/day
        </Button>
      </div>
    </div>
  );
}

// ---- Dashboard Skeleton ----
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((k) => (
          <div key={k} className="card-premium p-5 space-y-3">
            <div className="skeleton w-11 h-11 rounded-lg" />
            <div className="skeleton h-8 w-20 rounded" />
            <div className="skeleton h-3 w-16 rounded" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="card-premium p-5 space-y-4">
            <div className="skeleton h-4 w-32 rounded" />
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="skeleton h-20 w-20 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
        <div className="card-premium p-5 space-y-3">
          <div className="skeleton h-4 w-24 rounded" />
          <div className="skeleton h-10 w-16 rounded" />
        </div>
      </div>
      <div className="card-premium p-0">
        <div className="p-5 space-y-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-12 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Main ----
export default function Dashboard() {
  const {
    data: subscription,
    isLoading: subLoading,
    refetch: refetchSub,
  } = useSubscription();
  const {
    data: isActive,
    isLoading: statusLoading,
    refetch: refetchStatus,
  } = useSubscriptionStatus();
  const { actor, isReady } = useBackend();
  const { hasCertificate } = useCertificateStatus();

  // Subscribed users: fetch all signals
  const { data: signals, isLoading: signalsLoading } = useQuery<Signal[]>({
    queryKey: ["signals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSignals();
    },
    enabled: isReady && !!isActive,
    refetchInterval: 60_000,
  });

  // Non-subscribed users: fetch public success signals (no auth required)
  const { data: publicSignals, isLoading: publicSignalsLoading } = useQuery<
    Signal[]
  >({
    queryKey: ["public-success-signals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPublicSuccessSignals();
    },
    // Run whenever actor is ready AND user is NOT subscribed
    enabled: isReady && isActive === false,
    refetchInterval: 120_000,
  });

  function handleRefresh() {
    refetchSub();
    refetchStatus();
  }

  const loading = subLoading || statusLoading;
  const allSignals = signals ?? [];
  const activeSignals = allSignals.filter((s) => s.isActive);

  const tradeStats = useMemo<TradeStats>(() => {
    const totalTrades = activeSignals.length;
    const successCount = activeSignals.filter(
      (s) => s.tradeStatus === TradeStatus.success,
    ).length;
    const failedCount = activeSignals.filter(
      (s) => s.tradeStatus === TradeStatus.failed,
    ).length;
    const completed = successCount + failedCount;
    const winRate =
      completed > 0
        ? `${((successCount / completed) * 100).toFixed(1)}%`
        : "--";
    return { totalTrades, successCount, failedCount, winRate };
  }, [activeSignals]);

  const avgConf = activeSignals.length
    ? Math.round(
        activeSignals.reduce((acc, s) => acc + Number(s.confidence), 0) /
          activeSignals.length,
      )
    : 0;

  const winRateAccent: StatAccent =
    tradeStats.winRate === "--"
      ? "cyan"
      : Number.parseFloat(tradeStats.winRate) >= 60
        ? "success"
        : "destructive";

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-heading-1 flex items-center gap-2.5">
            <Sparkles className="w-7 h-7 text-primary" />
            Dashboard
            <GoldenTickBadge show={hasCertificate} size="md" />
          </h1>
          <p className="text-sm text-muted-foreground mt-1 ml-9.5">
            Monitor your trading signals and subscription status
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 h-9 border-border/60 hover:border-primary/40 transition-smooth"
          onClick={handleRefresh}
          disabled={loading}
          data-ocid="dashboard-refresh-btn"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {loading ? (
        <DashboardSkeleton />
      ) : (
        <>
          {/* Trade Stats Row — only for active subscribers */}
          {isActive && (
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-3"
              data-ocid="trade-stats-row"
            >
              <TradeStatCard
                label="Total Trades"
                value={tradeStats.totalTrades}
                icon={Activity}
                accent="indigo"
                stagger={1}
              />
              <TradeStatCard
                label="Successful"
                value={tradeStats.successCount}
                icon={Trophy}
                accent="success"
                stagger={2}
              />
              <TradeStatCard
                label="Failed Trades"
                value={tradeStats.failedCount}
                icon={XCircle}
                accent="destructive"
                stagger={3}
              />
              <TradeStatCard
                label="Win Rate"
                value={tradeStats.winRate}
                icon={Target}
                accent={winRateAccent}
                stagger={4}
              />
            </div>
          )}

          {/* Subscription + Avg Confidence */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              {subscription ? (
                <SubscriptionCard
                  expiresAt={subscription.expiresAt}
                  isActive={subscription.isActive && !!isActive}
                />
              ) : (
                <div className="card-premium flex items-center gap-4 h-full">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-display font-semibold text-foreground">
                      No active subscription
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Subscribe for ₹1/day to access live trading signals
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="shrink-0 gap-1.5"
                    onClick={() => {
                      window.location.href = "/payment";
                    }}
                    data-ocid="get-started-btn"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Get Started
                  </Button>
                </div>
              )}
            </div>

            <div className="stat-card-accent border-l-accent border-l-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <p className="stat-label text-xs">Avg Confidence</p>
                <div
                  className="stat-icon-bg w-10 h-10"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, oklch(0.76 0.21 210 / 0.25) 0%, oklch(0.76 0.21 210 / 0.12) 100%)"
                      : "linear-gradient(135deg, oklch(0.53 0.02 260 / 0.15) 0%, oklch(0.53 0.02 260 / 0.1) 100%)",
                  }}
                >
                  {isActive ? (
                    <TrendingUp className="w-4 h-4 text-accent" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </div>
              <p className="stat-value text-3xl text-accent tabular-nums">
                {isActive ? `${avgConf}%` : "—"}
              </p>
              {isActive && avgConf > 0 && (
                <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${avgConf}%`,
                      background: "oklch(var(--accent))",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Signal table — subscribed full view, non-subscribed public success view */}
          {isActive ? (
            signalsLoading ? (
              <div className="card-premium p-5 space-y-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton h-14 rounded-lg" />
                ))}
              </div>
            ) : (
              <SignalsTable signals={activeSignals} />
            )
          ) : isActive === false ? (
            publicSignalsLoading ? (
              <div className="card-premium p-5 space-y-3">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="skeleton h-14 rounded-lg" />
                ))}
              </div>
            ) : (
              <SignalsTable signals={publicSignals ?? []} isPublicView />
            )
          ) : (
            <ExpiredState />
          )}
        </>
      )}
    </div>
  );
}
