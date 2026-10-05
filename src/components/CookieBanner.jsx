import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CONSENT_OPEN_EVENT, setConsent } from "../lib/analytics";
import useAnalyticsConsent from "../hooks/useAnalyticsConsent";

// Recueil du consentement pour Google Analytics (voir lib/analytics.js). Même emplacement que
// NudgePopup (bas à gauche, le widget de support occupe le bas à droite) : SiteNudges attend que
// le visiteur ait répondu ici avant d'afficher sa suggestion, les deux ne se superposent jamais.
// « Non merci » est aussi visible que « J'accepte » : un refus doit être aussi simple qu'un accord.
// Apparaît après un court délai, pour laisser le visiteur découvrir la page d'abord (rouvert via
// « Gérer les cookies », il s'affiche tout de suite).
const DELAI_MS = 2500;

export default function CookieBanner() {
  const consent = useAnalyticsConsent();
  const [reopened, setReopened] = useState(false);
  const [delaiEcoule, setDelaiEcoule] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDelaiEcoule(true), DELAI_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  if (!reopened && (consent || !delaiEcoule)) return null;

  function choose(value) {
    setConsent(value);
    setReopened(false);
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      className="animate-nudge-in fixed bottom-6 left-6 z-50 w-[19rem] max-w-[calc(100vw-3rem)]"
    >
      {/* Fond opaque, bordure marquée et ombre courte : la fenêtre se détache nettement de la
          page, sans recourir à une ombre lourde. */}
      <div className="overflow-hidden rounded-xl border border-ink/20 bg-surface shadow-[0_10px_30px_-10px_rgb(0_0_0/0.45)]">
        <div className="p-4">
          <p id="cookie-banner-title" className="font-display text-sm font-bold text-ink">
            digyo utilise des cookies
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-ink/70">
            Pour améliorer votre expérience, en toute confidentialité.{" "}
            <Link
              to="/politique-de-confidentialite"
              className="text-lagune-dark underline-offset-2 hover:underline"
            >
              En savoir plus
            </Link>
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="flex-1 rounded-lg border border-ink/15 px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-ink/5"
            >
              Non merci
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="flex-1 rounded-lg bg-lagune px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-lagune-dark"
            >
              J'accepte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
