import { createContext, useCallback, useContext, useState } from "react";
import QuickDiagnosticModal from "../components/QuickDiagnosticModal";
import DeepDiagnosticModal from "../components/DeepDiagnosticModal";

const DiagnosticModalContext = createContext(null);

// Instance unique, montée à la racine, ouvrable depuis n'importe quel point d'entrée marketing
// (bouton hero de l'accueil, pop-up nudge...) -- distincte de celle d'Espace client, qui gère
// elle-même son état car elle affiche aussi un tableau de bord autour de la fiche.
export function DiagnosticModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [deepFormOpen, setDeepFormOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  const openDiagnosticModal = useCallback(() => setOpen(true), []);
  const closeDiagnosticModal = useCallback(() => setOpen(false), []);

  return (
    <DiagnosticModalContext.Provider value={{ openDiagnosticModal }}>
      {children}
      <QuickDiagnosticModal
        open={open}
        onClose={closeDiagnosticModal}
        profile={profile}
        onProfileChange={setProfile}
        onOpenDeepForm={() => setDeepFormOpen(true)}
      />
      <DeepDiagnosticModal
        open={deepFormOpen}
        onClose={() => setDeepFormOpen(false)}
        profile={profile}
        onSubmitted={setProfile}
      />
    </DiagnosticModalContext.Provider>
  );
}

export function useDiagnosticModal() {
  const ctx = useContext(DiagnosticModalContext);
  if (!ctx) {
    throw new Error("useDiagnosticModal doit être utilisé sous DiagnosticModalProvider");
  }
  return ctx;
}
