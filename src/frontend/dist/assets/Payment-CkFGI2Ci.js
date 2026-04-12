import { e as createLucideIcon, a as useBackend, r as reactExports, j as jsxRuntimeExports, Z as Zap, B as Button, U as User, c as ue, E as ExternalBlob, h as useQuery, m as useQueryClient, n as useMutation, C as CertificateStatus } from "./index-BO-jy2EA.js";
import { S as StatusBadge } from "./StatusBadge-DdUp1dft.js";
import { I as Input } from "./input-ChmVmaSS.js";
import { L as Label } from "./label-CY9wZVTR.js";
import { S as Skeleton } from "./skeleton-CbFgKOIp.js";
import { S as Shield } from "./shield-DXE4vu7A.js";
import { L as LoaderCircle } from "./loader-circle-D557w6Cq.js";
import { C as CircleAlert } from "./circle-alert-D7xLFEHC.js";
import { C as CircleCheck } from "./circle-check-DHfkSuxj.js";
import { H as Hash, S as Star, C as Copy } from "./star-DNH9mao7.js";
import { I as Image } from "./image-DVE4fG_F.js";
import { U as Upload } from "./upload-cBIh6lL1.js";
import { T as Target, A as Activity, a as Trophy } from "./trophy-CRr0hBxX.js";
import { U as Users } from "./users-_dInIF0Y.js";
import { Q as QrCode } from "./qr-code-3E-Ydgpo.js";
import { C as Clock } from "./clock-BnWW5-NH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = createLucideIcon("receipt", __iconNode);
function formatDate(ns) {
  return new Date(Number(ns / 1000000n)).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}
