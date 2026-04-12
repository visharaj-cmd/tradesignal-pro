import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

const ADMIN_AUTH_KEY = "adminAuth";

interface AdminContextValue {
  isAdmin: boolean;
  isCheckingAdmin: boolean;
  setAdminStatus: (status: boolean) => void;
  setCheckingAdmin: (checking: boolean) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  isCheckingAdmin: false,
  setAdminStatus: () => {},
  setCheckingAdmin: () => {},
  logout: () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
  });
  const [isCheckingAdmin, setCheckingAdmin] = useState(false);

  const setAdminStatus = useCallback((status: boolean) => {
    if (status) {
      localStorage.setItem(ADMIN_AUTH_KEY, "true");
    } else {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    }
    setIsAdmin(status);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAdmin(false);
    window.location.replace("/admin/login");
  }, []);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
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
