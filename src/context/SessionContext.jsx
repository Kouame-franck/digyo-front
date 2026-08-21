import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } catch {
      // la session cliente est déjà purgée ; on ignore l'échec réseau
    }
  }, []);

  return (
    <SessionContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession doit être utilisé sous SessionProvider");
  }
  return ctx;
}
