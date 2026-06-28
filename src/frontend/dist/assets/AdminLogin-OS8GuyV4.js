import { c as createLucideIcon, u as useAdmin, r as reactExports, j as jsxRuntimeExports, a as Crown, S as ShieldCheck, b as ue } from "./index-WNiHIFOH.js";
import { m as motion } from "./proxy-Cacrna30.js";
import { S as Shield, Z as Zap } from "./zap-BJSXT-ux.js";
import { L as Lock } from "./lock-Kdp_IVmn.js";
import { L as LoaderCircle } from "./loader-circle-zbmAspcE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$1);
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
const ADMIN_PASSWORD = "11760000";
function AdminLogin() {
  const { isAdmin, setAdminStatus } = useAdmin();
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [isFocused, setIsFocused] = reactExports.useState(false);
  const [selectedRole, setSelectedRole] = reactExports.useState(
    "admin"
  );
  reactExports.useEffect(() => {
    if (isAdmin) window.location.replace("/admin");
  }, [isAdmin]);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter the admin password");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 450));
    if (password === ADMIN_PASSWORD) {
      const role = selectedRole;
      setAdminStatus(true, role);
      const roleLabel = role === "superadmin" ? "Superadmin" : "Admin";
      ue.success(`Welcome back, ${roleLabel}`, {
        description: "Access granted to IGNOU control panel."
      });
      window.location.replace("/admin");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
    setIsSubmitting(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute left-1/2 top-1/3 rounded-full -translate-x-1/2 -translate-y-1/2",
          style: {
            width: 700,
            height: 700,
            background: "radial-gradient(circle, oklch(0.72 0.17 70 / 0.15) 0%, transparent 70%)",
            filter: "blur(60px)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute right-0 bottom-0 rounded-full",
          style: {
            width: 420,
            height: 420,
            background: "radial-gradient(circle, oklch(0.58 0.14 25 / 0.12) 0%, transparent 70%)",
            filter: "blur(70px)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute left-0 top-0 rounded-full",
          style: {
            width: 320,
            height: 320,
            background: "radial-gradient(circle, oklch(0.72 0.17 70 / 0.1) 0%, transparent 70%)",
            filter: "blur(60px)"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55 },
          className: "flex flex-col items-center mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-20 h-20 rounded-2xl flex items-center justify-center",
                style: {
                  background: "linear-gradient(135deg, oklch(0.72 0.17 70 / 0.2) 0%, oklch(0.58 0.14 25 / 0.15) 100%)",
                  border: "1px solid oklch(0.72 0.17 70 / 0.3)",
                  boxShadow: "0 0 24px oklch(0.72 0.17 70 / 0.2)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-2xl", children: "I" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-2xl tracking-tight mb-0.5 text-foreground", children: "IGNOU" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.22em] text-primary/70", children: "Student Services" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold bg-primary/10 border-primary/30 text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3" }),
              "Administration Portal"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mt-4", children: ["Encrypted", "Restricted", "Secure"].map((label) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_5px_oklch(var(--success)/0.6)]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: label })
            ] }, label)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15, duration: 0.55 },
          className: "card-elevated p-6",
          children: [
            error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: -8 },
                animate: { opacity: 1, y: 0 },
                className: "mb-5 rounded-xl px-4 py-3 text-sm flex items-center gap-2.5 border bg-destructive/10 border-destructive/30 text-destructive",
                "data-ocid": "admin.error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 shrink-0" }),
                  error
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-label", children: "Select Role" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSelectedRole("admin"),
                      className: `flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-smooth border ${selectedRole === "admin" ? "bg-primary/15 border-primary/40 text-primary" : "bg-secondary border-border text-muted-foreground hover:text-foreground"}`,
                      "data-ocid": "admin.role.admin_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-4 w-4" }),
                        "Admin"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setSelectedRole("superadmin"),
                      className: `flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-smooth border ${selectedRole === "superadmin" ? "bg-accent/15 border-accent/40 text-accent" : "bg-secondary border-border text-muted-foreground hover:text-foreground"}`,
                      "data-ocid": "admin.role.superadmin_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4" }),
                        "Superadmin"
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "admin-password", className: "text-label", children: "Admin Password" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `relative transition-smooth rounded-lg ${isFocused ? "shadow-[0_0_0_2px_oklch(0.72_0.17_70/0.3)]" : ""}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "admin-password",
                          type: showPassword ? "text" : "password",
                          value: password,
                          onChange: (e) => {
                            setPassword(e.target.value);
                            setError(null);
                          },
                          onFocus: () => setIsFocused(true),
                          onBlur: () => setIsFocused(false),
                          placeholder: "Enter admin password",
                          autoComplete: "current-password",
                          disabled: isSubmitting,
                          className: "input-premium w-full pr-11 disabled:opacity-50",
                          "data-ocid": "admin.password.input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowPassword((v) => !v),
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-fast",
                          "aria-label": showPassword ? "Hide password" : "Show password",
                          tabIndex: -1,
                          children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                        }
                      )
                    ]
                  }
                ),
                password.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono pl-1", children: [
                  password.length,
                  " characters entered"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  disabled: isSubmitting || !password.trim(),
                  className: "button-primary w-full h-11 flex items-center justify-center gap-2 text-sm",
                  "data-ocid": "admin.submit_button",
                  children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                    "Verifying credentials…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
                    "Access Admin Panel",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" })
                  ] })
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.5, duration: 0.45 },
          className: "flex items-center justify-center gap-2 mt-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground px-3 font-mono", children: "Restricted · Authorized Personnel Only" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border/30" })
          ]
        }
      )
    ] })
  ] });
}
export {
  AdminLogin as default
};
