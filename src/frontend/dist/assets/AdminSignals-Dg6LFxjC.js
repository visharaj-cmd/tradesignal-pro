import { e as createLucideIcon, a as useBackend, m as useQueryClient, r as reactExports, h as useQuery, n as useMutation, j as jsxRuntimeExports, T as TrendingUp, l as SignalType, i as TradeStatus, V as Variant_success_failed, B as Button, t as LoadingSpinner, c as ue, E as ExternalBlob } from "./index-BO-jy2EA.js";
import { L as Label } from "./label-CY9wZVTR.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CCSWIqZP.js";
import { M as Modal } from "./Modal-CO8JOfct.js";
import { S as StatusBadge } from "./StatusBadge-DdUp1dft.js";
import { T as TrendingDown } from "./trending-down-1k8RkAqL.js";
import { C as CircleCheck } from "./circle-check-DHfkSuxj.js";
import { C as CircleX } from "./circle-x-D6Yc5ibs.js";
import { P as Pencil } from "./pencil-DfNN76tp.js";
import { U as Upload } from "./upload-cBIh6lL1.js";
import { I as Image } from "./image-DVE4fG_F.js";
import "./index-Ce6i51uv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const defaultForm = {
  pair: "",
  signalType: SignalType.buy,
  entryPrice: 0,
  stopLoss: 0,
  takeProfit: 0,
  confidence: 75,
  screenshotKey: void 0,
  tradeStatus: TradeStatus.pending
};
function TradeStatusBadge({ status }) {
  if (status === TradeStatus.success)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-success gap-1.5 flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
      " SUCCESS"
    ] });
  if (status === TradeStatus.failed)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge-failed gap-1.5 flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3" }),
      " FAILED"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-pending", children: "PENDING" });
}
function ScreenshotUpload({
  value,
  onChange
}) {
  const fileRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [preview, setPreview] = reactExports.useState(void 0);
  const [isDragOver, setIsDragOver] = reactExports.useState(false);
  async function handleFile(file) {
    setUploading(true);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      const key = blob.getDirectURL();
      setPreview(URL.createObjectURL(file));
      onChange(key);
    } catch {
      ue.error("Screenshot upload failed");
    } finally {
      setUploading(false);
    }
  }
  const hasImage = preview || value;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Screenshot (optional)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": "Upload screenshot",
        className: `w-full rounded-lg border-2 border-dashed transition-smooth cursor-pointer text-left
          ${isDragOver ? "border-accent/70 bg-accent/5" : hasImage ? "border-border bg-secondary" : "border-input bg-muted/10 hover:border-accent/50 hover:bg-accent/5"}`,
        onClick: () => {
          var _a;
          return (_a = fileRef.current) == null ? void 0 : _a.click();
        },
        onDragOver: (e) => {
          e.preventDefault();
          setIsDragOver(true);
        },
        onDragLeave: () => setIsDragOver(false),
        onDrop: (e) => {
          e.preventDefault();
          setIsDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        },
        "data-ocid": "screenshot-upload",
        children: hasImage ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: preview ?? value,
              alt: "Preview",
              className: "h-16 w-16 rounded-lg object-cover border border-border shrink-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
            " Uploading…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Screenshot uploaded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Click to replace" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "h-7 w-7 text-muted-foreground hover:text-destructive shrink-0",
              onClick: (e) => {
                e.stopPropagation();
                setPreview(void 0);
                onChange(void 0);
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center py-6 px-4 text-center", children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Uploading…" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon-bg mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Drop or click to upload" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "JPG, PNG, WEBP · chart screenshot" })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: (e) => {
          var _a;
          const f = (_a = e.target.files) == null ? void 0 : _a[0];
          if (f) handleFile(f);
          e.target.value = "";
        }
      }
    )
  ] });
}
function ProofUpload({
  proofFile,
  proofPreview,
  uploading,
  onFile,
  onClear
}) {
  const fileRef = reactExports.useRef(null);
  const [drag, setDrag] = reactExports.useState(false);
  function handleChange(e) {
    var _a;
    const f = (_a = e.target.files) == null ? void 0 : _a[0];
    if (f) onFile(f);
    e.target.value = "";
  }
  function handleDrop(e) {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f == null ? void 0 : f.type.startsWith("image/")) onFile(f);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold text-foreground", children: "Trade Proof" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground bg-muted/50 border border-border px-2 py-0.5 rounded-full", children: "Optional" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Upload a proof screenshot for this successful trade — skip if not available." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "aria-label": "Upload proof image",
        className: `w-full rounded-lg border-2 border-dashed transition-smooth cursor-pointer text-left ${drag ? "border-emerald-500/60 bg-emerald-500/5" : proofFile || proofPreview ? "border-emerald-500/40 bg-emerald-500/5" : "border-border hover:border-emerald-500/40 hover:bg-emerald-500/3"}`,
        onClick: () => {
          var _a;
          return (_a = fileRef.current) == null ? void 0 : _a.click();
        },
        onDragOver: (e) => {
          e.preventDefault();
          setDrag(true);
        },
        onDragLeave: () => setDrag(false),
        onDrop: handleDrop,
        "data-ocid": "proof-upload",
        children: proofFile || proofPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
          proofPreview && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: proofPreview,
              alt: "Proof preview",
              className: "h-14 w-14 rounded-lg object-cover border border-emerald-500/30 shrink-0"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
            " Uploading proof…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-emerald-400", children: "Proof ready" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              (proofFile == null ? void 0 : proofFile.name) ?? "Image uploaded",
              " · Click to replace"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "h-7 w-7 text-muted-foreground hover:text-destructive shrink-0",
              onClick: (e) => {
                e.stopPropagation();
                onClear();
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4" })
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-5 px-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "stat-icon-bg mb-2.5",
              style: {
                background: "linear-gradient(135deg, oklch(0.65 0.25 142 / 0.15) 0%, oklch(0.65 0.25 142 / 0.08) 100%)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-5 w-5 text-emerald-400" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: drag ? "Drop proof image here" : "Drop or click to add proof" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Optional · JPG, PNG, WEBP" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: handleChange
      }
    )
  ] });
}
function ConfidenceSlider({
  value,
  onChange
}) {
  const pct = value;
  const color = pct >= 75 ? "oklch(var(--success))" : pct >= 50 ? "oklch(var(--accent))" : "oklch(var(--pending))";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Confidence" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "text-sm font-bold font-mono tabular-nums",
          style: { color },
          children: [
            value,
            "%"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: 1,
          max: 100,
          value,
          onChange: (e) => onChange(Number(e.target.value)),
          className: "w-full h-2 rounded-full appearance-none cursor-pointer",
          style: { accentColor: color }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground font-mono mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "1%" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "50%" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "100%" })
      ] })
    ] })
  ] });
}
function SignalForm({
  initial,
  onSubmit,
  isPending,
  onCancel
}) {
  const [form, setForm] = reactExports.useState(initial);
  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        onSubmit(form);
      },
      className: "space-y-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pair", children: "Trading Pair" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "pair",
                placeholder: "e.g. BTC/USDT",
                value: form.pair,
                onChange: (e) => set("pair", e.target.value),
                required: true,
                className: "input-premium w-full font-mono",
                "data-ocid": "signal-pair-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Signal Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.signalType,
                onValueChange: (v) => set("signalType", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "input-premium h-auto py-2.5",
                      "data-ocid": "signal-type-select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: SignalType.buy, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5 text-success" }),
                      " BUY"
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: SignalType.sell, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3.5 w-3.5 text-destructive" }),
                      " SELL"
                    ] }) })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Trade Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.tradeStatus,
                onValueChange: (v) => set("tradeStatus", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "input-premium h-auto py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: TradeStatus.pending, children: "Pending" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: TradeStatus.success, children: "Success" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: TradeStatus.failed, children: "Failed" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
          { id: "entry", label: "Entry Price", field: "entryPrice" },
          { id: "sl", label: "Stop Loss", field: "stopLoss" },
          { id: "tp", label: "Take Profit", field: "takeProfit" }
        ].map(({ id, label, field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id,
              type: "number",
              step: "any",
              value: form[field] || "",
              onChange: (e) => set(field, Number(e.target.value)),
              required: true,
              className: "input-premium w-full font-mono text-sm",
              placeholder: "0.00"
            }
          )
        ] }, id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConfidenceSlider,
          {
            value: form.confidence,
            onChange: (v) => set("confidence", v)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ScreenshotUpload,
          {
            value: form.screenshotKey,
            onChange: (key) => set("screenshotKey", key)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onCancel,
              className: "button-secondary flex-1 h-10 text-sm",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: isPending,
              className: "button-primary flex-1 h-10 text-sm flex items-center justify-center gap-2",
              "data-ocid": "signal-save-btn",
              children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                " Saving…"
              ] }) : "Save Signal"
            }
          )
        ] })
      ]
    }
  );
}
function MarkSuccessModal({
  signal,
  onClose,
  onConfirm,
  isPending
}) {
  const [proofFile, setProofFile] = reactExports.useState(null);
  const [proofPreview, setProofPreview] = reactExports.useState(null);
  const [proofKey, setProofKey] = reactExports.useState(null);
  const [uploading, setUploading] = reactExports.useState(false);
  async function handleProofFile(file) {
    setProofFile(file);
    setProofPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      setProofKey(blob.getDirectURL());
    } catch {
      ue.error("Failed to process proof image");
      setProofFile(null);
      setProofPreview(null);
      setProofKey(null);
    } finally {
      setUploading(false);
    }
  }
  function clearProof() {
    setProofFile(null);
    setProofPreview(null);
    setProofKey(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      isOpen: true,
      onClose,
      title: "Mark Trade as Success ✅",
      description: `Confirm that ${signal.pair} trade was successful`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-500/6 border border-emerald-500/20 rounded-xl px-4 py-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: signal.pair }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              signal.signalType === SignalType.buy ? "BUY" : "SELL",
              " · Confidence ",
              Number(signal.confidence),
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProofUpload,
          {
            proofFile,
            proofPreview,
            uploading,
            onFile: handleProofFile,
            onClear: clearProof
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "button-secondary flex-1 h-10 text-sm",
              onClick: onClose,
              "data-ocid": "mark-success-cancel",
              children: "Cancel"
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
              disabled: isPending || uploading,
              onClick: () => onConfirm(proofKey),
              "data-ocid": "mark-success-confirm",
              children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
                " Mark as Success"
              ] })
            }
          )
        ] })
      ] })
    }
  );
}
function AdminSignals() {
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [editSignal, setEditSignal] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [successTarget, setSuccessTarget] = reactExports.useState(null);
  const { data: signals, isLoading } = useQuery({
    queryKey: ["admin-signals"],
    queryFn: async () => actor ? actor.listSignals() : [],
    enabled: isReady
  });
  const addMutation = useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Not ready");
      return actor.addSignal({
        pair: data.pair,
        signalType: data.signalType,
        entryPrice: data.entryPrice,
        stopLoss: data.stopLoss,
        takeProfit: data.takeProfit,
        confidence: BigInt(data.confidence),
        screenshotKey: data.screenshotKey,
        tradeStatus: data.tradeStatus
      });
    },
    onSuccess: () => {
      ue.success("Signal added");
      setShowAdd(false);
      queryClient.invalidateQueries({ queryKey: ["admin-signals"] });
    },
    onError: () => ue.error("Failed to add signal")
  });
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      if (!actor) throw new Error("Not ready");
      return actor.updateSignal(id, {
        pair: data.pair,
        signalType: data.signalType,
        entryPrice: data.entryPrice,
        stopLoss: data.stopLoss,
        takeProfit: data.takeProfit,
        confidence: BigInt(data.confidence),
        screenshotKey: data.screenshotKey,
        tradeStatus: data.tradeStatus
      });
    },
    onSuccess: () => {
      ue.success("Signal updated");
      setEditSignal(null);
      queryClient.invalidateQueries({ queryKey: ["admin-signals"] });
    },
    onError: () => ue.error("Failed to update signal")
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not ready");
      return actor.deleteSignal(id);
    },
    onSuccess: () => {
      ue.success("Signal deleted");
      setDeleteTarget(null);
      queryClient.invalidateQueries({ queryKey: ["admin-signals"] });
    },
    onError: () => ue.error("Failed to delete signal")
  });
  const outcomeMutation = useMutation({
    mutationFn: async ({
      id,
      status,
      proofKey
    }) => {
      if (!actor) throw new Error("Not ready");
      return actor.markTradeOutcome(id, status, proofKey);
    },
    onSuccess: (_, vars) => {
      ue.success(
        `Trade marked as ${vars.status === Variant_success_failed.success ? "Success ✅" : "Failed ❌"}`
      );
      setSuccessTarget(null);
      queryClient.invalidateQueries({ queryKey: ["admin-signals"] });
    },
    onError: () => ue.error("Failed to update trade outcome")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-5xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-heading-2", children: "Signals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Manage trading signals visible to subscribers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "button-primary h-10 px-4 text-sm flex items-center gap-2",
          onClick: () => setShowAdd(true),
          "data-ocid": "add-signal-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            " Add Signal"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium p-0 overflow-hidden", children: [
      !isLoading && signals && signals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-2.5 text-label text-xs border-b border-border bg-muted/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Signal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 text-right", children: "Prices" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 text-center", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 text-right", children: "Actions" })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "skeleton h-16 w-full rounded-lg" }, k)) }) : !(signals == null ? void 0 : signals.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", "data-ocid": "signals-empty", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-7 w-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No signals yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "Add your first trading signal to get started" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "button-primary mt-4 px-4 h-9 text-sm flex items-center gap-2",
            onClick: () => setShowAdd(true),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              " Add Signal"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/50", children: signals.map((s) => {
        var _a;
        const isBuy = s.signalType === SignalType.buy;
        const isOutcomeLoading = outcomeMutation.isPending && ((_a = outcomeMutation.variables) == null ? void 0 : _a.id) === s.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "signal-row flex flex-wrap md:flex-nowrap items-center gap-3 px-5 py-4",
            "data-ocid": `signal-row-${s.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: s.screenshotKey ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: s.screenshotKey,
                  alt: "Chart",
                  className: "h-10 w-10 rounded-lg object-cover border border-border"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex h-10 w-10 items-center justify-center rounded-lg",
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
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: s.pair }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: isBuy ? "badge-buy py-0.5 text-xs" : "badge-sell py-0.5 text-xs",
                      children: isBuy ? "BUY" : "SELL"
                    }
                  ),
                  !s.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { variant: "expired", children: "Inactive" }),
                  s.proofKey && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5" }),
                    " Proof"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground font-mono", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "E: ",
                    s.entryPrice
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "SL: ",
                    s.stopLoss
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "TP: ",
                    s.takeProfit
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-1.5 w-12 rounded-full overflow-hidden",
                        style: { background: "oklch(var(--muted))" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "h-full rounded-full",
                            style: {
                              width: `${Number(s.confidence)}%`,
                              background: "oklch(var(--accent))"
                            }
                          }
                        )
                      }
                    ),
                    Number(s.confidence),
                    "%"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", "data-ocid": `trade-status-${s.id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TradeStatusBadge, { status: s.tradeStatus }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                s.tradeStatus !== TradeStatus.success && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-fast disabled:opacity-50",
                    style: {
                      color: "oklch(var(--success))",
                      background: "oklch(var(--success) / 0.08)",
                      border: "1px solid oklch(var(--success) / 0.2)"
                    },
                    disabled: isOutcomeLoading,
                    onClick: () => setSuccessTarget(s),
                    "data-ocid": `mark-success-${s.id}`,
                    "aria-label": "Mark Win",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Win" })
                    ]
                  }
                ),
                s.tradeStatus !== TradeStatus.failed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-fast disabled:opacity-50",
                    style: {
                      color: "oklch(var(--destructive))",
                      background: "oklch(var(--destructive) / 0.08)",
                      border: "1px solid oklch(var(--destructive) / 0.2)"
                    },
                    disabled: isOutcomeLoading,
                    onClick: () => outcomeMutation.mutate({
                      id: s.id,
                      status: Variant_success_failed.failed,
                      proofKey: null
                    }),
                    "data-ocid": `mark-failed-${s.id}`,
                    "aria-label": "Mark Loss",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Loss" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 hover:bg-muted/30",
                    onClick: () => setEditSignal(s),
                    "aria-label": "Edit",
                    "data-ocid": `edit-signal-${s.id}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 hover:bg-destructive/10",
                    style: { color: "oklch(var(--destructive))" },
                    onClick: () => setDeleteTarget(s),
                    "aria-label": "Delete",
                    "data-ocid": `delete-signal-${s.id}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ] })
            ]
          },
          s.id.toString()
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: showAdd,
        onClose: () => setShowAdd(false),
        title: "Add Signal",
        description: "Create a new trading signal",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SignalForm,
          {
            initial: defaultForm,
            onSubmit: (d) => addMutation.mutate(d),
            isPending: addMutation.isPending,
            onCancel: () => setShowAdd(false)
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: !!editSignal,
        onClose: () => setEditSignal(null),
        title: "Edit Signal",
        description: "Update signal details",
        children: editSignal && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SignalForm,
          {
            initial: {
              pair: editSignal.pair,
              signalType: editSignal.signalType,
              entryPrice: editSignal.entryPrice,
              stopLoss: editSignal.stopLoss,
              takeProfit: editSignal.takeProfit,
              confidence: Number(editSignal.confidence),
              screenshotKey: editSignal.screenshotKey,
              tradeStatus: editSignal.tradeStatus
            },
            onSubmit: (d) => updateMutation.mutate({ id: editSignal.id, data: d }),
            isPending: updateMutation.isPending,
            onCancel: () => setEditSignal(null)
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        isOpen: !!deleteTarget,
        onClose: () => setDeleteTarget(null),
        title: "Delete Signal",
        description: `Delete signal for ${(deleteTarget == null ? void 0 : deleteTarget.pair) ?? ""}? This cannot be undone.`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "button-tertiary flex-1 h-10 text-sm border border-border",
              onClick: () => setDeleteTarget(null),
              "data-ocid": "delete-signal-cancel",
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
              disabled: deleteMutation.isPending,
              onClick: () => deleteTarget && deleteMutation.mutate(deleteTarget.id),
              "data-ocid": "delete-signal-confirm",
              children: deleteMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
                " Confirm Delete"
              ] })
            }
          )
        ] })
      }
    ),
    successTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MarkSuccessModal,
      {
        signal: successTarget,
        onClose: () => setSuccessTarget(null),
        onConfirm: (proofKey) => outcomeMutation.mutate({
          id: successTarget.id,
          status: Variant_success_failed.success,
          proofKey
        }),
        isPending: outcomeMutation.isPending
      }
    )
  ] });
}
export {
  AdminSignals as default
};
