import type { ReactNode } from "react";
import { useAdmin } from "../contexts/AdminContext";
import { LoadingSpinner } from "./ui/LoadingSpinner";

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
