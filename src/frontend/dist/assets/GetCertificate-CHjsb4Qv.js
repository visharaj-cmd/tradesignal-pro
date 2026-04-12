import { e as createLucideIcon, a as useBackend, q as useCertificateStatus, m as useQueryClient, r as reactExports, h as useQuery, E as ExternalBlob, n as useMutation, j as jsxRuntimeExports, A as Award, G as GoldenTickBadge, B as Button, c as ue } from "./index-BO-jy2EA.js";
import { S as StatusBadge } from "./StatusBadge-DdUp1dft.js";
import { I as Input } from "./input-ChmVmaSS.js";
import { L as Label } from "./label-CY9wZVTR.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CCSWIqZP.js";
import { S as Skeleton } from "./skeleton-CbFgKOIp.js";
import { S as Star, H as Hash, C as Copy } from "./star-DNH9mao7.js";
import { C as CircleCheck } from "./circle-check-DHfkSuxj.js";
import { L as LoaderCircle } from "./loader-circle-D557w6Cq.js";
import { U as Upload } from "./upload-cBIh6lL1.js";
import { I as Image$1 } from "./image-DVE4fG_F.js";
import { C as CircleAlert } from "./circle-alert-D7xLFEHC.js";
import { C as CircleX } from "./circle-x-D6Yc5ibs.js";
import { C as Clock } from "./clock-BnWW5-NH.js";
import "./index-Ce6i51uv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode);
const DEFAULT_UPI_ID = "6203460064@ptsbi";
const DEFAULT_QR_URL = "/assets/qr-code.jpg";
function formatDate(ns) {
  return new Date(Number(ns / 1000000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function DropZone({ file, onFile, label, required, disabled }) {
  const ref = reactExports.useRef(null);
  const [drag, setDrag] = reactExports.useState(false);
  function pick(f) {
    if (f.size > 5 * 1024 * 1024) {
      ue.error("Image too large. Max 5 MB.");
      return;
    }
    onFile(f);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      disabled,
      className: `w-full border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 ${disabled ? "opacity-50 cursor-not-allowed border-border" : drag ? "border-primary bg-primary/8" : file ? "border-emerald-500/50 bg-emerald-500/5" : "border-border hover:border-primary/50 hover:bg-primary/4"}`,
      onClick: () => {
        var _a;
        return !disabled && ((_a = ref.current) == null ? void 0 : _a.click());
      },
      onDragOver: (e) => {
        e.preventDefault();
        if (!disabled) setDrag(true);
      },
      onDragLeave: () => setDrag(false),
      onDrop: (e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files[0];
        if (f == null ? void 0 : f.type.startsWith("image/")) pick(f);
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref,
            type: "file",
            accept: "image/*",
            className: "hidden",
            disabled,
            onChange: (e) => {
              var _a;
              const f = (_a = e.target.files) == null ? void 0 : _a[0];
              if (f) pick(f);
            }
          }
        ),
        file ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-400 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: file.name })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Image$1, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            label,
            required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-1", children: "*" }),
            " · click/drag"
          ] })
        ] })
      ]
    }
  );
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
function CertificateCard({ cert }) {
  const [dl, setDl] = reactExports.useState(false);
  const { actor, isReady } = useBackend();
  async function downloadAutoGenerated(d) {
    const a = actor;
    if (typeof a.getMasterTemplate !== "function") {
      ue.error("Template not configured — contact admin");
      return;
    }
    const template = await a.getMasterTemplate();
    if (!(template == null ? void 0 : template.blob)) {
      ue.error("Template not configured — contact admin");
      return;
    }
    const templateUrl = template.blob.getDirectURL();
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load template image"));
      img.src = templateUrl;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not available");
    ctx.drawImage(img, 0, 0);
    const w = canvas.width;
    const h = canvas.height;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${Math.round(h * 0.065)}px Georgia, serif`;
    ctx.fillStyle = "#F59E0B";
    ctx.shadowColor = "rgba(0,0,0,0.7)";
    ctx.shadowBlur = 8;
    ctx.fillText(d.fullName, w / 2, h * 0.58);
    ctx.font = `${Math.round(h * 0.032)}px Georgia, serif`;
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowBlur = 5;
    ctx.fillText(d.issueDate, w / 2, h * 0.67);
    ctx.font = `${Math.round(h * 0.024)}px Courier New, monospace`;
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.shadowBlur = 3;
    ctx.fillText(`Certificate ID: ${d.certCode}`, w / 2, h * 0.88);
    ctx.shadowBlur = 0;
    await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas export failed"));
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${d.certCode}.png`;
        link.click();
        URL.revokeObjectURL(url);
        resolve();
      }, "image/png");
    });
  }
  async function handleDownload() {
    if (!isReady) return;
    setDl(true);
    try {
      if (cert.autoGenerated && cert.autoInjectData) {
        await downloadAutoGenerated(cert.autoInjectData);
        ue.success("Certificate downloaded!");
      } else if (cert.certificate) {
        const link = document.createElement("a");
        link.href = cert.certificate.getDirectURL();
        link.download = `Certificate-${cert.certCode}`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        ue.success("Certificate downloaded!");
      } else {
        ue.error("Certificate not ready yet, please try again later.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Download failed.";
      ue.error(
        msg === "Template not configured — contact admin" ? msg : "Download failed. Please try again."
      );
    } finally {
      setDl(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border p-4 space-y-3 hover:border-primary/30 transition-all",
      style: {
        background: "linear-gradient(145deg, oklch(0.155 0.03 265 / 0.8) 0%, oklch(0.14 0.025 260 / 0.8) 100%)"
      },
      "data-ocid": "certificate-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate", children: cert.fullName }),
            cert.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsx(GoldenTickBadge, { show: true, size: "sm" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CertStatusBadge, { status: cert.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
            "ID: ",
            cert.certCode
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Applied: ",
            formatDate(cert.createdAt)
          ] }),
          cert.state && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            cert.state,
            ", ",
            cert.country
          ] })
        ] }),
        cert.status === "rejected" && cert.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-2 rounded-lg px-3 py-2 border border-rose-500/20",
            style: { background: "oklch(0.62 0.22 22 / 0.06)" },
            "data-ocid": "rejection-reason",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-rose-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Reason:" }),
                " ",
                cert.rejectionReason
              ] })
            ]
          }
        ),
        cert.status === "approved" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "gap-1.5 h-8 text-xs",
            onClick: handleDownload,
            disabled: dl,
            "data-ocid": "download-cert-btn",
            children: [
              dl ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              "Download Certificate"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "gap-1.5 h-8 text-xs opacity-50",
            disabled: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              cert.status === "pending" ? "Pending Review" : "Not Available"
            ]
          }
        )
      ]
    }
  );
}
function CertHistory() {
  const { actor, isReady } = useBackend();
  const { data: certs = [], isLoading } = useQuery({
    queryKey: ["my-certificates"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const a = actor;
        if (typeof a.getMyCertificates === "function")
          return await a.getMyCertificates();
        return [];
      } catch {
        return [];
      }
    },
    enabled: isReady,
    refetchInterval: 3e4
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center gap-3 bg-gradient-to-r from-muted/20 to-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "stat-icon-bg w-8 h-8 shrink-0",
          style: {
            background: "linear-gradient(135deg, oklch(0.72 0.22 68 / 0.25) 0%, oklch(0.72 0.22 68 / 0.12) 100%)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-amber-400" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Certificate History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "All requests & statuses" })
      ] }),
      certs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full font-mono ml-auto", children: certs.length })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [0, 1].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, i)) }) : certs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state py-12", "data-ocid": "certs-empty", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state-icon mx-auto mb-3 w-14 h-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-7 h-7" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "No certificates yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Submit your first request above to get your verified trader certificate." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: certs.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(CertificateCard, { cert: c }, String(c.id))) })
  ] });
}
function UpiCard({ config }) {
  var _a, _b;
  const [copied, setCopied] = reactExports.useState(false);
  const qrUrl = ((_a = config.qrCodeBlob) == null ? void 0 : _a.getDirectURL()) ?? DEFAULT_QR_URL;
  const upiId = ((_b = config.upiId) == null ? void 0 : _b.trim()) ? config.upiId : DEFAULT_UPI_ID;
  function copyUpi() {
    navigator.clipboard.writeText(upiId).then(() => {
      setCopied(true);
      ue.success("Copied!");
      setTimeout(() => setCopied(false), 2500);
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl p-5 border border-border/50 space-y-4",
      style: {
        background: "linear-gradient(145deg, oklch(0.16 0.04 265 / 0.95) 0%, oklch(0.14 0.03 260 / 0.95) 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-foreground", children: "Pay Certificate Fee" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Scan QR or copy UPI ID" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-3xl text-amber-400 tabular-nums leading-none", children: "₹99" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "one-time fee" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-xl p-2.5 shrink-0",
              style: {
                background: "oklch(0.96 0 0)",
                border: "3px solid oklch(0.98 0 0 / 0.9)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: qrUrl,
                  alt: "UPI QR",
                  className: "w-24 h-24 object-contain rounded-lg"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `rounded-lg px-3 py-2.5 flex items-center justify-between gap-2 border transition-all duration-300 ${copied ? "border-emerald-500/40 bg-emerald-500/6" : "border-border/60 bg-muted/30"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5", children: "UPI ID" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-bold text-foreground truncate", children: upiId })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      className: `shrink-0 gap-1 h-7 text-xs ${copied ? "border-emerald-500/50 text-emerald-400" : ""}`,
                      onClick: copyUpi,
                      type: "button",
                      children: [
                        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3" }),
                        copied ? "Copied" : "Copy"
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-1.5 rounded-lg px-3 py-2 border border-amber-500/20",
                style: { background: "oklch(0.72 0.22 68 / 0.06)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-400/90", children: [
                    "Pay exactly ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "₹99" }),
                    " and upload screenshot with UTR"
                  ] })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function GetCertificate() {
  const { actor, isReady, ensureUserRole } = useBackend();
  const { hasCertificate } = useCertificateStatus();
  const queryClient = useQueryClient();
  const [fullName, setFullName] = reactExports.useState("");
  const [state, setState] = reactExports.useState("");
  const [country, setCountry] = reactExports.useState("India");
  const [email, setEmail] = reactExports.useState("");
  const [experience, setExperience] = reactExports.useState("");
  const [ss1, setSs1] = reactExports.useState(null);
  const [ss2, setSs2] = reactExports.useState(null);
  const [payss, setPayss] = reactExports.useState(null);
  const [utr, setUtr] = reactExports.useState("");
  const [utrErr, setUtrErr] = reactExports.useState("");
  const [done, setDone] = reactExports.useState(false);
  const { data: upiConfig, isLoading: upiLoading } = useQuery({
    queryKey: ["upi-config"],
    queryFn: async () => {
      if (!actor) throw new Error("Not ready");
      return actor.getUpiConfig();
    },
    enabled: isReady
  });
  const toBlob = reactExports.useCallback(
    async (f) => ExternalBlob.fromBytes(new Uint8Array(await f.arrayBuffer())),
    []
  );
  const submitMut = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not ready");
      await ensureUserRole();
      if (!ss1) throw new Error("Trade screenshot required");
      if (!payss) throw new Error("Payment screenshot required");
      if (!utr.trim() || utr.trim().length < 8)
        throw new Error("Valid UTR required");
      const a = actor;
      if (typeof a.submitCertificateRequest !== "function")
        throw new Error("Feature unavailable");
      return await a.submitCertificateRequest(
        fullName.trim(),
        state.trim(),
        country.trim(),
        email.trim() || null,
        experience || null,
        await toBlob(ss1),
        ss2 ? await toBlob(ss2) : null,
        await toBlob(payss),
        utr.trim()
      );
    },
    onSuccess: () => {
      setDone(true);
      setFullName("");
      setState("");
      setCountry("India");
      setEmail("");
      setExperience("");
      setSs1(null);
      setSs2(null);
      setPayss(null);
      setUtr("");
      setUtrErr("");
      queryClient.invalidateQueries({ queryKey: ["my-certificates"] });
      queryClient.invalidateQueries({ queryKey: ["hasCertificate"] });
      ue.success("Request submitted! Pending review.");
    },
    onError: (e) => ue.error("Submission failed", {
      description: e instanceof Error ? e.message : String(e)
    })
  });
  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName.trim()) {
      ue.error("Full name is required");
      return;
    }
    if (!state.trim()) {
      ue.error("State is required");
      return;
    }
    if (!country.trim()) {
      ue.error("Country is required");
      return;
    }
    if (!ss1) {
      ue.error("Trade screenshot required");
      return;
    }
    if (!payss) {
      ue.error("Payment screenshot required");
      return;
    }
    if (!utr.trim() || utr.trim().length < 8) {
      setUtrErr("Valid UTR required (min 8 chars)");
      return;
    }
    submitMut.mutate();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 space-y-6 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-heading-1 text-2xl flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "stat-icon-bg w-9 h-9 shrink-0",
            style: {
              background: "linear-gradient(135deg, oklch(0.72 0.22 68 / 0.28) 0%, oklch(0.72 0.22 68 / 0.15) 100%)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-amber-400" })
          }
        ),
        "Get Certificate",
        hasCertificate && /* @__PURE__ */ jsxRuntimeExports.jsx(GoldenTickBadge, { show: true, size: "md" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 ml-11", children: "Submit profitable trades and receive a verified trader certificate with a golden tick badge" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-amber-500/20 px-5 py-4 flex items-center gap-4",
        style: { background: "oklch(0.72 0.22 68 / 0.06)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-amber-400 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Certified Trader Badge 🟡" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Upon approval, golden tick appears on your profile everywhere your username shows." })
          ] })
        ]
      }
    ),
    done && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 rounded-xl border border-emerald-500/25 px-5 py-4",
        style: { background: "oklch(0.65 0.25 142 / 0.06)" },
        "data-ocid": "cert-submitted-banner",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-emerald-400 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-emerald-400", children: "Request submitted! Pending review." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-400/80 mt-0.5", children: "Admin will verify your application. Check the history below for updates." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "rounded-2xl border border-border/50 p-6 space-y-5",
          style: {
            background: "linear-gradient(145deg, oklch(0.155 0.03 265 / 0.9) 0%, oklch(0.14 0.025 260 / 0.9) 100%)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "Certificate Application" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Fill your details and upload trade proof" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest", children: "Personal Information" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "cert-fullname",
                    className: "text-sm font-semibold text-foreground",
                    children: [
                      "Full Name ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "cert-fullname",
                    placeholder: "As it will appear on certificate",
                    value: fullName,
                    onChange: (e) => setFullName(e.target.value),
                    className: "h-11 input-premium",
                    "data-ocid": "cert-fullname-input",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "cert-state",
                      className: "text-sm font-semibold text-foreground",
                      children: [
                        "State ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "cert-state",
                      placeholder: "e.g. Maharashtra",
                      value: state,
                      onChange: (e) => setState(e.target.value),
                      className: "h-11 input-premium",
                      "data-ocid": "cert-state-input",
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Label,
                    {
                      htmlFor: "cert-country",
                      className: "text-sm font-semibold text-foreground",
                      children: [
                        "Country ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "cert-country",
                      placeholder: "e.g. India",
                      value: country,
                      onChange: (e) => setCountry(e.target.value),
                      className: "h-11 input-premium",
                      "data-ocid": "cert-country-input",
                      required: true
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "cert-email",
                    className: "text-sm font-semibold text-foreground flex items-center gap-1.5",
                    children: [
                      "Email",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "(optional)" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "cert-email",
                    type: "email",
                    placeholder: "For certificate delivery",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    className: "h-11 input-premium",
                    "data-ocid": "cert-email-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-semibold text-foreground flex items-center gap-1.5", children: [
                  "Experience",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "(optional)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: experience, onValueChange: setExperience, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "h-11 input-premium",
                      "data-ocid": "cert-experience-select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select level" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Beginner", children: "Beginner" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Intermediate", children: "Intermediate" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Advanced", children: "Advanced" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest", children: "Trade Proof" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DropZone,
                {
                  file: ss1,
                  onFile: setSs1,
                  label: "Trade Screenshot 1",
                  required: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DropZone,
                {
                  file: ss2,
                  onFile: setSs2,
                  label: "Trade Screenshot 2 (optional)"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest", children: "Payment Proof (₹99)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                DropZone,
                {
                  file: payss,
                  onFile: setPayss,
                  label: "Payment Screenshot",
                  required: true
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Label,
                  {
                    htmlFor: "cert-utr",
                    className: "text-sm font-semibold text-foreground flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                      "UTR / Reference Number",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "cert-utr",
                    placeholder: "e.g. 401234567890",
                    value: utr,
                    onChange: (e) => {
                      setUtr(e.target.value);
                      setUtrErr("");
                    },
                    onBlur: () => {
                      if (!utr.trim() || utr.trim().length < 8)
                        setUtrErr("Min 8 chars required");
                    },
                    className: `h-11 input-premium font-mono ${utrErr ? "input-invalid" : ""}`,
                    "data-ocid": "cert-utr-input"
                  }
                ),
                utrErr && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive", children: [
                  "⚠ ",
                  utrErr
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full h-12 font-semibold text-base gap-2 shadow-elevated",
                disabled: submitMut.isPending,
                "data-ocid": "cert-submit-btn",
                children: submitMut.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  " Submitting…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                  " Submit Application — ₹99"
                ] })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        upiLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl p-5 border border-border/50 space-y-3 bg-card/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-xl" })
        ] }) : upiConfig ? /* @__PURE__ */ jsxRuntimeExports.jsx(UpiCard, { config: upiConfig }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl p-5 border border-border/50 text-sm text-muted-foreground text-center bg-card/50", children: "UPI config unavailable." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl border border-border/40 p-5 space-y-3",
            style: { background: "oklch(0.155 0.03 265 / 0.5)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest", children: "How it works" }),
              [
                "Fill form with trading details",
                "Upload 1–2 profitable trade screenshots",
                "Pay ₹99 via UPI and upload proof",
                "Admin verifies → Certificate + Golden Tick!"
              ].map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: i + 1 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t })
              ] }, t))
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CertHistory, {})
  ] });
}
export {
  GetCertificate as default
};
