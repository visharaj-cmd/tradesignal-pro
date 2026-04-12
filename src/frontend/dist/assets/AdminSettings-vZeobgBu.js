import { e as createLucideIcon, a as useBackend, m as useQueryClient, r as reactExports, c as ue, h as useQuery, n as useMutation, j as jsxRuntimeExports, t as LoadingSpinner, E as ExternalBlob } from "./index-BO-jy2EA.js";
import { S as Skeleton } from "./skeleton-CbFgKOIp.js";
import { S as Shield } from "./shield-DXE4vu7A.js";
import { L as LoaderCircle } from "./loader-circle-D557w6Cq.js";
import { C as CircleCheck } from "./circle-check-DHfkSuxj.js";
import { Q as QrCode } from "./qr-code-3E-Ydgpo.js";
import { U as Upload } from "./upload-cBIh6lL1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const ADMIN_PASSWORD = "11760000";
function AdminSettings() {
  const {
    actor,
    isReady,
    isAnonymousPrincipal,
    iiLoginStatus,
    loginWithII,
    claimAdminRoleWithPassword
  } = useBackend();
  const queryClient = useQueryClient();
  const fileRef = reactExports.useRef(null);
  const [upiId, setUpiId] = reactExports.useState("");
  const [upiIdTouched, setUpiIdTouched] = reactExports.useState(false);
  const [upiSaved, setUpiSaved] = reactExports.useState(false);
  const [qrFile, setQrFile] = reactExports.useState(null);
  const [qrPreview, setQrPreview] = reactExports.useState(null);
  const [isDragOver, setIsDragOver] = reactExports.useState(false);
  const [isAdminRoleClaimed, setIsAdminRoleClaimed] = reactExports.useState(false);
  const [isClaimingRole, setIsClaimingRole] = reactExports.useState(false);
  const claimAttemptedRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (isAnonymousPrincipal || !actor || !isReady) return;
    if (claimAttemptedRef.current) return;
    claimAttemptedRef.current = true;
    setIsClaimingRole(true);
    claimAdminRoleWithPassword(ADMIN_PASSWORD).then((granted) => {
      setIsAdminRoleClaimed(granted);
      if (!granted)
        ue.error("Admin role could not be granted. Please try again.");
    }).catch(() => ue.error("Failed to connect admin identity.")).finally(() => setIsClaimingRole(false));
  }, [isAnonymousPrincipal, actor, isReady, claimAdminRoleWithPassword]);
  reactExports.useEffect(() => {
    if (isAnonymousPrincipal) {
      claimAttemptedRef.current = false;
      setIsAdminRoleClaimed(false);
    }
  }, [isAnonymousPrincipal]);
  const { data: config, isLoading } = useQuery({
    queryKey: ["upi-config"],
    queryFn: async () => {
      if (!actor) throw new Error("Not ready");
      return actor.getUpiConfig();
    },
    enabled: isReady && isAdminRoleClaimed
  });
  reactExports.useEffect(() => {
    if ((config == null ? void 0 : config.upiId) && !upiIdTouched) setUpiId(config.upiId);
  }, [config == null ? void 0 : config.upiId, upiIdTouched]);
  const updateUpiMutation = useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Backend not ready");
      if (!id.trim()) throw new Error("UPI ID cannot be empty");
      return actor.updateUpiId(id.trim());
    },
    onSuccess: () => {
      ue.success("UPI ID updated");
      setUpiIdTouched(false);
      setUpiSaved(true);
      setTimeout(() => setUpiSaved(false), 2500);
      queryClient.invalidateQueries({ queryKey: ["upi-config"] });
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.toLowerCase().includes("unauthorized") || msg.toLowerCase().includes("only admin")) {
        ue.error("Admin access required", {
          description: "Please reconnect your Internet Identity."
        });
      } else {
        ue.error("Failed to update UPI ID", { description: msg });
      }
    }
  });
  const updateQrMutation = useMutation({
    mutationFn: async (file) => {
      if (!actor) throw new Error("Backend not ready");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      return actor.updateQrCode(blob);
    },
    onSuccess: () => {
      ue.success("QR code updated");
      setQrFile(null);
      setQrPreview(null);
      queryClient.invalidateQueries({ queryKey: ["upi-config"] });
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.toLowerCase().includes("unauthorized") || msg.toLowerCase().includes("only admin")) {
        ue.error("Admin access required", {
          description: "Please reconnect your Internet Identity."
        });
      } else {
        ue.error("Failed to update QR code", { description: msg });
      }
    }
  });
  const handleQrChange = (e) => {
    var _a;
    const f = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      ue.error("Please select an image file (JPG, PNG, etc.)");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      ue.error("Image too large. Please upload a file under 5 MB.");
      return;
    }
    setQrFile(f);
    if (qrPreview) URL.revokeObjectURL(qrPreview);
    setQrPreview(URL.createObjectURL(f));
    e.target.value = "";
  };
  if (isAnonymousPrincipal) {
    const isLoggingIn = iiLoginStatus === "logging-in";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-2xl mx-auto space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-heading-2", children: "Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Configure payment details for users" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-8 flex flex-col items-center text-center space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-16 h-16 rounded-2xl flex items-center justify-center",
            style: {
              background: "linear-gradient(135deg, oklch(var(--primary) / 0.18) 0%, oklch(var(--accent) / 0.12) 100%)",
              border: "1px solid oklch(var(--primary) / 0.25)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-primary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-heading-3", children: "One-Time Identity Verification" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: "Connect your Internet Identity once to enable UPI and QR code updates. This links your device securely to admin privileges." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "button-primary h-11 px-6 text-sm flex items-center gap-2 disabled:opacity-50",
            onClick: loginWithII,
            disabled: isLoggingIn,
            "data-ocid": "admin-ii-connect-btn",
            children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              " Connecting…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
              " Connect Internet Identity"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "You only need to do this once per device." })
      ] })
    ] });
  }
  if (isClaimingRole || !isAdminRoleClaimed && !claimAttemptedRef.current) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 max-w-2xl mx-auto flex items-center justify-center min-h-[40vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Authenticating admin identity…" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 max-w-2xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-heading-2", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Configure payment details shown to subscribers" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-5 py-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex h-9 w-9 items-center justify-center rounded-lg",
            style: {
              background: "linear-gradient(135deg, oklch(var(--primary) / 0.18) 0%, oklch(var(--accent) / 0.12) 100%)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "₹" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-heading-3", children: "UPI ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "The UPI ID users will send payment to" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: upiId,
              onChange: (e) => {
                setUpiId(e.target.value);
                setUpiIdTouched(true);
                setUpiSaved(false);
              },
              placeholder: "yourname@upi",
              className: "input-premium flex-1 font-mono",
              "data-ocid": "upi-id-input",
              disabled: updateUpiMutation.isPending
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "button-primary h-11 px-4 text-sm flex items-center gap-2 shrink-0 disabled:opacity-50",
              onClick: () => {
                if (!upiId.trim()) {
                  ue.error("Please enter a UPI ID.");
                  return;
                }
                updateUpiMutation.mutate(upiId);
              },
              disabled: updateUpiMutation.isPending || !upiId.trim() || upiId.trim() === (config == null ? void 0 : config.upiId),
              "data-ocid": "save-upi-btn",
              children: updateUpiMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                " Saving…"
              ] }) : upiSaved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheck,
                  {
                    className: "h-4 w-4",
                    style: { color: "oklch(var(--success))" }
                  }
                ),
                " ",
                "Saved"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                " Save"
              ] })
            }
          )
        ] }),
        (config == null ? void 0 : config.upiId) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Current:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: config.upiId })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-5 py-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex h-9 w-9 items-center justify-center rounded-lg",
            style: {
              background: "linear-gradient(135deg, oklch(var(--accent) / 0.18) 0%, oklch(var(--primary) / 0.1) 100%)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              QrCode,
              {
                className: "h-4.5 w-4.5",
                style: { color: "oklch(var(--accent))" }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-heading-3", children: "QR Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "The payment QR code shown to users" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-label", children: "Current QR" }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 w-44 rounded-xl" }) : (config == null ? void 0 : config.qrCodeBlob) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-xl border border-border overflow-hidden p-2 bg-muted/10",
              style: { boxShadow: "0 0 20px oklch(var(--accent) / 0.08)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: config.qrCodeBlob.getDirectURL(),
                  alt: "Current QR",
                  className: "h-40 w-40 rounded-lg object-contain",
                  "data-ocid": "current-qr-image"
                }
              )
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-44 w-44 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-10 w-10 text-muted-foreground opacity-30" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-label", children: "Upload New QR" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileRef,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: handleQrChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": "Upload QR code",
              className: `w-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed cursor-pointer transition-smooth min-h-[160px] px-4 py-6 text-center
                  ${isDragOver ? "border-accent/70 bg-accent/5 scale-[0.99]" : qrPreview ? "border-border bg-secondary" : "border-input bg-muted/10 hover:border-accent/40 hover:bg-accent/3"}`,
              onClick: () => {
                var _a;
                return !updateQrMutation.isPending && ((_a = fileRef.current) == null ? void 0 : _a.click());
              },
              onDragOver: (e) => {
                e.preventDefault();
                setIsDragOver(true);
              },
              onDragLeave: () => setIsDragOver(false),
              onDrop: (e) => {
                e.preventDefault();
                setIsDragOver(false);
                const f = e.dataTransfer.files[0];
                if (f) {
                  const ev = {
                    target: { files: [f] }
                  };
                  handleQrChange(ev);
                }
              },
              "data-ocid": "qr-upload",
              children: updateQrMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Uploading…" })
              ] }) : qrPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: qrPreview,
                    alt: "Preview",
                    className: "h-28 object-contain rounded-lg mb-2"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-accent font-medium", children: "Click to choose a different image" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon-bg mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Drop or click to upload" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "JPG, PNG, WEBP · max 5 MB" })
              ] })
            }
          ),
          qrFile && !updateQrMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "button-primary w-full h-11 text-sm flex items-center justify-center gap-2",
              onClick: () => updateQrMutation.mutate(qrFile),
              "data-ocid": "save-qr-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
                " Upload & Save QR Code"
              ]
            }
          )
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AdminSettings as default
};
