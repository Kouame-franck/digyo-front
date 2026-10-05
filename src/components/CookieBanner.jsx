import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CONSENT_OPEN_EVENT, setConsent } from "../lib/analytics";
import useAnalyticsConsent from "../hooks/useAnalyticsConsent";

// Recueil du consentement pour Google Analytics (voir lib/analytics.js). Même emplacement que
// NudgePopup (bas à gauche, le widget de support occupe le bas à droite) : SiteNudges attend que
// le visiteur ait répondu ici avant d'afficher sa suggestion, les deux ne se superposent jamais.
// « Non merci » est aussi visible que « J'accepte » : un refus doit être aussi simple qu'un accord.
export default function CookieBanner() {
  const consent = useAnalyticsConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  if (consent && !reopened) return null;

  function choose(value) {
    setConsent(value);
    setReopened(false);
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      className="animate-nudge-in fixed bottom-6 left-6 z-50 w-[24rem] max-w-[calc(100vw-3rem)]"
    >
      <div className="rounded-3xl border border-ink/10 bg-surface p-5 shadow-2xl shadow-panel/25">
        <p id="cookie-banner-title" className="font-display text-base font-bold text-ink">
          digyo utilise des cookies
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          Pour améliorer votre expérience, en toute confidentialité.{" "}
          <Link
            to="/politique-de-confidentialite"
            className="text-lagune-dark underline-offset-2 hover:underline"
          >
            En savoir plus
          </Link>
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="flex-1 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/5"
          >
            Non merci
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="flex-1 rounded-full bg-lagune px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
          >
            J'accepte
          </button>
        </div>
      </div>
    </div>
  );
}
