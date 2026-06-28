import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useAdmin } from "@/contexts/AdminContext";
import type { ReactNode } from "react";

interface AdminRouteProps {
  children: ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAdmin, isCheckingAdmin } = useAdmin();

  if (isCheckingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAdmin) {
    window.location.replace("/admin/login");
    return null;
  }

  return <>{children}</>;
}
