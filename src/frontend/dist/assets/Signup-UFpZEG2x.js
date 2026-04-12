import { b as useNavigate, u as useAuth, a as useBackend, r as reactExports, j as jsxRuntimeExports, T as TrendingUp, U as User, B as Button, L as Link, S as ShieldCheck, d as registerUser, c as ue } from "./index-BO-jy2EA.js";
import { I as Input } from "./input-ChmVmaSS.js";
import { L as Label } from "./label-CY9wZVTR.js";
import { M as Mail } from "./mail-cAVUr2Sy.js";
import { L as Lock } from "./lock-DdkyLmcb.js";
import { E as EyeOff } from "./eye-off-GEyNf91p.js";
import { E as Eye } from "./eye-CilXLqny.js";
import { L as LoaderCircle } from "./loader-circle-D557w6Cq.js";
import { C as CircleCheck } from "./circle-check-DHfkSuxj.js";
import { C as CircleX } from "./circle-x-D6Yc5ibs.js";
function PasswordStrengthBar({ password }) {
  const rules = {
    length: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^a-zA-Z0-9]/.test(password)
  };
  const score = Object.values(rules).filter(Boolean).length;
  const levels = [
    {
      min: 0,
      max: 1,
      label: "Too weak",
      color: "bg-destructive",
      textColor: "text-destructive",
      width: "25%"
    },
    {
      min: 2,
      max: 2,
      label: "Weak",
      color: "bg-rose-400",
      textColor: "text-rose-400",
      width: "50%"
    },
    {
      min: 3,
      max: 3,
      label: "Medium",
      color: "bg-amber-400",
      textColor: "text-amber-400",
      width: "75%"
    },
    {
      min: 4,
      max: 4,
      label: "Strong",
      color: "bg-emerald-500",
      textColor: "text-emerald-400",
      width: "100%"
    }
  ];
  const level = levels.find((l) => score >= l.min && score <= l.max) ?? levels[0];
  if (!password) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 mt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full rounded-full transition-all duration-500 ${level.color}`,
        style: { width: level.width }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-xs font-medium ${level.textColor}`, children: [
      "Password strength: ",
      level.label
    ] })
  ] });
}
function PasswordRule({ met, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "li",
    {
      className: `flex items-center gap-1.5 text-xs transition-colors ${met ? "text-emerald-400" : "text-muted-foreground"}`,
      children: [
        met ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 shrink-0 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 shrink-0" }),
        label
      ]
    }
  );
}
function Signup() {
  const navigate = useNavigate();
  const { loginWithEmail } = useAuth();
  const { ensureUserRole, actor } = useBackend();
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const [touched, setTouched] = reactExports.useState({});
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [statusMessage, setStatusMessage] = reactExports.useState("");
  const rules = {
    length: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^a-zA-Z0-9]/.test(password)
  };
  function validateForm() {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (!rules.length || !rules.hasLetter || !rules.hasNumber || !rules.hasSpecial)
      e.password = "Password does not meet requirements";
    if (!confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (confirmPassword !== password)
      e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  async function handleSignup(e) {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });
    if (!validateForm()) return;
    setIsSubmitting(true);
    setStatusMessage("Creating account…");
    await new Promise((r) => setTimeout(r, 500));
    const result = registerUser(name.trim(), email, password);
    if (result.success) {
      loginWithEmail(email, password);
      if (actor) {
        setStatusMessage("Connecting to server…");
        const registered = await ensureUserRole();
        if (!registered) {
          console.warn(
            "[Signup] ensureUserRole failed — will retry on next action"
          );
        }
      }
      setStatusMessage("");
      ue.success("Account created successfully!", {
        description: "Welcome to TradeSignal Pro!"
      });
      navigate({ to: "/dashboard" });
    } else {
      setStatusMessage("");
      setErrors((prev) => ({ ...prev, form: result.error }));
      ue.error("Sign up failed", { description: result.error });
    }
    setIsSubmitting(false);
  }
  const showRules = touched.password && password.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-0 w-[300px] h-[300px] bg-primary/4 rounded-full blur-[80px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-premium relative",
            style: {
              background: "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.3) 0%, oklch(0.76 0.21 210 / 0.2) 100%)",
              border: "1px solid oklch(0.72 0.19 220 / 0.4)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-primary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-heading-1 text-3xl", children: "Create Account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2", children: "Start trading with professional signals for just ₹1/day" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-2xl p-8 border border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-heading-2 text-xl mb-1", children: "Get started free" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sign up to access professional trading signals" })
        ] }),
        errors.form && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 text-[10px] font-bold", children: "!" }),
          errors.form
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSignup, className: "space-y-4", noValidate: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "signup-name",
                className: "text-sm font-semibold text-foreground flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                  "Full name"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "signup-name",
                type: "text",
                placeholder: "Your full name",
                value: name,
                onChange: (e) => {
                  setName(e.target.value);
                  setErrors((p) => ({ ...p, name: void 0 }));
                },
                onBlur: () => {
                  setTouched((p) => ({ ...p, name: true }));
                  validateForm();
                },
                className: `h-11 input-premium w-full ${errors.name && touched.name ? "input-invalid" : ""} ${touched.name && !errors.name && name ? "input-valid" : ""}`,
                "data-ocid": "signup-name-input",
                autoComplete: "name",
                disabled: isSubmitting
              }
            ),
            errors.name && touched.name && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠" }),
              " ",
              errors.name
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "signup-email",
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
                id: "signup-email",
                type: "email",
                placeholder: "you@example.com",
                value: email,
                onChange: (e) => {
                  setEmail(e.target.value);
                  setErrors((p) => ({
                    ...p,
                    email: void 0,
                    form: void 0
                  }));
                },
                onBlur: () => {
                  setTouched((p) => ({ ...p, email: true }));
                  validateForm();
                },
                className: `h-11 input-premium w-full ${errors.email && touched.email ? "input-invalid" : ""} ${touched.email && !errors.email && email ? "input-valid" : ""}`,
                "data-ocid": "signup-email-input",
                autoComplete: "email",
                disabled: isSubmitting
              }
            ),
            errors.email && touched.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠" }),
              " ",
              errors.email
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "signup-password",
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
                  id: "signup-password",
                  type: showPassword ? "text" : "password",
                  placeholder: "Min. 8 chars with special character",
                  value: password,
                  onChange: (e) => {
                    setPassword(e.target.value);
                    setErrors((p) => ({ ...p, password: void 0 }));
                  },
                  onBlur: () => {
                    setTouched((p) => ({ ...p, password: true }));
                    validateForm();
                  },
                  className: `pr-10 h-11 input-premium w-full ${errors.password && touched.password ? "input-invalid" : ""} ${touched.password && !errors.password && password ? "input-valid" : ""}`,
                  "data-ocid": "signup-password-input",
                  autoComplete: "new-password",
                  disabled: isSubmitting
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                  onClick: () => setShowPassword((v) => !v),
                  "aria-label": showPassword ? "Hide password" : "Show password",
                  tabIndex: -1,
                  children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordStrengthBar, { password }),
            errors.password && touched.password && !showRules && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.password }),
            showRules && /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-2 space-y-1 pl-1 bg-muted/20 rounded-lg p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PasswordRule,
                {
                  met: rules.length,
                  label: "At least 8 characters"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PasswordRule,
                {
                  met: rules.hasLetter,
                  label: "Contains letters (a-z)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PasswordRule,
                {
                  met: rules.hasNumber,
                  label: "Contains numbers (0-9)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                PasswordRule,
                {
                  met: rules.hasSpecial,
                  label: "Contains special character (!@#$...)"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "signup-confirm",
                className: "text-sm font-semibold text-foreground flex items-center gap-1.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                  "Confirm password"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "signup-confirm",
                  type: showConfirm ? "text" : "password",
                  placeholder: "Re-enter your password",
                  value: confirmPassword,
                  onChange: (e) => {
                    setConfirmPassword(e.target.value);
                    setErrors((p) => ({ ...p, confirmPassword: void 0 }));
                  },
                  onBlur: () => {
                    setTouched((p) => ({ ...p, confirmPassword: true }));
                    validateForm();
                  },
                  className: `pr-10 h-11 input-premium w-full ${errors.confirmPassword && touched.confirmPassword ? "input-invalid" : ""} ${touched.confirmPassword && !errors.confirmPassword && confirmPassword ? "input-valid" : ""}`,
                  "data-ocid": "signup-confirm-input",
                  autoComplete: "new-password",
                  disabled: isSubmitting
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                  onClick: () => setShowConfirm((v) => !v),
                  "aria-label": showConfirm ? "Hide confirm password" : "Show confirm password",
                  tabIndex: -1,
                  children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                }
              )
            ] }),
            errors.confirmPassword && touched.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚠" }),
              " ",
              errors.confirmPassword
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              className: "w-full h-12 font-semibold text-base gap-2 shadow-elevated hover:shadow-premium transition-smooth mt-2",
              disabled: isSubmitting,
              "data-ocid": "signup-submit-btn",
              children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                statusMessage || "Creating account…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
                "Create account"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-5 border-t border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
          "Already have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/login",
              className: "text-primary hover:text-primary/80 font-semibold transition-colors underline-offset-2 hover:underline",
              children: "Sign in"
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "256-bit secured · TradeSignal Pro" })
      ] })
    ] })
  ] });
}
export {
  Signup as default
};
