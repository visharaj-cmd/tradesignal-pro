import { useAdmin } from "@/contexts/AdminContext";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function AdminSettings() {
  const { isSuperAdmin, adminRole } = useAdmin();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Link
            to="/admin"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth"
            data-ocid="admin.settings.back_link"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-heading-1">Settings</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Manage application settings and configuration.
        </p>
      </motion.div>

      <div className="card-premium p-8 text-center space-y-4">
        {isSuperAdmin ? (
          <>
            <ShieldCheck className="h-10 w-10 text-primary mx-auto" />
            <h3 className="font-display font-semibold text-foreground text-lg">
              Superadmin Access
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              You have full access to all settings. Use the Settings tab in the
              Admin Dashboard to edit hero content, why-choose section, footer,
              and button labels.
            </p>
            <Link
              to="/admin"
              className="button-primary text-sm inline-flex"
              data-ocid="admin.settings.goto_dashboard_button"
            >
              Go to Dashboard Settings
            </Link>
          </>
        ) : (
          <>
            <Lock className="h-10 w-10 text-muted-foreground mx-auto" />
            <h3 className="font-display font-semibold text-foreground text-lg">
              Access Restricted
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Settings editing is restricted to superadmin users only. Your
              current role: <span className="admin-badge">{adminRole}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
