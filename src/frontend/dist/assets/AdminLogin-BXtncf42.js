import { g as useAdmin, r as reactExports, j as jsxRuntimeExports, S as ShieldCheck, c as ue } from "./index-BO-jy2EA.js";
import { L as Lock } from "./lock-DdkyLmcb.js";
import { E as EyeOff } from "./eye-off-GEyNf91p.js";
import { E as Eye } from "./eye-CilXLqny.js";
import { L as LoaderCircle } from "./loader-circle-D557w6Cq.js";
const ADMIN_PASSWORD = "11760000";
function AdminLogin() {
  const { isAdmin, setAdminStatus } = useAdmin();
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [isFocused, setIsFocused] = reactExports.useState(false);
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
      setAdminStatus(true);
      ue.success("Welcome back, Admin");
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
          className: "absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30",
          style: {
            background: "radial-gradient(circle, oklch(0.72 0.19 220 / 0.18) 0%, transparent 70%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full opacity-20",
          style: {
            background: "radial-gradient(circle, oklch(0.76 0.21 210 / 0.15) 0%, transparent 70%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute left-0 top-0 h-[300px] w-[300px] rounded-full opacity-15",
          style: {
            background: "radial-gradient(circle, oklch(0.65 0.25 142 / 0.1) 0%, transparent 70%)"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 shadow-[0_0_32px_oklch(0.72_0.19_220/0.25)]",
              style: {
                background: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.2) 0%, oklch(0.76 0.21 210 / 0.15) 100%)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-10 w-10 text-primary" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-1.5 rounded-3xl border border-primary/15 pointer-events-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-heading-2 tracking-tight", children: "Admin Panel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 text-center", children: "TradeSignal Pro · Administration Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mt-4", children: ["Encrypted", "2FA Protected", "Restricted"].map((label) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-success opacity-80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: label })
        ] }, label)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-6", children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mb-5 rounded-lg border px-4 py-3 text-sm flex items-center gap-2.5",
            style: {
              background: "oklch(var(--destructive) / 0.08)",
              borderColor: "oklch(var(--destructive) / 0.3)",
              color: "oklch(var(--destructive))"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 shrink-0" }),
              error
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "admin-password", className: "text-label", children: "Admin Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `relative transition-smooth rounded-lg ${isFocused ? "shadow-[0_0_0_2px_oklch(0.72_0.19_220/0.3)]" : ""}`,
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
                      "data-ocid": "admin-password-input"
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
              "data-ocid": "admin-login-btn",
              children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                "Verifying credentials…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
                "Access Admin Panel"
              ] })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-px flex-1",
            style: { background: "oklch(var(--border))" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground px-3", children: "Restricted Area · Authorized Personnel Only" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-px flex-1",
            style: { background: "oklch(var(--border))" }
          }
        )
      ] })
    ] })
  ] });
}
export {
  AdminLogin as default
};
