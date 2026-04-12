import { e as createLucideIcon, a as useBackend, m as useQueryClient, v as useActivateSubscription, r as reactExports, h as useQuery, n as useMutation, C as CertificateStatus, j as jsxRuntimeExports, k as CreditCard, U as User, t as LoadingSpinner, c as ue } from "./index-BO-jy2EA.js";
import { L as Label } from "./label-CY9wZVTR.js";
import { S as Skeleton } from "./skeleton-CbFgKOIp.js";
import { T as Textarea } from "./textarea-OfLpp8wx.js";
import { M as Modal } from "./Modal-CO8JOfct.js";
import { S as StatusBadge } from "./StatusBadge-DdUp1dft.js";
import { C as CircleAlert } from "./circle-alert-D7xLFEHC.js";
import { E as Eye } from "./eye-CilXLqny.js";
import { C as CircleX } from "./circle-x-D6Yc5ibs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatDateShort(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function PaymentStatusBadge({ status }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    StatusBadge,
    {
      variant: status === CertificateStatus.pending ? "pending" : status === CertificateStatus.approved ? "approved" : "rejected",
      children: status
    }
  );
}
function AdminPayments() {
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();
  const activateSub = useActivateSubscription();
  const [viewPayment, setViewPayment] = reactExports.useState(null);
  const [rejectModal, setRejectModal] = reactExports.useState(null);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const { data: payments, isLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => actor ? actor.listAllPayments() : [],
    enabled: isReady
  });
  const approveMutation = useMutation({
    mutationFn: async (payment) => {
      if (!actor) throw new Error("Not ready");
      await actor.approvePayment(payment.id);
      await activateSub.mutateAsync(payment.userId.toText());
    },
    onSuccess: () => {
      ue.success("Payment approved & subscription activated");
      queryClient.invalidateQueries({ queryKey: ["admin-payments"] });
    },
    onError: () => ue.error("Failed to approve payment")
  });
  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason }) => {
      if (!actor) throw new Error("Not ready");
      return actor.rejectPayment(id, reason);
    },
    onSuccess: () => {
      ue.success("Payment rejected");
      setRejectModal(null);
      setRejectReason("");
      queryClient.invalidateQueries({ queryKey: ["admin-payments"] });
    },
    onError: () => ue.error("Failed to reject payment")
  });
  const pending = (payments == null ? void 0 : payments.filter((p) => p.status === CertificateStatus.pending)) ?? [];
  const others = (payments == null ? void 0 : payments.filter((p) => p.status !== CertificateStatus.pending)) ?? [];
  const sorted = [...pending, ...others];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-5xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-heading-2", children: "Payments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Review and approve user payment submissions" })
    ] }),
    !isLoading && pending.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start sm:items-center gap-3 px-4 py-3.5 rounded-xl border",
        style: {
          background: "oklch(var(--pending) / 0.07)",
          borderColor: "oklch(var(--pending) / 0.3)"
        },
        "data-ocid": "pending-payments-banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleAlert,
            {
              className: "h-5 w-5 shrink-0 mt-0.5 sm:mt-0",
              style: { color: "oklch(var(--pending))" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-sm font-semibold",
                style: { color: "oklch(var(--pending))" },
                children: [
                  pending.length,
                  " payment",
                  pending.length > 1 ? "s" : "",
                  " awaiting review"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Review and approve or reject the pending submissions below" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-0 overflow-hidden", children: [
      !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-2.5 text-label text-xs border-b border-border bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Sender / UTR" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: "Actions" })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }, k)) }) : !sorted.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", "data-ocid": "payments-empty", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No payments yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "Payment submissions will appear here for review" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/50", children: sorted.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "signal-row flex flex-wrap sm:flex-nowrap items-center gap-3 px-5 py-4",
          "data-ocid": `payment-row-${p.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-0.5", children: [
              p.senderName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5 text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: p.senderName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs text-muted-foreground", children: [
                "UTR: ",
                p.utrNumber
              ] }),
              p.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "text-xs font-mono mt-0.5",
                  style: { color: "oklch(var(--destructive))" },
                  children: [
                    "Reason: ",
                    p.rejectionReason
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-mono shrink-0 hidden sm:block", children: formatDateShort(p.timestamp) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentStatusBadge, { status: p.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-fast",
                  style: {
                    background: "oklch(var(--muted) / 0.5)",
                    color: "oklch(var(--foreground))",
                    border: "1px solid oklch(var(--border))"
                  },
                  onClick: () => setViewPayment(p),
                  "aria-label": "View details",
                  "data-ocid": `view-payment-${p.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }),
                    " View"
                  ]
                }
              ),
              p.status === CertificateStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-fast disabled:opacity-50",
                    style: {
                      background: "oklch(var(--success) / 0.12)",
                      color: "oklch(var(--success))",
                      border: "1px solid oklch(var(--success) / 0.3)"
                    },
                    onClick: () => approveMutation.mutate(p),
                    disabled: approveMutation.isPending,
                    "data-ocid": `approve-payment-${p.id}`,
                    children: [
                      approveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3.5 w-3.5" }),
                      "Approve"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-fast",
                    style: {
                      background: "oklch(var(--destructive) / 0.08)",
                      color: "oklch(var(--destructive))",
                      border: "1px solid oklch(var(--destructive) / 0.25)"
                    },
                    onClick: () => setRejectModal(p),
                    "data-ocid": `reject-payment-${p.id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
                      " Reject"
                    ]
                  }
                )
              ] }),
              p.status === CertificateStatus.approved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-fast disabled:opacity-50",
                  style: {
                    background: "oklch(var(--primary) / 0.1)",
                    color: "oklch(var(--primary))",
                    border: "1px solid oklch(var(--primary) / 0.25)"
                  },
                  onClick: () => activateSub.mutate(p.userId.toText()),
                  disabled: activateSub.isPending,
                  "data-ocid": `activate-sub-${p.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-3.5 w-3.5" }),
                    " Re-activate"
                  ]
                }
              )
            ] })
          ]
        },
        p.id.toString()
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: !!viewPayment,
        onClose: () => setViewPayment(null),
        title: "Payment Details",
        children: viewPayment && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden border border-border bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: viewPayment.screenshotBlob.getDirectURL(),
              alt: "Payment screenshot",
              className: "w-full max-h-72 object-contain"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden divide-y divide-border/50", children: [
            viewPayment.senderName && {
              label: "Sender Name",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-3.5 w-3.5" }),
              value: viewPayment.senderName
            },
            {
              label: "UTR Number",
              icon: null,
              value: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground text-xs", children: viewPayment.utrNumber })
            },
            {
              label: "Date",
              icon: null,
              value: formatDate(viewPayment.timestamp)
            },
            {
              label: "Status",
              icon: null,
              value: /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentStatusBadge, { status: viewPayment.status })
            },
            viewPayment.rejectionReason && {
              label: "Rejection Reason",
              icon: null,
              value: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(var(--destructive))" }, children: viewPayment.rejectionReason })
            }
          ].filter(Boolean).map((row) => {
            const r = row;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between gap-3 px-4 py-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                    r.icon,
                    r.label
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-semibold text-right", children: r.value })
                ]
              },
              r.label
            );
          }) }),
          viewPayment.status === CertificateStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "button-tertiary flex-1 h-10 text-sm border border-border",
                onClick: () => {
                  setRejectModal(viewPayment);
                  setViewPayment(null);
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleX,
                    {
                      className: "h-4 w-4 inline mr-1.5",
                      style: { color: "oklch(var(--destructive))" }
                    }
                  ),
                  "Reject"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "flex-1 h-10 text-sm flex items-center justify-center gap-2 rounded-lg font-semibold transition-fast disabled:opacity-50",
                style: {
                  background: "oklch(var(--success))",
                  color: "oklch(var(--success-foreground))"
                },
                disabled: approveMutation.isPending,
                onClick: () => {
                  approveMutation.mutate(viewPayment);
                  setViewPayment(null);
                },
                children: approveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" }),
                  " Approve"
                ] })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: !!rejectModal,
        onClose: () => {
          setRejectModal(null);
          setRejectReason("");
        },
        title: "Reject Payment",
        description: "Provide a reason so the user can resubmit correctly",
        children: rejectModal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reason", children: "Rejection reason" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "reason",
                placeholder: "e.g. UTR number doesn't match, screenshot unclear…",
                value: rejectReason,
                onChange: (e) => setRejectReason(e.target.value),
                rows: 3,
                className: "input-premium resize-none w-full",
                "data-ocid": "rejection-reason"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "button-tertiary flex-1 h-10 text-sm border border-border",
                onClick: () => {
                  setRejectModal(null);
                  setRejectReason("");
                },
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "flex-1 h-10 text-sm flex items-center justify-center gap-2 rounded-lg font-semibold transition-fast disabled:opacity-50",
                style: {
                  background: "oklch(var(--destructive))",
                  color: "oklch(var(--destructive-foreground))"
                },
                disabled: rejectMutation.isPending || !rejectReason.trim(),
                onClick: () => rejectMutation.mutate({
                  id: rejectModal.id,
                  reason: rejectReason
                }),
                "data-ocid": "confirm-reject-btn",
                children: rejectMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" }),
                  " Reject Payment"
                ] })
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminPayments as default
};
