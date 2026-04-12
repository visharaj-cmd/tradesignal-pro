import type { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LoadingSpinner } from "./ui/LoadingSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.replace("/login");
    return null;
  }

  return <>{children}</>;
}
