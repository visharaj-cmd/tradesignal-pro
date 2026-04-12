import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBackend } from "@/hooks/useBackend";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { loginWithEmail } = useAuth();
  const { ensureUserRole, actor } = useBackend();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [savedEmail, setSavedEmail] = useState(false);

  function validateForm() {
    const e: { email?: string; password?: string } = {};
    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 8)
      e.password = "Password must be at least 8 characters";
    setErrors((prev) => ({ ...prev, ...e }));
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
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
            "[Login] ensureUserRole failed — will retry on next action",
          );
        }
      }
      setStatusMessage("");
      toast.success("Welcome back!", {
        description: "Signed in successfully.",
      });
      navigate({ to: "/dashboard" });
    } else {
      setStatusMessage("");
      setErrors((prev) => ({ ...prev, form: result.error }));
      toast.error("Sign in failed", { description: result.error });
    }
    setIsSubmitting(false);
  }

  const emailValid = touched.email && !errors.email && email;
  const passwordValid = touched.password && !errors.password && password;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Multi-layer ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-primary/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-premium relative"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.3) 0%, oklch(0.76 0.21 210 / 0.2) 100%)",
              border: "1px solid oklch(0.72 0.19 220 / 0.4)",
            }}
          >
            <TrendingUp className="w-8 h-8 text-primary" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-100" />
            </span>
          </div>
          <h1 className="text-heading-1 text-3xl">TradeSignal Pro</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Institutional-grade signals, ₹1/day
          </p>
        </div>

        {/* Card */}
        <div className="card-elevated rounded-2xl p-8 border border-border/60">
          <div className="mb-6">
            <h2 className="text-heading-2 text-xl mb-1">Sign in</h2>
            <p className="text-sm text-muted-foreground">
              Access your dashboard and live signals
            </p>
          </div>

          {/* Form-level error */}
          {errors.form && (
            <div className="mb-5 rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 text-[10px] font-bold">
                !
              </span>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="login-email"
                className="text-sm font-semibold text-foreground flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                Email address
              </Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSavedEmail(false);
                  setErrors((p) => ({
                    ...p,
                    email: undefined,
                    form: undefined,
                  }));
                }}
                onBlur={() => {
                  setTouched((p) => ({ ...p, email: true }));
                  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                    setSavedEmail(true);
                  validateForm();
                }}
                className={`h-11 input-premium w-full ${
                  errors.email && touched.email ? "input-invalid" : ""
                } ${emailValid ? "input-valid" : ""}`}
                data-ocid="login-email-input"
                autoComplete="email"
                disabled={isSubmitting}
              />
              {errors.email && touched.email && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <span>⚠</span> {errors.email}
                </p>
              )}
              {savedEmail && !errors.email && (
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Valid email
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="login-password"
                className="text-sm font-semibold text-foreground flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((p) => ({
                      ...p,
                      password: undefined,
                      form: undefined,
                    }));
                  }}
                  onBlur={() => {
                    setTouched((p) => ({ ...p, password: true }));
                    validateForm();
                  }}
                  className={`pr-10 h-11 input-premium w-full ${
                    errors.password && touched.password ? "input-invalid" : ""
                  } ${passwordValid ? "input-valid" : ""}`}
                  data-ocid="login-password-input"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <span>⚠</span> {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 font-semibold text-base gap-2 shadow-elevated hover:shadow-premium transition-smooth mt-2"
              disabled={isSubmitting}
              data-ocid="login-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {statusMessage || "Signing in…"}
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  Sign in
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-border/50">
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary hover:text-primary/80 font-semibold transition-colors underline-offset-2 hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Trust signal */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Secured &amp; Encrypted · TradeSignal Pro</span>
        </div>
      </div>
    </div>
  );
}
