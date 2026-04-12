import { a as useBackend, m as useQueryClient, r as reactExports, h as useQuery, n as useMutation, j as jsxRuntimeExports, A as Award, B as Button, c as ue, E as ExternalBlob } from "./index-BO-jy2EA.js";
import { S as StatusBadge } from "./StatusBadge-DdUp1dft.js";
import { S as Skeleton } from "./skeleton-CbFgKOIp.js";
import { T as Textarea } from "./textarea-OfLpp8wx.js";
import { R as RefreshCw } from "./refresh-cw-BpYGj7tn.js";
import { E as Eye } from "./eye-CilXLqny.js";
import { C as CircleAlert } from "./circle-alert-D7xLFEHC.js";
import { C as CircleCheck } from "./circle-check-DHfkSuxj.js";
import { C as CircleX } from "./circle-x-D6Yc5ibs.js";
import { I as Image } from "./image-DVE4fG_F.js";
import { U as Upload } from "./upload-cBIh6lL1.js";
import { L as LoaderCircle } from "./loader-circle-D557w6Cq.js";
import { C as Clock } from "./clock-BnWW5-NH.js";
function formatDate(ns) {
  return new Date(Number(ns / 1000000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function CertStatusBadge({ status }) {
  if (status === "approved")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(StatusBadge, { variant: "approved", className: "gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
      " APPROVED"
    ] });
  if (status === "rejected")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(StatusBadge, { variant: "rejected", className: "gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
      " REJECTED"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(StatusBadge, { variant: "pending", className: "gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
    " PENDING"
  ] });
}
function MasterTemplateSection() {
  const { actor, isReady } = useBackend();
  const fileRef = reactExports.useRef(null);
  const [file, setFile] = reactExports.useState(null);
  const queryClient = useQueryClient();
  const { data: template } = useQuery({
    queryKey: ["master-template"],
    queryFn: async () => {
      if (!actor) return null;
      const a = actor;
      if (typeof a.getMasterTemplate === "function")
        return await a.getMasterTemplate();
      return null;
    },
    enabled: isReady
  });
  const uploadMut = useMutation({
    mutationFn: async (f) => {
      if (!actor) throw new Error("Not ready");
      const bytes = new Uint8Array(await f.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      const a = actor;
      if (typeof a.updateMasterTemplate === "function")
        await a.updateMasterTemplate(blob);
    },
    onSuccess: () => {
      ue.success("Master template updated!");
      queryClient.invalidateQueries({ queryKey: ["master-template"] });
      setFile(null);
    },
    onError: () => ue.error("Failed to update template")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border/50 p-5 space-y-4",
      style: {
        background: "linear-gradient(145deg, oklch(0.155 0.03 265 / 0.9) 0%, oklch(0.14 0.025 260 / 0.9) 100%)"
      },
      "data-ocid": "master-template-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-4 h-4 text-amber-400" }),
            " Master Certificate Template"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Upload PNG/PDF. System auto-injects Name, Date, Certificate ID on approval." })
        ] }),
        (template == null ? void 0 : template.blob) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg overflow-hidden border border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: template.blob.getDirectURL(),
              alt: "Template",
              className: "w-full max-h-40 object-contain bg-muted/10"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground px-3 py-2", children: [
            "Current template ·",
            " ",
            template.updatedAt ? formatDate(template.updatedAt) : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileRef,
              type: "file",
              accept: "image/*,.pdf",
              className: "hidden",
              onChange: (e) => {
                var _a;
                const f = (_a = e.target.files) == null ? void 0 : _a[0];
                if (f) setFile(f);
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "gap-1.5 h-9",
              onClick: () => {
                var _a;
                return (_a = fileRef.current) == null ? void 0 : _a.click();
              },
              "data-ocid": "select-template-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5" }),
                file ? file.name : "Select Template File"
              ]
            }
          ),
          file && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "gap-1.5 h-9",
              onClick: () => uploadMut.mutate(file),
              disabled: uploadMut.isPending,
              "data-ocid": "upload-template-btn",
              children: [
                uploadMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5" }),
                " ",
                "Upload"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ApproveModal({
  cert,
  onClose,
  onApprove,
  loading
}) {
  const [mode, setMode] = reactExports.useState("auto");
  const [customFile, setCustomFile] = reactExports.useState(null);
  const ref = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 bg-background/80 backdrop-blur-sm",
        onClick: onClose,
        role: "button",
        tabIndex: 0,
        onKeyDown: (e) => e.key === "Escape" && onClose(),
        "aria-label": "Close"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative w-full max-w-md rounded-2xl border border-border p-6 space-y-5 shadow-premium z-10",
        style: {
          background: "linear-gradient(145deg, oklch(0.17 0.04 265) 0%, oklch(0.15 0.035 260) 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: "Approve Certificate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              "For:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: cert.fullName }),
              " ",
              "· ",
              cert.certCode
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: ["auto", "custom"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setMode(m),
              className: `rounded-lg px-3 py-2.5 text-xs font-semibold transition-all ${mode === m ? "bg-primary/15 border border-primary/30 text-primary" : "border border-border text-muted-foreground hover:border-primary/20"}`,
              children: m === "auto" ? "🤖 Auto-generate (Default)" : "📄 Custom Upload (VIP)"
            },
            m
          )) }),
          mode === "auto" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl border border-emerald-500/20 px-4 py-3 space-y-1.5",
              style: { background: "oklch(0.65 0.25 142 / 0.06)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-emerald-400", children: "Will auto-inject:" }),
                [
                  `Name: ${cert.fullName}`,
                  `Date: ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`,
                  `Certificate ID: ${cert.certCode}`
                ].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
                  "✓ ",
                  l
                ] }, l))
              ]
            }
          ),
          mode === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref,
                type: "file",
                accept: "image/*,.pdf",
                className: "hidden",
                onChange: (e) => {
                  var _a;
                  const f = (_a = e.target.files) == null ? void 0 : _a[0];
                  if (f) setCustomFile(f);
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: `w-full border-2 border-dashed rounded-xl p-5 text-center transition-all ${customFile ? "border-emerald-500/50 bg-emerald-500/5" : "border-border hover:border-primary/40"}`,
                onClick: () => {
                  var _a;
                  return (_a = ref.current) == null ? void 0 : _a.click();
                },
                children: customFile ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-emerald-400", children: customFile.name }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-6 h-6 text-muted-foreground mx-auto" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Click to upload custom certificate (PNG/PDF)" })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1 h-10",
                onClick: onClose,
                disabled: loading,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "flex-1 h-10 bg-emerald-600 hover:bg-emerald-500 gap-1.5",
                disabled: loading || mode === "custom" && !customFile,
                onClick: () => onApprove(cert, mode === "custom" ? customFile : null),
                "data-ocid": "confirm-approve-btn",
                children: [
                  loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                  " ",
                  "Approve"
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function RejectModal({
  cert,
  onClose,
  onReject,
  loading
}) {
  const [reason, setReason] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 bg-background/80 backdrop-blur-sm",
        onClick: onClose,
        role: "button",
        tabIndex: 0,
        onKeyDown: (e) => e.key === "Escape" && onClose(),
        "aria-label": "Close"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative w-full max-w-md rounded-2xl border border-border p-6 space-y-5 shadow-premium z-10",
        style: {
          background: "linear-gradient(145deg, oklch(0.17 0.04 265) 0%, oklch(0.15 0.035 260) 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: "Reject Certificate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
              "For:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: cert.fullName })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                htmlFor: "rejection-reason-textarea",
                className: "text-sm font-semibold text-foreground",
                children: [
                  "Rejection Reason",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "(shown to user)" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "rejection-reason-textarea",
                placeholder: "e.g. Screenshots are not clear, please resubmit",
                value: reason,
                onChange: (e) => setReason(e.target.value),
                className: "min-h-[80px] input-premium resize-none",
                "data-ocid": "rejection-reason-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1 h-10",
                onClick: onClose,
                disabled: loading,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "destructive",
                className: "flex-1 h-10 gap-1.5",
                onClick: () => onReject(cert, reason),
                disabled: loading,
                "data-ocid": "confirm-reject-btn",
                children: [
                  loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4" }),
                  " ",
                  "Reject"
                ]
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function AdminCertificates() {
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();
  const [tab, setTab] = reactExports.useState("all");
  const [approveModal, setApproveModal] = reactExports.useState(null);
  const [rejectModal, setRejectModal] = reactExports.useState(null);
  const {
    data: requests = [],
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["admin-certificates"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const a = actor;
        if (typeof a.listAllCertificateRequests === "function")
          return await a.listAllCertificateRequests();
        return [];
      } catch {
        return [];
      }
    },
    enabled: isReady
  });
  const approveMut = useMutation({
    mutationFn: async ({
      cert,
      file
    }) => {
      if (!actor) throw new Error("Not ready");
      let customBlob = null;
      if (file) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        customBlob = ExternalBlob.fromBytes(bytes);
      }
      const a = actor;
      if (typeof a.approveCertificate === "function")
        return await a.approveCertificate(cert.id, customBlob);
      throw new Error("approveCertificate not available");
    },
    onSuccess: () => {
      ue.success("Certificate approved!");
      setApproveModal(null);
      queryClient.invalidateQueries({ queryKey: ["admin-certificates"] });
      queryClient.invalidateQueries({ queryKey: ["my-certificates"] });
      queryClient.invalidateQueries({ queryKey: ["hasCertificate"] });
    },
    onError: () => ue.error("Failed to approve")
  });
  const rejectMut = useMutation({
    mutationFn: async ({
      cert,
      reason
    }) => {
      if (!actor) throw new Error("Not ready");
      const a = actor;
      if (typeof a.rejectCertificate === "function")
        return await a.rejectCertificate(cert.id, reason);
      throw new Error("rejectCertificate not available");
    },
    onSuccess: () => {
      ue.success("Certificate rejected");
      setRejectModal(null);
      queryClient.invalidateQueries({ queryKey: ["admin-certificates"] });
      queryClient.invalidateQueries({ queryKey: ["my-certificates"] });
    },
    onError: () => ue.error("Failed to reject")
  });
  const all = requests;
  const filtered = tab === "all" ? all : all.filter((r) => r.status === tab);
  const pendingCount = all.filter((r) => r.status === "pending").length;
  const approvedCount = all.filter((r) => r.status === "approved").length;
  const rejectedCount = all.filter((r) => r.status === "rejected").length;
  const tabs = [
    { key: "all", label: "All", count: all.length },
    { key: "pending", label: "Pending", count: pendingCount },
    { key: "approved", label: "Approved", count: approvedCount },
    { key: "rejected", label: "Rejected", count: rejectedCount }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-heading-1 flex items-center gap-2.5 text-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-7 h-7 text-amber-400" }),
          " Certificate Requests"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 ml-9.5", children: "Review and manage trader certificate applications" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "gap-1.5 h-9",
          onClick: () => refetch(),
          "data-ocid": "admin-certs-refresh-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
            " Refresh"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MasterTemplateSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      { label: "Total", value: all.length, color: "text-primary" },
      { label: "Pending", value: pendingCount, color: "text-amber-400" },
      {
        label: "Approved",
        value: approvedCount,
        color: "text-emerald-400"
      },
      { label: "Rejected", value: rejectedCount, color: "text-rose-400" }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated rounded-xl p-4 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold tabular-nums ${s.color}`, children: s.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: s.label })
        ]
      },
      s.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-muted/20 rounded-xl p-1 w-fit border border-border/40", children: tabs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setTab(t.key),
        className: `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${tab === t.key ? "bg-card text-foreground shadow-sm border border-border/60" : "text-muted-foreground hover:text-foreground"}`,
        "data-ocid": `filter-tab-${t.key}`,
        children: [
          t.label,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-muted/50 text-muted-foreground rounded-full px-1.5 py-0.5 text-[10px] font-mono", children: t.count })
        ]
      },
      t.key
    )) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, i)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated rounded-xl py-16 flex flex-col items-center gap-3 text-center",
        "data-ocid": "certs-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-10 h-10 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground", children: [
            "No ",
            tab === "all" ? "" : tab,
            " requests"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Applications will appear here" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((req) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `card-elevated rounded-xl p-5 border ${req.status === "pending" ? "border-amber-500/15" : "border-border/40"}`,
        "data-ocid": "admin-cert-row",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: req.fullName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CertStatusBadge, { status: req.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "📍 ",
                req.state,
                ", ",
                req.country
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "📅 ",
                formatDate(req.createdAt)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "🎓 ",
                req.experience || "Not specified"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                "ID: ",
                req.certCode
              ] }),
              req.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                "✉ ",
                req.email
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                "UTR: ",
                req.utrNumber
              ] })
            ] }),
            (req.screenshot1Key || req.screenshot2Key) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                [req.screenshot1Key, req.screenshot2Key].filter(
                  Boolean
                ).length,
                " ",
                "trade screenshot(s) ·",
                " ",
                req.paymentScreenshotKey ? "1 payment screenshot" : "no payment screenshot"
              ] })
            ] }),
            req.status === "rejected" && req.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5 text-xs text-rose-400 bg-rose-500/8 border border-rose-500/20 rounded-lg px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: req.rejectionReason })
            ] }),
            req.status === "approved" && req.autoInjectData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-emerald-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Auto-generated · ",
                req.autoInjectData.certCode,
                " ·",
                " ",
                req.autoInjectData.issueDate
              ] })
            ] })
          ] }),
          req.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-9 gap-1.5 border-rose-500/30 text-rose-400 hover:bg-rose-500/10",
                onClick: () => setRejectModal(req),
                "data-ocid": "reject-cert-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                  " Reject"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                className: "h-9 gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white",
                onClick: () => setApproveModal(req),
                "data-ocid": "approve-cert-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                  " Approve"
                ]
              }
            )
          ] })
        ] })
      },
      String(req.id)
    )) }),
    approveModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ApproveModal,
      {
        cert: approveModal,
        onClose: () => setApproveModal(null),
        onApprove: (cert, file) => approveMut.mutate({ cert, file }),
        loading: approveMut.isPending
      }
    ),
    rejectModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      RejectModal,
      {
        cert: rejectModal,
        onClose: () => setRejectModal(null),
        onReject: (cert, reason) => rejectMut.mutate({ cert, reason }),
        loading: rejectMut.isPending
      }
    )
  ] });
}
export {
  AdminCertificates as default
};
