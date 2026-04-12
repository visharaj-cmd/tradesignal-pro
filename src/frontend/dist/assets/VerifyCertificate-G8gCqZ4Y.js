import { e as createLucideIcon, a as useBackend, r as reactExports, j as jsxRuntimeExports, A as Award, S as ShieldCheck, B as Button } from "./index-BO-jy2EA.js";
import { I as Input } from "./input-ChmVmaSS.js";
import { L as Label } from "./label-CY9wZVTR.js";
import { L as LoaderCircle } from "./loader-circle-D557w6Cq.js";
import { S as Search } from "./search-Da3a1oy2.js";
import { C as CircleX } from "./circle-x-D6Yc5ibs.js";
import { C as CircleCheck } from "./circle-check-DHfkSuxj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode);
function formatDate(ns) {
  return new Date(Number(ns / 1000000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
function CertResultCard({
  cert,
  certCode
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl border border-emerald-500/25 p-6 space-y-5 animate-slide-in",
      style: {
        background: "linear-gradient(145deg, oklch(0.155 0.03 265 / 0.95) 0%, oklch(0.14 0.025 260 / 0.95) 100%)"
      },
      "data-ocid": "cert-result-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
              style: {
                background: "linear-gradient(135deg, oklch(0.72 0.22 68 / 0.2) 0%, oklch(0.72 0.22 68 / 0.1) 100%)",
                border: "1px solid oklch(0.72 0.22 68 / 0.3)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-6 h-6 text-amber-400" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-lg text-foreground truncate", children: cert.fullName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Verified Trader" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-6 h-6 text-emerald-400 shrink-0 ml-auto" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
          { label: "Certificate ID", value: certCode, mono: true },
          { label: "Status", value: "VERIFIED ✓", mono: false },
          { label: "Country", value: cert.country || "—", mono: false },
          {
            label: "Date Issued",
            value: formatDate(cert.updatedAt),
            mono: false
          },
          { label: "State/Region", value: cert.state || "—", mono: false },
          { label: "Experience", value: cert.experience || "—", mono: false }
        ].map(({ label, value, mono }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-muted/20 rounded-lg p-3 border border-border/50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-1", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-sm font-semibold text-foreground break-words ${mono ? "font-mono" : ""}`,
                  children: value
                }
              )
            ]
          },
          label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 rounded-xl border border-emerald-500/25 px-4 py-3",
            style: { background: "oklch(0.65 0.25 142 / 0.06)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-emerald-400 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-emerald-400", children: "Certificate Verified ✓" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-400/70 mt-0.5", children: "Issued and verified by TradeSignal Pro" })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function VerifyCertificate() {
  const { actor, isReady } = useBackend();
  const [certCode, setCertCode] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(void 0);
  const [searching, setSearching] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  async function handleVerify(e) {
    e.preventDefault();
    if (!certCode.trim()) {
      setError("Please enter a Certificate ID");
      return;
    }
    setError("");
    setSearching(true);
    setResult(void 0);
    try {
      if (!actor) {
        setError("Network not ready. Please wait.");
        return;
      }
      const a = actor;
      if (typeof a.verifyCertificate === "function") {
        const res = await a.verifyCertificate(certCode.trim());
        setResult(res);
      } else {
        setResult(null);
      }
    } catch {
      setResult(null);
    } finally {
      setSearching(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col",
      style: {
        background: "linear-gradient(160deg, oklch(0.13 0.04 265) 0%, oklch(0.11 0.035 260) 50%, oklch(0.12 0.03 255) 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "header",
          {
            className: "border-b border-border/50 px-6 py-4",
            style: { background: "oklch(0.155 0.035 265 / 0.95)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-9 h-9 rounded-xl flex items-center justify-center border border-primary/25",
                    style: {
                      background: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.22) 0%, oklch(0.76 0.21 210 / 0.15) 100%)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-primary" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm text-foreground", children: "TradeSignal Pro" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: "Certificate Verification" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "/dashboard",
                  className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                    " Back to App"
                  ]
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 flex flex-col items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-16 h-16 rounded-2xl mx-auto flex items-center justify-center border border-amber-500/30",
                style: {
                  background: "linear-gradient(135deg, oklch(0.72 0.22 68 / 0.2) 0%, oklch(0.72 0.22 68 / 0.1) 100%)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-amber-400" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Verify Certificate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm mx-auto", children: "Enter a Certificate ID to verify its authenticity and view holder details." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleVerify,
              className: "rounded-2xl border border-border/50 p-6 space-y-4",
              style: {
                background: "linear-gradient(145deg, oklch(0.155 0.03 265 / 0.9) 0%, oklch(0.14 0.025 260 / 0.9) 100%)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "cert-verify-input",
                      className: "text-sm font-semibold text-foreground",
                      children: "Certificate ID"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "cert-verify-input",
                      placeholder: "e.g. TSP-2024-001",
                      value: certCode,
                      onChange: (e) => {
                        setCertCode(e.target.value);
                        setError("");
                        setResult(void 0);
                      },
                      className: "h-12 input-premium font-mono text-base",
                      "data-ocid": "cert-code-input",
                      autoComplete: "off",
                      autoFocus: true
                    }
                  ),
                  error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive", children: [
                    "⚠ ",
                    error
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "w-full h-12 font-semibold text-base gap-2 shadow-elevated",
                    disabled: searching || !certCode.trim() || !isReady,
                    "data-ocid": "verify-cert-btn",
                    children: searching ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                      " Verifying…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
                      " Verify Certificate"
                    ] })
                  }
                )
              ]
            }
          ),
          result !== void 0 && (result === null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl border border-rose-500/25 p-6 text-center space-y-3",
              style: {
                background: "linear-gradient(145deg, oklch(0.155 0.03 265 / 0.9) 0%, oklch(0.14 0.025 260 / 0.9) 100%)"
              },
              "data-ocid": "cert-not-found",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-muted/30 border border-border mx-auto flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-6 h-6 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Certificate not found" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                    "No approved certificate with ID",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs", children: certCode }),
                    " ",
                    "found."
                  ] })
                ] })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(CertResultCard, { cert: result, certCode })),
          result === void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground/60", children: [
            "Certificate IDs look like",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-primary/60", children: "TSP-2024-001" }),
            ". Find yours on your dashboard."
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/40 py-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground/40", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " TradeSignal Pro. Built with",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:text-muted-foreground/70 transition-colors",
              children: "caffeine.ai"
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  VerifyCertificate as default
};
