import { createContext, useCallback, useContext, useRef, useState } from "react";
import AuthModal from "../components/AuthModal";

const AuthModalContext = createContext(null);

export function AuthModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [initialTab, setInitialTab] = useState("login");
  // Callback à un coup, lu via une ref pour ne pas forcer un re-render de tout le provider à
  // chaque appel (ex. QuickDiagnosticModal qui rouvre la connexion pour sauvegarder son brouillon).
  const onSuccessRef = useRef(null);

  const openAuthModal = useCallback((tab = "login", { onSuccess } = {}) => {
    onSuccessRef.current = onSuccess || null;
    setInitialTab(tab);
    setOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => setOpen(false), []);

  const handleAuthSuccess = useCallback(() => {
    const callback = onSuccessRef.current;
    onSuccessRef.current = null;
    callback?.();
  }, []);

  return (
    <AuthModalContext.Provider value={{ openAuthModal }}>
      {children}
      <AuthModal open={open} initialTab={initialTab} onClose={closeAuthModal} onSuccess={handleAuthSuccess} />
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
