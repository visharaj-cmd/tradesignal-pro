import { u as useAuth, a as useBackend, b as useNavigate, r as reactExports, j as jsxRuntimeExports, T as TrendingUp, S as ShieldCheck, B as Button, L as Link, c as ue } from "./index-BO-jy2EA.js";
import { I as Input } from "./input-ChmVmaSS.js";
import { L as Label } from "./label-CY9wZVTR.js";
import { M as Mail } from "./mail-cAVUr2Sy.js";
import { L as Lock } from "./lock-DdkyLmcb.js";
import { E as EyeOff } from "./eye-off-GEyNf91p.js";
import { E as Eye } from "./eye-CilXLqny.js";
import { L as LoaderCircle } from "./loader-circle-D557w6Cq.js";
function Login() {
  const { loginWithEmail } = useAuth();
  const { ensureUserRole, actor } = useBackend();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const [touched, setTouched] = reactExports.useState({});
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [statusMessage, setStatusMessage] = reactExports.useState("");
  const [savedEmail, setSavedEmail] = reactExports.useState(false);
  function validateForm() {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 8)
      e.password = "Password must be at least 8 characters";
    setErrors((prev) => ({ ...prev, ...e }));
    return Object.keys(e).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!validateForm()) return;
    setIsSubmitting(true);
    setStatusMessage("Signing in…");
    await new Promise((r) => setTimeout(r, 400));
    const result = loginWithEmail(email, password);
    if (result.success) {
      if (actor) {
        setStatusMessage("Connecting to server…");
        const registered = await ensureUserRole();
        if (!registered) {
          console.warn(
            "[Login] ensureUserRole failed — will retry on next action"
          );
        }
      }
      setStatusMessage("");
      ue.success("Welcome back!", {
        description: "Signed in successfully."
      });
      navigate({ to: "/dashboard" });
    } else {
      setStatusMessage("");
      setErrors((prev) => ({ ...prev, form: result.error }));
      ue.error("Sign in failed", { description: result.error });
    }
    setIsSubmitting(false);
  }
  const emailValid = touched.email && !errors.email && email;
  const passwordValid = touched.password && !errors.password && password;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-0 w-[300px] h-[300px] bg-primary/4 rounded-full blur-[80px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-premium relative",
            style: {
              background: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.3) 0%, oklch(0.76 0.21 210 / 0.2) 100%)",
              border: "1px solid oklch(0.72 0.19 220 / 0.4)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-100" }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-heading-1 text-3xl", children: "TradeSignal Pro" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2", children: "Institutional-grade signals, ₹1/day" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-2xl p-8 border border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-heading-2 text-xl mb-1", children: "Sign in" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Access your dashboard and live signals" })
        ] }),
        errors.form && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 text-[10px] font-bold", children: "!" }),
          errors.form
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", noValidate: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "login-email",
                className: "text-sm font-semibold text-foreground flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                  "Email address"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "login-email",
                type: "email",
                placeholder: "you@example.com",
                value: email,
                onChange: (e) => {
                  setEmail(e.target.value);
                  setSavedEmail(false);
                  setErrors((p) => ({
                    ...p,
                    email: void 0,
                    form: void 0
                  }));
                },
                onBlur: () => {
                  setTouched((p) => ({ ...p, email: true }));
                  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                    setSavedEmail(true);
                  validateForm();
                },
                className: `h-11 input-premium w-full ${errors.email && touched.email ? "input-invalid" : ""} ${emailValid ? "input-valid" : ""}`,
                "data-ocid": "login-email-input",
                autoComplete: "email",
                disabled: isSubmitting
              }
            ),
            errors.email && touched.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠" }),
              " ",
              errors.email
            ] }),
            savedEmail && !errors.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3 h-3" }),
              " Valid email"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "login-password",
                className: "text-sm font-semibold text-foreground flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                  "Password"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "login-password",
                  type: showPassword ? "text" : "password",
                  placeholder: "••••••••",
                  value: password,
                  onChange: (e) => {
                    setPassword(e.target.value);
                    setErrors((p) => ({
                      ...p,
                      password: void 0,
                      form: void 0
                    }));
                  },
                  onBlur: () => {
                    setTouched((p) => ({ ...p, password: true }));
                    validateForm();
                  },
                  className: `pr-10 h-11 input-premium w-full ${errors.password && touched.password ? "input-invalid" : ""} ${passwordValid ? "input-valid" : ""}`,
                  "data-ocid": "login-password-input",
                  autoComplete: "current-password",
                  disabled: isSubmitting
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded",
                  onClick: () => setShowPassword((v) => !v),
                  "aria-label": showPassword ? "Hide password" : "Show password",
                  tabIndex: -1,
                  children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                }
              )
            ] }),
            errors.password && touched.password && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠" }),
              " ",
              errors.password
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full h-12 font-semibold text-base gap-2 shadow-elevated hover:shadow-premium transition-smooth mt-2",
              disabled: isSubmitting,
              "data-ocid": "login-submit-btn",
              children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                statusMessage || "Signing in…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
                "Sign in"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-5 border-t border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
          "Don't have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/signup",
              className: "text-primary hover:text-primary/80 font-semibold transition-colors underline-offset-2 hover:underline",
              children: "Create account"
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secured & Encrypted · TradeSignal Pro" })
      ] })
    ] })
  ] });
}
export {
  Login as default
};