function hasPendingRecent(payments) {
  const FIVE_MIN_NS = BigInt(5 * 60 * 1e3 * 1e6);
  const nowNs = BigInt(Date.now()) * 1000000n;
  return payments.some(
    (p) => p.status === CertificateStatus.pending && nowNs - p.timestamp < FIVE_MIN_NS
  );
}
function useUpiConfig() {
  const { actor, isReady } = useBackend();
  return useQuery({
    queryKey: ["upi-config"],
    queryFn: async () => {
      if (!actor) throw new Error("Not ready");
      return actor.getUpiConfig();
    },
    enabled: isReady
  });
}
function useMyPayments() {
  const { actor, isReady, isRegistered } = useBackend();
  return useQuery({
    queryKey: ["my-payments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPayments();
    },
    enabled: isReady && isRegistered,
    refetchInterval: 3e4
  });
}
function useTradeStats() {
  const { actor, isReady } = useBackend();
  return useQuery({
    queryKey: ["trade-stats"],
    queryFn: async () => {
      if (!actor) throw new Error("Not ready");
      return actor.getTradeStats();
    },
    enabled: isReady,
    staleTime: 5 * 6e4
  });
}
function useActiveSubscriberCount() {
  const { actor, isReady } = useBackend();
  return useQuery({
    queryKey: ["active-subscriber-count"],
    queryFn: async () => {
      if (!actor) throw new Error("Not ready");
      return actor.getActiveSubscriberCount();
    },
    enabled: isReady,
    staleTime: 5 * 6e4
  });
}
function useSubmitPayment() {
  const { actor, ensureUserRole, isAnonymousPrincipal } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      blob,
      utr,
      senderName
    }) => {
      if (!actor) throw new Error("Backend not ready");
      if (isAnonymousPrincipal) {
        throw new Error(
          "ANONYMOUS_PRINCIPAL: Please connect your Internet Identity to submit payments."
        );
      }
      const registered = await ensureUserRole();
      if (!registered) {
        throw new Error(
          "ROLE_ASSIGN_FAILED: Unable to verify your account. Please refresh and try again."
        );
      }
      return await actor.submitPayment(blob, utr, senderName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-payments"] });
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      queryClient.invalidateQueries({ queryKey: ["subscription-status"] });
    }
  });
}
const DEFAULT_UPI_ID = "6203460064@ptsbi";
const DEFAULT_QR_URL = "/assets/qr-code.jpg";
function TrustStatSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl p-4 border border-border/40 bg-card/50 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-lg shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24 rounded" })
    ] })
  ] });
}
function TrustStatCard({
  icon: Icon,
  value,
  label,
  accent
}) {
  const styles = {
    green: {
      bg: "linear-gradient(135deg, oklch(0.65 0.25 142 / 0.18) 0%, oklch(0.65 0.25 142 / 0.08) 100%)",
      border: "border-emerald-500/25",
      text: "text-emerald-400",
      iconBg: "oklch(0.65 0.25 142 / 0.15)"
    },
    gold: {
      bg: "linear-gradient(135deg, oklch(0.72 0.22 68 / 0.18) 0%, oklch(0.72 0.22 68 / 0.08) 100%)",
      border: "border-amber-500/25",
      text: "text-amber-400",
      iconBg: "oklch(0.72 0.22 68 / 0.15)"
    },
    blue: {
      bg: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.18) 0%, oklch(0.72 0.19 220 / 0.08) 100%)",
      border: "border-primary/25",
      text: "text-primary",
      iconBg: "oklch(0.72 0.19 220 / 0.15)"
    }
  };
  const s = styles[accent];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `rounded-xl p-4 border ${s.border} flex items-center gap-3 flex-1 min-w-0`,
      style: { background: s.bg },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
            style: { background: s.iconBg },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${s.text}` })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display font-bold text-xl tabular-nums ${s.text}`, children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: label })
        ] })
      ]
    }
  );
}
function TrustStatsBar() {
  const { data: stats, isLoading: statsLoading } = useTradeStats();
  const { data: memberCount, isLoading: membersLoading } = useActiveSubscriberCount();
  const isLoading = statsLoading || membersLoading;
  const winRateStr = stats ? `${(stats.winRate * 100).toFixed(1)}%` : "--";
  const totalSignalsStr = stats ? String(Number(stats.totalSignals)) : "--";
  const memberCountStr = memberCount ? String(Number(memberCount)) : "--";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-5 border border-border/40 mb-6",
      style: {
        background: "linear-gradient(135deg, oklch(0.155 0.03 265 / 0.9) 0%, oklch(0.14 0.025 260 / 0.9) 100%)"
      },
      "data-ocid": "trust-stats-bar",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-amber-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-amber-400 uppercase tracking-widest", children: "Trusted by Traders" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrustStatSkeleton, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrustStatSkeleton, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrustStatSkeleton, {})
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrustStatCard,
            {
              icon: Target,
              value: winRateStr,
              label: "Win Rate",
              accent: "green"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrustStatCard,
            {
              icon: Users,
              value: memberCountStr,
              label: "Active Members",
              accent: "gold"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrustStatCard,
            {
              icon: Activity,
              value: totalSignalsStr,
              label: "Total Signals",
              accent: "blue"
            }
          )
        ] }) })
      ]
    }
  );
}
function StepIndicator({ step }) {
  const steps = [
    { num: 1, label: "Copy UPI ID", icon: QrCode },
    { num: 2, label: "Fill Form", icon: Receipt },
    { num: 3, label: "Submit", icon: Upload }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-5", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${s.num <= step ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground border border-border"}`,
          children: s.num < step ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }) : s.num
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-xs font-medium hidden sm:block ${s.num <= step ? "text-foreground" : "text-muted-foreground"}`,
          children: s.label
        }
      )
    ] }),
    i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `flex-1 h-px mx-2 ${s.num < step ? "bg-primary" : "bg-border"}`
      }
    )
  ] }, s.num)) });
}
function UpiCard({ config }) {
  var _a;
  const [copied, setCopied] = reactExports.useState(false);
  const qrUrl = config.qrCodeBlob ? config.qrCodeBlob.getDirectURL() : DEFAULT_QR_URL;
  const upiId = ((_a = config.upiId) == null ? void 0 : _a.trim()) ? config.upiId : DEFAULT_UPI_ID;
  function copyUpi() {
    navigator.clipboard.writeText(upiId).then(() => {
      setCopied(true);
      ue.success("UPI ID copied!");
      setTimeout(() => setCopied(false), 2500);
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-6 space-y-5 border border-border/50 relative overflow-hidden",
      style: {
        background: "linear-gradient(145deg, oklch(0.16 0.04 265 / 0.95) 0%, oklch(0.14 0.03 260 / 0.95) 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none rounded-2xl",
            style: {
              background: "linear-gradient(135deg, oklch(0.98 0 0 / 0.03) 0%, transparent 50%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "Pay via UPI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Scan QR code or copy the UPI ID below" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-4xl text-primary leading-none tabular-nums", children: "₹1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "per day" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-5 inline-block shadow-elevated relative",
            style: {
              background: "oklch(0.96 0 0)",
              border: "4px solid oklch(0.98 0 0 / 0.9)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: qrUrl,
                  alt: "UPI QR Code",
                  className: "w-52 h-52 object-contain rounded-xl",
                  "data-ocid": "upi-qr-image"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 -right-3 w-9 h-9 rounded-full bg-primary border-2 border-background flex items-center justify-center shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-4 h-4 text-primary-foreground" }) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `rounded-xl px-4 py-3.5 flex items-center justify-between gap-3 border transition-all duration-300 ${copied ? "border-emerald-500/40 bg-emerald-500/6" : "border-border/60 bg-muted/30"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-1", children: "UPI ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-mono text-sm font-bold text-foreground truncate",
                    "data-ocid": "upi-id-text",
                    children: upiId
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: `shrink-0 gap-1.5 h-9 min-w-[90px] transition-all duration-300 font-semibold ${copied ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10" : "hover:border-primary/50"}`,
                  onClick: copyUpi,
                  "data-ocid": "copy-upi-btn",
                  children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                    "Copied!"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                    "Copy"
                  ] })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-2.5 rounded-xl px-4 py-3 border border-amber-500/20",
            style: { background: "oklch(0.72 0.22 68 / 0.06)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-amber-400 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-400/90 leading-relaxed", children: [
                "Pay exactly ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "₹1" }),
                " and upload the payment screenshot with your UTR number for verification."
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 pt-1", children: [
          { icon: Shield, label: "Secure Payment" },
          { icon: Trophy, label: "24h Activation" },
          { icon: Star, label: "Admin Verified" }
        ].map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1.5 text-[11px] text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3 h-3 text-primary/60 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
            ]
          },
          label
        )) })
      ]
    }
  );
}
function FileDropZone({ file, onFile, progress, disabled }) {
  const inputRef = reactExports.useRef(null);
  const [drag, setDrag] = reactExports.useState(false);
  function handleDrop(e) {
    e.preventDefault();
    setDrag(false);
    if (disabled) return;
    const f = e.dataTransfer.files[0];
    if (!(f == null ? void 0 : f.type.startsWith("image/"))) {
      ue.error("Please upload an image file (JPG, PNG, etc.)");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      ue.error("Image too large. Please upload a screenshot under 5 MB.");
      return;
    }
    onFile(f);
  }
  function handleChange(e) {
    var _a;
    const f = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      ue.error("Image too large. Please upload a screenshot under 5 MB.");
      return;
    }
    onFile(f);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      disabled,
      className: `w-full border-2 border-dashed rounded-xl p-7 text-center transition-all duration-200 ${disabled ? "opacity-50 cursor-not-allowed border-border" : drag ? "border-primary bg-primary/8 cursor-copy shadow-inner" : file ? "border-emerald-500/50 bg-emerald-500/5 cursor-pointer" : "border-border hover:border-primary/50 hover:bg-primary/4 cursor-pointer"}`,
      onClick: () => {
        var _a;
        return !disabled && ((_a = inputRef.current) == null ? void 0 : _a.click());
      },
      onDragOver: (e) => {
        e.preventDefault();
        if (!disabled) setDrag(true);
      },
      onDragLeave: () => setDrag(false),
      onDrop: handleDrop,
      "data-ocid": "screenshot-dropzone",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: handleChange,
            disabled,
            "data-ocid": "screenshot-file-input"
          }
        ),
        file ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-6 h-6 text-emerald-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate max-w-full", children: file.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            (file.size / 1024).toFixed(1),
            " KB · Ready to upload"
          ] }),
          progress !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-muted rounded-full h-2 mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-primary h-2 rounded-full transition-all duration-300",
              style: { width: `${progress}%` }
            }
          ) }),
          !disabled && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary mt-1 font-medium", children: "Click to change image" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted/60 border border-border flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-6 h-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: drag ? "Drop screenshot here" : "Upload payment screenshot" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Drag & drop or click to browse · JPG, PNG, WEBP · max 5 MB" })
        ] })
      ]
    }
  );
}
function PaymentHistory({ payments }) {
  const variant = (s) => {
    if (s === CertificateStatus.approved) return "approved";
    if (s === CertificateStatus.rejected) return "rejected";
    return "pending";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center gap-3 bg-gradient-to-r from-muted/20 to-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "stat-icon-bg w-8 h-8 shrink-0",
          style: {
            background: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.2) 0%, oklch(0.72 0.19 220 / 0.1) 100%)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Payment History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your past payment submissions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 rounded-full font-mono ml-auto", children: [
        payments.length,
        " ",
        payments.length === 1 ? "entry" : "entries"
      ] })
    ] }),
    payments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state py-14", "data-ocid": "payments-empty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon mx-auto mb-4 w-16 h-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-8 h-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "No payments yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Submit your first payment above to activate your subscription." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: [
          { label: "Sender Name", width: "w-1/4" },
          { label: "UTR Number", width: "w-1/4" },
          { label: "Status", width: "w-1/4" },
          { label: "Date", width: "w-1/4" }
        ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: `px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider ${col.width}`,
            children: col.label
          },
          col.label
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: payments.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "signal-row border-b border-border last:border-b-0 hover:bg-primary/4",
            "data-ocid": "payment-row",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-foreground font-medium", children: p.senderName || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic text-xs", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 font-mono text-sm text-foreground", children: p.utrNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { variant: variant(p.status), children: p.status.toString().toUpperCase() }),
                p.status === CertificateStatus.rejected && p.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 italic", children: p.rejectionReason })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-xs text-muted-foreground whitespace-nowrap font-mono", children: formatDate(p.timestamp) })
            ]
          },
          String(p.id)
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden divide-y divide-border", children: payments.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-4 space-y-2.5 hover:bg-muted/10 transition-smooth",
          "data-ocid": "payment-row-mobile",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-foreground truncate font-medium", children: p.utrNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { variant: variant(p.status), children: p.status.toString().toUpperCase() })
            ] }),
            p.senderName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.senderName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: formatDate(p.timestamp) }),
            p.status === CertificateStatus.rejected && p.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-rose-400 italic", children: p.rejectionReason })
          ]
        },
        String(p.id)
      )) })
    ] })
  ] });
}
function Payment() {
  const { isReady, isAnonymousPrincipal, iiLoginStatus, loginWithII } = useBackend();
  const { data: upiConfig, isLoading: upiLoading } = useUpiConfig();
  const { data: payments = [], isLoading: paymentsLoading } = useMyPayments();
  const submitPayment = useSubmitPayment();
  const [utr, setUtr] = reactExports.useState("");
  const [utrError, setUtrError] = reactExports.useState("");
  const [utrTouched, setUtrTouched] = reactExports.useState(false);
  const [senderName, setSenderName] = reactExports.useState("");
  const [senderNameError, setSenderNameError] = reactExports.useState("");
  const [senderTouched, setSenderTouched] = reactExports.useState(false);
  const [file, setFile] = reactExports.useState(null);
  const [fileError, setFileError] = reactExports.useState("");
  const [uploadProgress, setUploadProgress] = reactExports.useState(null);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const pendingBlocked = hasPendingRecent(payments);
  const isLoggingIn = iiLoginStatus === "logging-in";
  const activeStep = submitted ? 3 : utr && senderName ? 2 : 1;
  function validateUtr(val) {
    if (!val) return "UTR number is required";
    if (val.length < 8) return "UTR must be at least 8 characters";
    if (!/^[A-Za-z0-9]+$/.test(val))
      return "UTR must only contain letters and numbers";
    return "";
  }
  function validateSenderName(val) {
    if (!val.trim()) return "Sender name is required";
    if (val.trim().length < 2) return "Enter the full name on your UPI account";
    return "";
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!isReady) {
      ue.error("Connecting to server, please wait a moment and try again.");
      return;
    }
    if (isAnonymousPrincipal) {
      ue.error("Please connect your Internet Identity first.", {
        description: "Click 'Connect with Internet Identity' to verify."
      });
      return;
    }
    const utrErr = validateUtr(utr);
    const nameErr = validateSenderName(senderName);
    if (utrErr) setUtrError(utrErr);
    if (nameErr) setSenderNameError(nameErr);
    if (utrErr || nameErr) return;
    if (!file) {
      setFileError("Please upload your payment screenshot");
      return;
    }
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setFileError(
        "Screenshot must be under 5 MB. Please choose a smaller image."
      );
      return;
    }
    if (pendingBlocked) return;
    try {
      setUploadProgress(0);
      let bytes;
      try {
        bytes = new Uint8Array(await file.arrayBuffer());
      } catch (readErr) {
        console.error("[Payment] Failed to read file:", readErr);
        setFileError("Failed to read the screenshot. Please try again.");
        setUploadProgress(null);
        return;
      }
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });
      await submitPayment.mutateAsync({
        blob,
        utr: utr.trim(),
        senderName: senderName.trim()
      });
      setSubmitted(true);
      setUtr("");
      setSenderName("");
      setFile(null);
      setUploadProgress(null);
      ue.success("Payment submitted!", {
        description: "Admin will review and activate your subscription."
      });
    } catch (err) {
      console.error("[Payment] Submit failed:", err);
      setUploadProgress(null);
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.startsWith("ROLE_ASSIGN_FAILED:")) {
        ue.error("Unable to verify your account.", {
          description: "Please refresh the page and try again."
        });
      } else if (msg.startsWith("ANONYMOUS_PRINCIPAL:")) {
        ue.error("Identity not connected.", {
          description: "Please connect your Internet Identity using the button below."
        });
      } else if (msg.toLowerCase().includes("unauthorized") || msg.toLowerCase().includes("not authenticated") || msg.toLowerCase().includes("not a user") || msg.toLowerCase().includes("not registered")) {
        ue.error("Account not verified — please refresh and try again.");
      } else if (msg.toLowerCase().includes("duplicate") || msg.toLowerCase().includes("already submitted") || msg.toLowerCase().includes("5 minutes") || msg.toLowerCase().includes("recent")) {
        ue.error(
          "You already submitted a payment recently. Please wait a few minutes."
        );
      } else if (msg.toLowerCase().includes("upload") || msg.toLowerCase().includes("object storage") || msg.toLowerCase().includes("quota")) {
        ue.error("Failed to upload screenshot. Please try a smaller image.");
      } else {
        ue.error("Failed to submit payment. Please try again.", {
          description: "Check your internet connection and try again in a moment."
        });
      }
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-heading-1 text-2xl flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "stat-icon-bg w-9 h-9 shrink-0",
            style: {
              background: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.25) 0%, oklch(0.76 0.21 210 / 0.18) 100%)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-primary" })
          }
        ),
        "Payment"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 ml-11", children: "Subscribe for ₹1/day to access live professional trading signals" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrustStatsBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      upiLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl p-6 space-y-5 border border-border/50 bg-card/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-6 w-32 rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton w-52 h-52 rounded-2xl" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-14 rounded-xl" })
      ] }) : upiConfig ? /* @__PURE__ */ jsxRuntimeExports.jsx(UpiCard, { config: upiConfig }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl p-6 flex items-center justify-center text-sm text-muted-foreground border border-border/50 bg-card/50", children: "UPI configuration not available. Please contact admin." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl p-6 space-y-5 border border-border/50",
          style: {
            background: "linear-gradient(145deg, oklch(0.155 0.03 265 / 0.9) 0%, oklch(0.14 0.025 260 / 0.9) 100%)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "Confirm Payment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Complete the form below to submit your payment" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { step: activeStep }),
            isAnonymousPrincipal && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-primary/6 border border-primary/25 rounded-xl px-4 py-3.5",
                "data-ocid": "ii-connect-banner",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80", children: "Connect your Internet Identity to submit — your UPI details above are ready to pay." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      onClick: loginWithII,
                      disabled: isLoggingIn,
                      className: "shrink-0 gap-1.5 h-9 text-xs",
                      "data-ocid": "ii-connect-inline-btn",
                      children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }),
                        " Connecting…"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3" }),
                        " Connect Identity"
                      ] })
                    }
                  )
                ]
              }
            ),
            pendingBlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-3 bg-amber-500/6 border border-amber-500/25 rounded-xl px-4 py-3.5",
                "data-ocid": "pending-warning",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-amber-400 shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-amber-400 mb-0.5", children: "Payment Pending Review" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-400/80", children: "Your payment is being reviewed by admin. You'll be notified once approved. Please wait before submitting again." })
                  ] })
                ]
              }
            ),
            submitted && !pendingBlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-3 bg-emerald-500/6 border border-emerald-500/25 rounded-xl px-4 py-3.5",
                "data-ocid": "payment-success",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-400 shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-emerald-400 mb-0.5", children: "Payment Submitted!" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-400/80", children: "Admin will verify and activate your subscription shortly." })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "utr-input",
                    className: "text-sm font-semibold text-foreground flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                      "UTR / Reference Number"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "utr-input",
                    type: "text",
                    placeholder: "e.g. 401234567890",
                    value: utr,
                    onChange: (e) => {
                      setUtr(e.target.value);
                      setUtrError("");
                    },
                    onBlur: () => {
                      setUtrTouched(true);
                      setUtrError(validateUtr(utr));
                    },
                    className: `font-mono h-11 input-premium w-full ${utrError ? "input-invalid" : utrTouched && !utrError && utr ? "input-valid" : ""}`,
                    disabled: pendingBlocked,
                    "data-ocid": "utr-input",
                    autoComplete: "off"
                  }
                ),
                utrError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠" }),
                  " ",
                  utrError
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Find the UTR/transaction ID in your UPI app's payment receipt" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "sender-name-input",
                    className: "text-sm font-semibold text-foreground flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                      "Sender Name",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-amber-400 font-normal ml-1", children: "(name used for UPI payment)" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "sender-name-input",
                    type: "text",
                    placeholder: "e.g. Rahul Sharma",
                    value: senderName,
                    onChange: (e) => {
                      setSenderName(e.target.value);
                      setSenderNameError("");
                    },
                    onBlur: () => {
                      setSenderTouched(true);
                      setSenderNameError(validateSenderName(senderName));
                    },
                    className: `h-11 input-premium w-full ${senderNameError ? "input-invalid" : senderTouched && !senderNameError && senderName ? "input-valid" : ""}`,
                    disabled: pendingBlocked,
                    "data-ocid": "sender-name-input",
                    autoComplete: "name"
                  }
                ),
                senderNameError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠" }),
                  " ",
                  senderNameError
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enter the account holder name shown in your UPI app" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold text-foreground flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                  "Payment Screenshot"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FileDropZone,
                  {
                    file,
                    onFile: (f) => {
                      setFile(f);
                      setFileError("");
                    },
                    progress: uploadProgress,
                    disabled: pendingBlocked
                  }
                ),
                fileError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: fileError })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  className: "w-full h-12 font-semibold text-base gap-2 shadow-elevated hover:shadow-premium transition-smooth",
                  disabled: submitPayment.isPending || pendingBlocked || isLoggingIn,
                  "data-ocid": "submit-payment-btn",
                  children: submitPayment.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                    uploadProgress !== null ? `Uploading ${uploadProgress}%...` : "Submitting..."
                  ] }) : isAnonymousPrincipal ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                    "Connect Identity to Submit"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                    "Submit Payment"
                  ] })
                }
              )
            ] })
          ]
        }
      )
    ] }),
    !isAnonymousPrincipal && (paymentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated rounded-xl p-5 space-y-3", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-14 rounded-lg" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentHistory, { payments }))
  ] });
}
export {
  Payment as default
};
