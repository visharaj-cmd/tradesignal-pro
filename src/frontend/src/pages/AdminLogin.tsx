import { useAdmin } from "@/contexts/AdminContext";
import {
  Crown,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Shield,
  ShieldCheck,
  UserCheck,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ADMIN_PASSWORD = "11760000";

export default function AdminLogin() {
  const { isAdmin, setAdminStatus } = useAdmin();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"admin" | "superadmin">(
    "admin",
  );

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
      const role = selectedRole;
      setAdminStatus(true, role);
      const roleLabel = role === "superadmin" ? "Superadmin" : "Admin";
      toast.success(`Welcome back, ${roleLabel}`, {
        description: "Access granted to IGNOU control panel.",
      });
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
          className="absolute left-1/2 top-1/3 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, oklch(0.72 0.17 70 / 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute right-0 bottom-0 rounded-full"
          style={{
            width: 420,
            height: 420,
            background:
              "radial-gradient(circle, oklch(0.58 0.14 25 / 0.12) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute left-0 top-0 rounded-full"
          style={{
            width: 320,
            height: 320,
            background:
              "radial-gradient(circle, oklch(0.72 0.17 70 / 0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Brand header */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col items-center mb-8"
        >
          {/* Logo */}
          <div className="relative mb-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.17 70 / 0.2) 0%, oklch(0.58 0.14 25 / 0.15) 100%)",
                border: "1px solid oklch(0.72 0.17 70 / 0.3)",
                boxShadow: "0 0 24px oklch(0.72 0.17 70 / 0.2)",
              }}
            >
              <span className="font-display font-bold text-primary text-2xl">
                I
              </span>
            </div>
          </div>

          {/* Brand name */}
          <div className="text-center mb-3">
            <h1 className="font-display font-black text-2xl tracking-tight mb-0.5 text-foreground">
              IGNOU
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary/70">
              Student Services
            </p>
          </div>

          {/* Admin badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold bg-primary/10 border-primary/30 text-primary">
            <Shield className="w-3 h-3" />
            Administration Portal
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-4 mt-4">
            {["Encrypted", "Restricted", "Secure"].map((label) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_5px_oklch(var(--success)/0.6)]" />
                <span className="text-xs text-muted-foreground font-mono">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Login card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="card-elevated p-6"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 rounded-xl px-4 py-3 text-sm flex items-center gap-2.5 border bg-destructive/10 border-destructive/30 text-destructive"
              data-ocid="admin.error_state"
            >
              <Lock className="h-4 w-4 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role selector */}
            <div className="space-y-2">
              <span className="text-label">Select Role</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole("admin")}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-smooth border ${
                    selectedRole === "admin"
                      ? "bg-primary/15 border-primary/40 text-primary"
                      : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid="admin.role.admin_button"
                >
                  <UserCheck className="h-4 w-4" />
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("superadmin")}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-smooth border ${
                    selectedRole === "superadmin"
                      ? "bg-accent/15 border-accent/40 text-accent"
                      : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid="admin.role.superadmin_button"
                >
                  <Crown className="h-4 w-4" />
                  Superadmin
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-label">
                Admin Password
              </label>
              <div
                className={`relative transition-smooth rounded-lg ${isFocused ? "shadow-[0_0_0_2px_oklch(0.72_0.17_70/0.3)]" : ""}`}
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
                  data-ocid="admin.password.input"
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
              data-ocid="admin.submit_button"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying credentials…
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Access Admin Panel
                  <ShieldCheck className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.45 }}
          className="flex items-center justify-center gap-2 mt-6"
        >
          <div className="h-px flex-1 bg-border/30" />
          <p className="text-xs text-muted-foreground px-3 font-mono">
            Restricted · Authorized Personnel Only
          </p>
          <div className="h-px flex-1 bg-border/30" />
        </motion.div>
      </div>
    </div>
  );
}
