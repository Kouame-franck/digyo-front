import { Link } from "react-router-dom";

// Pop-up d'incitation, glissée en bas à gauche (le widget de support occupe déjà le bas à
// droite -- voir SupportWidget.jsx). Le contenu est injecté par l'appelant (voir SiteNudges.jsx
// pour les deux variantes) ; `accent` bascule la palette lagune/ambre pour que les deux
// suggestions restent visuellement distinctes l'une de l'autre.
export default function NudgePopup({
  icon,
  eyebrow,
  title,
  message,
  ctaLabel,
  ctaTo,
  onCtaClick,
  accent = "lagune",
  onDismiss,
}) {
  const isAmbre = accent === "ambre";
  const ctaClassName = `mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
    isAmbre ? "bg-ambre text-panel hover:bg-ambre-dark" : "bg-lagune text-white hover:bg-lagune-dark"
  }`;
  const ctaArrow = (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="animate-nudge-in fixed bottom-6 left-6 z-40 w-[22rem] max-w-[calc(100vw-3rem)]">
      <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-2xl shadow-panel/25">
        {/* Halo de couleur discret, purement décoratif -- ce qui distingue ce pop-up d'une
            simple carte administrative et lui donne un peu de relief. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full blur-3xl ${
            isAmbre ? "bg-ambre/25" : "bg-lagune/25"
          }`}
        />

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fermer"
          className="absolute right-3 top-3 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-ink/10 hover:text-ink"
        >
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative p-5 pr-10">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              isAmbre ? "bg-ambre/15 text-ambre-dark" : "bg-lagune/15 text-lagune-dark"
            }`}
          >
            {icon}
          </span>

          <p
            className={`mt-4 text-[11px] font-bold uppercase tracking-widest ${
              isAmbre ? "text-ambre-dark" : "text-lagune-dark"
            }`}
          >
            {eyebrow}
          </p>
          <p className="mt-1.5 font-display text-base font-bold leading-snug text-ink">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">{message}</p>

          {onCtaClick ? (
            <button
              type="button"
              onClick={() => {
                onCtaClick();
                onDismiss();
              }}
              className={ctaClassName}
            >
              {ctaLabel}
              {ctaArrow}
            </button>
          ) : (
            <Link to={ctaTo} onClick={onDismiss} className={ctaClassName}>
              {ctaLabel}
              {ctaArrow}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
