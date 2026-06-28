import type { AdminRole } from "@/types";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

const ADMIN_AUTH_KEY = "adminAuth";
const ADMIN_ROLE_KEY = "adminRole";

interface AdminContextValue {
  isAdmin: boolean;
  isSuperAdmin: boolean;
  adminRole: AdminRole;
  isCheckingAdmin: boolean;
  setAdminStatus: (status: boolean, role?: AdminRole) => void;
  setCheckingAdmin: (checking: boolean) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  isSuperAdmin: false,
  adminRole: "none",
  isCheckingAdmin: false,
  setAdminStatus: () => {},
  setCheckingAdmin: () => {},
  logout: () => {},
});

function getStoredRole(): AdminRole {
  const raw = localStorage.getItem(ADMIN_ROLE_KEY);
  if (raw === "superadmin" || raw === "admin") return raw;
  return "none";
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
  });
  const [adminRole, setAdminRole] = useState<AdminRole>(() => getStoredRole());
  const [isCheckingAdmin, setCheckingAdmin] = useState(false);

  const isSuperAdmin = adminRole === "superadmin";

  const setAdminStatus = useCallback(
    (status: boolean, role: AdminRole = "admin") => {
      if (status) {
        localStorage.setItem(ADMIN_AUTH_KEY, "true");
        localStorage.setItem(ADMIN_ROLE_KEY, role);
      } else {
        localStorage.removeItem(ADMIN_AUTH_KEY);
        localStorage.removeItem(ADMIN_ROLE_KEY);
      }
      setIsAdmin(status);
      setAdminRole(status ? role : "none");
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    localStorage.removeItem(ADMIN_ROLE_KEY);
    setIsAdmin(false);
    setAdminRole("none");
    window.location.replace("/admin/login");
  }, []);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isSuperAdmin,
        adminRole,
        isCheckingAdmin,
        setAdminStatus,
        setCheckingAdmin,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
