import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Clock,
  CreditCard,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { ElementType } from "react";
import { SignalType, TradeStatus } from "../../backend";
import { StatusBadge as Badge } from "../../components/ui/StatusBadge";
import { useBackend } from "../../hooks/useBackend";
import { PaymentStatus } from "../../types";
import type { PaymentPublic, Signal } from "../../types";

type IconColor = "cyan" | "amber" | "indigo" | "green" | "red";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ElementType;
  description?: string;
  color?: IconColor;
  pulse?: boolean;
  delayClass?: string;
}

const colorMap: Record<
  IconColor,
  { bg: string; icon: string; border: string }
> = {
  cyan: {
    bg: "linear-gradient(135deg, oklch(0.76 0.21 210 / 0.18) 0%, oklch(0.72 0.19 220 / 0.12) 100%)",
    icon: "oklch(var(--accent))",
    border: "oklch(var(--accent) / 0.3)",
  },
  amber: {
    bg: "linear-gradient(135deg, oklch(var(--pending) / 0.18) 0%, oklch(var(--warning) / 0.1) 100%)",
    icon: "oklch(var(--pending))",
    border: "oklch(var(--pending) / 0.3)",
  },
  indigo: {
    bg: "linear-gradient(135deg, oklch(var(--primary) / 0.2) 0%, oklch(0.65 0.19 261 / 0.12) 100%)",
    icon: "oklch(var(--primary))",
    border: "oklch(var(--primary) / 0.3)",
  },
  green: {
    bg: "linear-gradient(135deg, oklch(var(--success) / 0.18) 0%, oklch(0.58 0.2 152 / 0.1) 100%)",
    icon: "oklch(var(--success))",
    border: "oklch(var(--success) / 0.3)",
  },
  red: {
    bg: "linear-gradient(135deg, oklch(var(--destructive) / 0.18) 0%, oklch(var(--destructive) / 0.08) 100%)",
    icon: "oklch(var(--destructive))",
    border: "oklch(var(--destructive) / 0.3)",
  },
};

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  color = "indigo",
  pulse,
  delayClass,
}: StatCardProps) {
  const c = colorMap[color];
  return (
    <div
      className={`stat-card gap-3 ${delayClass ?? ""}`}
      style={{ borderLeft: `3px solid ${c.border}` }}
    >
      <div className="flex items-center justify-between">
        <span className="stat-label">{title}</span>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ background: c.bg }}
        >
          <Icon
            className={`h-5 w-5 ${pulse ? "animate-pulse" : ""}`}
            style={{ color: c.icon }}
          />
        </div>
      </div>
      <div className="stat-value leading-none">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground leading-snug">
          {description}
        </p>
      )}
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="stat-card gap-3">
      <div className="flex items-center justify-between">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-10 w-10 rounded-lg" />
      </div>
      <div className="skeleton h-8 w-16 rounded" />
      <div className="skeleton h-3 w-32 rounded" />
    </div>
  );
}

