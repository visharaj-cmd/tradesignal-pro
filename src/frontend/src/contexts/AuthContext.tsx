import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AuthUser } from "../types";

const AUTH_KEY = "userAuth";
const PROFILE_KEY = "userProfile";

export interface StoredUser {
  name: string;
  email: string;
  passwordHash: string;
  createdAt: number;
}

export interface UserProfile {
  username: string;
  avatarUrl: string | null;
}

// Simple hash function for password storage
function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

export function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem("registeredUsers") || "[]");
  } catch {
    return [];
  }
}

export function saveUser(user: StoredUser): void {
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

export function findUser(email: string, password: string): StoredUser | null {
  const users = getStoredUsers();
  const ph = hashPassword(password);
  return users.find((u) => u.email === email && u.passwordHash === ph) ?? null;
}

export function registerUser(
  name: string,
  email: string,
  password: string,
): { success: boolean; error?: string } {
  const users = getStoredUsers();
  if (users.find((u) => u.email === email)) {
    return {
      success: false,
      error: "An account with this email already exists",
    };
  }
  saveUser({
    name,
    email,
    passwordHash: hashPassword(password),
    createdAt: Date.now(),
  });
  return { success: true };
}

interface AuthSession {
  email: string;
  name: string;
  loginAt: number;
}

function getSession(): AuthSession | null {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
  } catch {
    return null;
  }
}

export function getProfile(email: string): UserProfile {
  try {
    const all = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
    return all[email] ?? { username: "", avatarUrl: null };
  } catch {
    return { username: "", avatarUrl: null };
  }
}

export function saveProfile(email: string, profile: UserProfile): void {
  try {
    const all = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
    all[email] = profile;
    localStorage.setItem(PROFILE_KEY, JSON.stringify(all));
  } catch {
    // ignore
  }
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  currentSession: AuthSession | null;
  loginWithEmail: (
    email: string,
    password: string,
  ) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (username: string, avatarUrl: string | null) => void;
  profile: UserProfile;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  currentSession: null,
  loginWithEmail: () => ({ success: false }),
  logout: () => {},
  updateProfile: () => {},
  profile: { username: "", avatarUrl: null },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { identity, loginStatus, clear } = useInternetIdentity();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [profile, setProfileState] = useState<UserProfile>({
    username: "",
    avatarUrl: null,
  });

  // Initialize from localStorage or II
  useEffect(() => {
    const storedSession = getSession();
    if (storedSession) {
      setSession(storedSession);
      setUser({ principal: storedSession.email, isAdmin: false });
      setProfileState(getProfile(storedSession.email));
      setIsLoading(false);
      return;
    }

    // Fall back to Internet Identity
    if (loginStatus === "initializing" || loginStatus === "logging-in") {
      setIsLoading(true);
      return;
    }

    if (loginStatus === "success" && identity) {
      const principal = identity.getPrincipal().toText();
      setUser({ principal, isAdmin: false });
      setProfileState(getProfile(principal));
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, [loginStatus, identity]);

  const loginWithEmail = useCallback(
    (email: string, password: string): { success: boolean; error?: string } => {
      const matched = findUser(email, password);
      if (!matched) {
        return { success: false, error: "Invalid email or password" };
      }
      const newSession: AuthSession = {
        email: matched.email,
        name: matched.name,
        loginAt: Date.now(),
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(newSession));
      setSession(newSession);
      setUser({ principal: matched.email, isAdmin: false });
      setProfileState(getProfile(matched.email));
      return { success: true };
    },
    [],
  );

  const updateProfile = useCallback(
    (username: string, avatarUrl: string | null) => {
      const key = session?.email ?? user?.principal ?? "";
      if (!key) return;
      const newProfile = { username, avatarUrl };
      saveProfile(key, newProfile);
      setProfileState(newProfile);
    },
    [session, user],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    clear();
    setUser(null);
    setSession(null);
    window.location.replace("/login");
  }, [clear]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        currentSession: session,
        loginWithEmail,
        logout,
        updateProfile,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
