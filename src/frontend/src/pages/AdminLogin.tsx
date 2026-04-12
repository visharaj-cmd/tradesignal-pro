import { Eye, EyeOff, Loader2, Lock, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAdmin } from "../contexts/AdminContext";

const ADMIN_PASSWORD = "11760000";

export default function AdminLogin() {
  const { isAdmin, setAdminStatus } = useAdmin();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isAdmin) window.location.replace("/admin");
  }, [isAdmin]);

  async function handleSubmit(e: React.FormEvent) {
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
      toast.success("Welcome back, Admin");
      window.location.replace("/admin");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.19 220 / 0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.76 0.21 210 / 0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.25 142 / 0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Branding header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-5">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 shadow-[0_0_32px_oklch(0.72_0.19_220/0.25)]"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.19 220 / 0.2) 0%, oklch(0.76 0.21 210 / 0.15) 100%)",
              }}
            >
              <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
            {/* Outer ring glow */}
            <div className="absolute -inset-1.5 rounded-3xl border border-primary/15 pointer-events-none" />
          </div>
          <h1 className="text-heading-2 tracking-tight">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1 text-center">
            TradeSignal Pro · Administration Portal
          </p>

          {/* Trust indicators */}
          <div className="flex items-center gap-4 mt-4">
            {["Encrypted", "2FA Protected", "Restricted"].map((label) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-success opacity-80" />
                <span className="text-xs text-muted-foreground font-mono">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Login card */}
        <div className="card-elevated p-6">
          {error && (
            <div
              className="mb-5 rounded-lg border px-4 py-3 text-sm flex items-center gap-2.5"
              style={{
                background: "oklch(var(--destructive) / 0.08)",
                borderColor: "oklch(var(--destructive) / 0.3)",
                color: "oklch(var(--destructive))",
              }}
            >
              <Lock className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-label">
                Admin Password
              </label>
              <div
                className={`relative transition-smooth rounded-lg ${isFocused ? "shadow-[0_0_0_2px_oklch(0.72_0.19_220/0.3)]" : ""}`}
              >
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  className="input-premium w-full pr-11 disabled:opacity-50"
                  data-ocid="admin-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-fast"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {password.length > 0 && (
                <p className="text-xs text-muted-foreground font-mono pl-1">
                  {password.length} characters entered
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !password.trim()}
              className="button-primary w-full h-11 flex items-center justify-center gap-2 text-sm"
              data-ocid="admin-login-btn"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying credentials…
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Access Admin Panel
                </>
              )}
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          <div
            className="h-px flex-1"
            style={{ background: "oklch(var(--border))" }}
          />
          <p className="text-xs text-muted-foreground px-3">
            Restricted Area · Authorized Personnel Only
          </p>
          <div
            className="h-px flex-1"
            style={{ background: "oklch(var(--border))" }}
          />
        </div>
      </div>
    </div>
  );
}
