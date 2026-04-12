import { a as useBackend, h as useQuery, C as CertificateStatus, i as TradeStatus, j as jsxRuntimeExports, Z as Zap, k as CreditCard, A as Award, T as TrendingUp, l as SignalType } from "./index-BO-jy2EA.js";
import { S as StatusBadge } from "./StatusBadge-DdUp1dft.js";
import { C as CircleAlert } from "./circle-alert-D7xLFEHC.js";
import { C as Clock } from "./clock-BnWW5-NH.js";
import { U as Users } from "./users-_dInIF0Y.js";
import { C as CircleCheck } from "./circle-check-DHfkSuxj.js";
import { T as TrendingDown } from "./trending-down-1k8RkAqL.js";
const colorMap = {
  cyan: {
    bg: "linear-gradient(135deg, oklch(0.76 0.21 210 / 0.18) 0%, oklch(0.72 0.19 220 / 0.12) 100%)",
    icon: "oklch(var(--accent))",
    border: "oklch(var(--accent) / 0.3)"
  },
  amber: {
    bg: "linear-gradient(135deg, oklch(var(--pending) / 0.18) 0%, oklch(var(--warning) / 0.1) 100%)",
    icon: "oklch(var(--pending))",
    border: "oklch(var(--pending) / 0.3)"
  },
  indigo: {
    bg: "linear-gradient(135deg, oklch(var(--primary) / 0.2) 0%, oklch(0.65 0.19 261 / 0.12) 100%)",
    icon: "oklch(var(--primary))",
    border: "oklch(var(--primary) / 0.3)"
  },
  green: {
    bg: "linear-gradient(135deg, oklch(var(--success) / 0.18) 0%, oklch(0.58 0.2 152 / 0.1) 100%)",
    icon: "oklch(var(--success))",
    border: "oklch(var(--success) / 0.3)"
  },
  red: {
    bg: "linear-gradient(135deg, oklch(var(--destructive) / 0.18) 0%, oklch(var(--destructive) / 0.08) 100%)",
    icon: "oklch(var(--destructive))",
    border: "oklch(var(--destructive) / 0.3)"
  }
};
function StatCard({
  title,
  value,
  icon: Icon,
  description,
  color = "indigo",
  pulse,
  delayClass
}) {
  const c = colorMap[color];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `stat-card gap-3 ${delayClass ?? ""}`,
      style: { borderLeft: `3px solid ${c.border}` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex h-10 w-10 items-center justify-center rounded-lg",
              style: { background: c.bg },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Icon,
                {
                  className: `h-5 w-5 ${pulse ? "animate-pulse" : ""}`,
                  style: { color: c.icon }
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value leading-none", children: value }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-snug", children: description })
      ]
    }
  );
}
function StatSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-3 w-24 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-10 w-10 rounded-lg" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-8 w-16 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-3 w-32 rounded" })
  ] });
}
function AdminOverview() {
  const { actor, isReady } = useBackend();
  const { data: signals, isLoading: signalsLoading } = useQuery({
    queryKey: ["admin-signals"],
    queryFn: async () => actor ? actor.listSignals() : [],
    enabled: isReady
  });
  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => actor ? actor.listAllPayments() : [],
    enabled: isReady
  });
  const activeSignals = (signals == null ? void 0 : signals.filter((s) => s.isActive).length) ?? 0;
  const pendingPayments = (payments == null ? void 0 : payments.filter((p) => p.status === CertificateStatus.pending).length) ?? 0;
  const totalPayments = (payments == null ? void 0 : payments.length) ?? 0;
  const approvedPayments = (payments == null ? void 0 : payments.filter((p) => p.status === CertificateStatus.approved).length) ?? 0;
  const successTrades = (signals == null ? void 0 : signals.filter((s) => s.tradeStatus === TradeStatus.success).length) ?? 0;
  const failedTrades = (signals == null ? void 0 : signals.filter((s) => s.tradeStatus === TradeStatus.failed).length) ?? 0;
  const resolvedTrades = successTrades + failedTrades;
  const winRate = resolvedTrades > 0 ? Math.round(successTrades / resolvedTrades * 100) : 0;
  const recentPayments = (payments == null ? void 0 : payments.slice(-5).reverse()) ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-5xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-heading-2", children: "Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold font-mono",
              style: {
                background: "oklch(var(--primary) / 0.12)",
                color: "oklch(var(--primary))",
                border: "1px solid oklch(var(--primary) / 0.25)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }),
                "ADMIN"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Platform summary and recent activity" })
      ] }),
      pendingPayments > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2 px-3 py-2 rounded-lg border",
          style: {
            background: "oklch(var(--pending) / 0.08)",
            borderColor: "oklch(var(--pending) / 0.3)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CircleAlert,
              {
                className: "h-4 w-4",
                style: { color: "oklch(var(--pending))" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-sm font-semibold",
                style: { color: "oklch(var(--pending))" },
                children: [
                  pendingPayments,
                  " payment",
                  pendingPayments > 1 ? "s" : "",
                  " need review"
                ]
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: signalsLoading || paymentsLoading ? ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatSkeleton, {}, k)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Active Signals",
          value: activeSignals,
          icon: Zap,
          description: `${(signals == null ? void 0 : signals.length) ?? 0} total published`,
          color: "cyan",
          delayClass: "stagger-1"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Pending Reviews",
          value: pendingPayments,
          icon: Clock,
          description: "Awaiting approval",
          color: "amber",
          pulse: pendingPayments > 0,
          delayClass: "stagger-2"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Total Payments",
          value: totalPayments,
          icon: CreditCard,
          description: "All time received",
          color: "indigo",
          delayClass: "stagger-3"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Subscribers",
          value: approvedPayments,
          icon: Users,
          description: "Approved members",
          color: "green",
          delayClass: "stagger-1"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-4", children: signalsLoading ? ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatSkeleton, {}, k)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Success Trades",
          value: successTrades,
          icon: CircleCheck,
          description: `${resolvedTrades} resolved total`,
          color: "green",
          delayClass: "stagger-1"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Failed Trades",
          value: failedTrades,
          icon: TrendingDown,
          description: "Closed as failed",
          color: "red",
          delayClass: "stagger-2"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          title: "Win Rate",
          value: `${winRate}%`,
          icon: Award,
          description: resolvedTrades > 0 ? `Based on ${resolvedTrades} closed trades` : "No closed trades yet",
          color: winRate >= 60 ? "green" : winRate >= 40 ? "amber" : "red",
          delayClass: "stagger-3"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-5 py-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-heading-3", children: "Recent Payments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          pendingPayments > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-semibold animate-pulse",
              style: {
                background: "oklch(var(--pending) / 0.12)",
                color: "oklch(var(--pending))",
                border: "1px solid oklch(var(--pending) / 0.3)"
              },
              children: [
                pendingPayments,
                " pending"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
            (payments == null ? void 0 : payments.length) ?? 0,
            " total"
          ] })
        ] })
      ] }),
      paymentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-14 w-full rounded-lg" }, k)) }) : recentPayments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", "data-ocid": "payments-empty-overview", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No payments yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "Payment submissions will appear here once users start paying" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/60", children: recentPayments.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `signal-row flex items-center justify-between gap-3 px-5 py-3.5 stagger-${Math.min(i + 1, 3)}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              p.senderName && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground truncate", children: p.senderName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs text-muted-foreground", children: [
                "UTR: ",
                p.utrNumber
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono hidden sm:block", children: new Date(
                Number(p.timestamp) / 1e6
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatusBadge,
                {
                  variant: p.status === CertificateStatus.pending ? "pending" : p.status === CertificateStatus.approved ? "approved" : "rejected",
                  children: p.status
                }
              )
            ] })
          ]
        },
        p.id.toString()
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-5 py-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-heading-3", children: "Recent Signals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
          (signals == null ? void 0 : signals.length) ?? 0,
          " total"
        ] })
      ] }),
      signalsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-14 w-full rounded-lg" }, k)) }) : !(signals == null ? void 0 : signals.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", "data-ocid": "signals-empty-overview", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No signals yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "Add your first trading signal to see it here" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/60", children: signals.slice(-5).reverse().map((s, i) => {
        const isBuy = s.signalType === SignalType.buy;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `signal-row flex items-center justify-between gap-3 px-5 py-3.5 stagger-${Math.min(i + 1, 3)}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    style: {
                      background: isBuy ? "oklch(var(--success) / 0.12)" : "oklch(var(--destructive) / 0.12)"
                    },
                    children: isBuy ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TrendingUp,
                      {
                        className: "h-4 w-4",
                        style: { color: "oklch(var(--success))" }
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      TrendingDown,
                      {
                        className: "h-4 w-4",
                        style: { color: "oklch(var(--destructive))" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-sm", children: s.pair }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: isBuy ? "badge-buy text-xs py-0.5" : "badge-sell text-xs py-0.5",
                        children: isBuy ? "BUY" : "SELL"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-1.5 rounded-full overflow-hidden w-16",
                        style: { background: "oklch(var(--muted))" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "h-full rounded-full transition-smooth",
                            style: {
                              width: `${Number(s.confidence)}%`,
                              background: "oklch(var(--accent))"
                            }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
                      Number(s.confidence),
                      "%"
                    ] })
                  ] }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0", children: [
                s.tradeStatus === TradeStatus.success && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-success text-xs py-0.5", children: "SUCCESS" }),
                s.tradeStatus === TradeStatus.failed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-failed text-xs py-0.5", children: "FAILED" }),
                s.tradeStatus === TradeStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-pending text-xs py-0.5", children: "PENDING" })
              ] })
            ]
          },
          s.id.toString()
        );
      }) })
    ] })
  ] });
}
export {
  AdminOverview as default
};