export default function AdminOverview() {
  const { actor, isReady } = useBackend();

  const { data: signals, isLoading: signalsLoading } = useQuery<Signal[]>({
    queryKey: ["admin-signals"],
    queryFn: async () => (actor ? actor.listSignals() : []),
    enabled: isReady,
  });

  const { data: payments, isLoading: paymentsLoading } = useQuery<
    PaymentPublic[]
  >({
    queryKey: ["admin-payments"],
    queryFn: async () => (actor ? actor.listAllPayments() : []),
    enabled: isReady,
  });

  const activeSignals = signals?.filter((s) => s.isActive).length ?? 0;
  const pendingPayments =
    payments?.filter((p) => p.status === PaymentStatus.pending).length ?? 0;
  const totalPayments = payments?.length ?? 0;
  const approvedPayments =
    payments?.filter((p) => p.status === PaymentStatus.approved).length ?? 0;
  const successTrades =
    signals?.filter((s) => s.tradeStatus === TradeStatus.success).length ?? 0;
  const failedTrades =
    signals?.filter((s) => s.tradeStatus === TradeStatus.failed).length ?? 0;
  const resolvedTrades = successTrades + failedTrades;
  const winRate =
    resolvedTrades > 0 ? Math.round((successTrades / resolvedTrades) * 100) : 0;
  const recentPayments = payments?.slice(-5).reverse() ?? [];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-heading-2">Overview</h1>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold font-mono"
              style={{
                background: "oklch(var(--primary) / 0.12)",
                color: "oklch(var(--primary))",
                border: "1px solid oklch(var(--primary) / 0.25)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              ADMIN
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Platform summary and recent activity
          </p>
        </div>
        {pendingPayments > 0 && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg border"
            style={{
              background: "oklch(var(--pending) / 0.08)",
              borderColor: "oklch(var(--pending) / 0.3)",
            }}
          >
            <AlertCircle
              className="h-4 w-4"
              style={{ color: "oklch(var(--pending))" }}
            />
            <span
              className="text-sm font-semibold"
              style={{ color: "oklch(var(--pending))" }}
            >
              {pendingPayments} payment{pendingPayments > 1 ? "s" : ""} need
              review
            </span>
          </div>
        )}
      </div>

      {/* Stat row 1 — operational */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {signalsLoading || paymentsLoading ? (
          ["a", "b", "c", "d"].map((k) => <StatSkeleton key={k} />)
        ) : (
          <>
            <StatCard
              title="Active Signals"
              value={activeSignals}
              icon={Zap}
              description={`${signals?.length ?? 0} total published`}
              color="cyan"
              delayClass="stagger-1"
            />
            <StatCard
              title="Pending Reviews"
              value={pendingPayments}
              icon={Clock}
              description="Awaiting approval"
              color="amber"
              pulse={pendingPayments > 0}
              delayClass="stagger-2"
            />
            <StatCard
              title="Total Payments"
              value={totalPayments}
              icon={CreditCard}
              description="All time received"
              color="indigo"
              delayClass="stagger-3"
            />
            <StatCard
              title="Subscribers"
              value={approvedPayments}
              icon={Users}
              description="Approved members"
              color="green"
              delayClass="stagger-1"
            />
          </>
        )}
      </div>

      {/* Stat row 2 — trade performance */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {signalsLoading ? (
          ["a", "b", "c"].map((k) => <StatSkeleton key={k} />)
        ) : (
          <>
            <StatCard
              title="Success Trades"
              value={successTrades}
              icon={CheckCircle2}
              description={`${resolvedTrades} resolved total`}
              color="green"
              delayClass="stagger-1"
            />
            <StatCard
              title="Failed Trades"
              value={failedTrades}
              icon={TrendingDown}
              description="Closed as failed"
              color="red"
              delayClass="stagger-2"
            />
            <StatCard
              title="Win Rate"
              value={`${winRate}%`}
              icon={Award}
              description={
                resolvedTrades > 0
                  ? `Based on ${resolvedTrades} closed trades`
                  : "No closed trades yet"
              }
              color={winRate >= 60 ? "green" : winRate >= 40 ? "amber" : "red"}
              delayClass="stagger-3"
            />
          </>
        )}
      </div>

      {/* Recent payments */}
      <div className="card-premium p-0 overflow-hidden">
        <div className="border-b border-border px-5 py-4 flex items-center justify-between">
          <h2 className="text-heading-3">Recent Payments</h2>
          <div className="flex items-center gap-2">
            {pendingPayments > 0 && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-semibold animate-pulse"
                style={{
                  background: "oklch(var(--pending) / 0.12)",
                  color: "oklch(var(--pending))",
                  border: "1px solid oklch(var(--pending) / 0.3)",
                }}
              >
                {pendingPayments} pending
              </span>
            )}
            <span className="text-xs text-muted-foreground font-mono">
              {payments?.length ?? 0} total
            </span>
          </div>
        </div>

        {paymentsLoading ? (
          <div className="p-4 space-y-3">
            {["a", "b", "c"].map((k) => (
              <div key={k} className="skeleton h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : recentPayments.length === 0 ? (
          <div className="empty-state" data-ocid="payments-empty-overview">
            <div className="empty-state-icon">
              <CreditCard className="h-7 w-7" />
            </div>
            <p className="font-semibold text-foreground">No payments yet</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Payment submissions will appear here once users start paying
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {recentPayments.map((p, i) => (
              <div
                key={p.id.toString()}
                className={`signal-row flex items-center justify-between gap-3 px-5 py-3.5 stagger-${Math.min(i + 1, 3) as 1 | 2 | 3}`}
              >
                <div className="min-w-0">
                  {p.senderName && (
                    <div className="text-sm font-semibold text-foreground truncate">
                      {p.senderName}
                    </div>
                  )}
                  <div className="font-mono text-xs text-muted-foreground">
                    UTR: {p.utrNumber}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted-foreground font-mono hidden sm:block">
                    {new Date(
                      Number(p.timestamp) / 1_000_000,
                    ).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                  <Badge
                    variant={
                      p.status === PaymentStatus.pending
                        ? "pending"
                        : p.status === PaymentStatus.approved
                          ? "approved"
                          : "rejected"
                    }
                  >
                    {p.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent signals */}
      <div className="card-premium p-0 overflow-hidden">
        <div className="border-b border-border px-5 py-4 flex items-center justify-between">
          <h2 className="text-heading-3">Recent Signals</h2>
          <span className="text-xs text-muted-foreground font-mono">
            {signals?.length ?? 0} total
          </span>
        </div>

        {signalsLoading ? (
          <div className="p-4 space-y-3">
            {["a", "b", "c"].map((k) => (
              <div key={k} className="skeleton h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : !signals?.length ? (
          <div className="empty-state" data-ocid="signals-empty-overview">
            <div className="empty-state-icon">
              <TrendingUp className="h-7 w-7" />
            </div>
            <p className="font-semibold text-foreground">No signals yet</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Add your first trading signal to see it here
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/60">
            {signals
              .slice(-5)
              .reverse()
              .map((s, i) => {
                const isBuy = s.signalType === SignalType.buy;
                return (
                  <div
                    key={s.id.toString()}
                    className={`signal-row flex items-center justify-between gap-3 px-5 py-3.5 stagger-${Math.min(i + 1, 3) as 1 | 2 | 3}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          background: isBuy
                            ? "oklch(var(--success) / 0.12)"
                            : "oklch(var(--destructive) / 0.12)",
                        }}
                      >
                        {isBuy ? (
                          <TrendingUp
                            className="h-4 w-4"
                            style={{ color: "oklch(var(--success))" }}
                          />
                        ) : (
                          <TrendingDown
                            className="h-4 w-4"
                            style={{ color: "oklch(var(--destructive))" }}
                          />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-foreground text-sm">
                            {s.pair}
                          </span>
                          <span
                            className={
                              isBuy
                                ? "badge-buy text-xs py-0.5"
                                : "badge-sell text-xs py-0.5"
                            }
                          >
                            {isBuy ? "BUY" : "SELL"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex items-center gap-1">
                            <div
                              className="h-1.5 rounded-full overflow-hidden w-16"
                              style={{ background: "oklch(var(--muted))" }}
                            >
                              <div
                                className="h-full rounded-full transition-smooth"
                                style={{
                                  width: `${Number(s.confidence)}%`,
                                  background: "oklch(var(--accent))",
                                }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground font-mono">
                              {Number(s.confidence)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {s.tradeStatus === TradeStatus.success && (
                        <span className="badge-success text-xs py-0.5">
                          SUCCESS
                        </span>
                      )}
                      {s.tradeStatus === TradeStatus.failed && (
                        <span className="badge-failed text-xs py-0.5">
                          FAILED
                        </span>
                      )}
                      {s.tradeStatus === TradeStatus.pending && (
                        <span className="badge-pending text-xs py-0.5">
                          PENDING
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
