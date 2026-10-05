import { useEffect, useState } from "react";
import { CONSENT_CHANGE_EVENT, getConsent } from "../lib/analytics";

// Choix du visiteur sur la mesure d'audience Google Analytics : "granted", "denied", ou null tant
// qu'il n'a pas répondu au bandeau. Se met à jour dès qu'il change d'avis (voir setConsent).
export default function useAnalyticsConsent() {
  const [consent, setConsentState] = useState(getConsent);

  useEffect(() => {
    const sync = () => setConsentState(getConsent());
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);

  return consent;
}
