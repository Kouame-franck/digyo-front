import { createContext, useCallback, useContext, useState } from "react";
import AuthModal from "../components/AuthModal";

const AuthModalContext = createContext(null);

export function AuthModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [initialTab, setInitialTab] = useState("login");

  const openAuthModal = useCallback((tab = "login") => {
    setInitialTab(tab);
    setOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => setOpen(false), []);

  return (
    <AuthModalContext.Provider value={{ openAuthModal }}>
      {children}
      <AuthModal open={open} initialTab={initialTab} onClose={closeAuthModal} />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal doit être utilisé sous AuthModalProvider");
  }
  return ctx;
}
