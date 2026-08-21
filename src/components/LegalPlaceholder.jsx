// Marqueur visuel pour les informations légales que digyo doit encore fournir
// (RCCM, hébergeur, etc.) — volontairement voyant pour qu'aucun placeholder ne
// parte en production sans avoir été remplacé par la vraie donnée.
export default function LegalPlaceholder({ children }) {
  return (
    <span className="rounded bg-ambre/20 px-1.5 py-0.5 font-mono text-[0.8em] font-semibold text-ambre-dark">
      {children}
    </span>
  );
}
