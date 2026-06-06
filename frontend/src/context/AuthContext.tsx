import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AuthError, login as loginRequest } from "@/api/auth/authApi";
import type { AuthUser, LoginCredentials } from "@/api/auth/types";

const AUTH_STORAGE_KEY = "smarteco-auth";

type StoredAuth = {
  user: AuthUser;
  token: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredAuth(): StoredAuth | null {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StoredAuth;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [storedAuth, setStoredAuth] = useState<StoredAuth | null>(() =>
    readStoredAuth(),
  );
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);

    try {
      const response = await loginRequest(credentials);
      const nextAuth: StoredAuth = {
        user: response.user,
        token: response.token,
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth));
      setStoredAuth(nextAuth);
    } catch (error) {
      if (error instanceof AuthError) {
        throw error;
      }

      throw new AuthError("Unable to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setStoredAuth(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: storedAuth?.user ?? null,
      isAuthenticated: storedAuth !== null,
      isLoading,
      login,
      logout,
    }),
    [storedAuth, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}

export { AuthProvider, useAuth };
