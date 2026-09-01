import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NudgePopup from "./NudgePopup";
import { useDiagnosticModal } from "../context/DiagnosticModalContext";

const DELAY_MS = 12000;
const SESSION_SHOWN_KEY = "digyo_nudge_shown";
const SESSION_VARIANT_KEY = "digyo_nudge_variant";

function IconGraduation() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10l8-4 8 4-8 4-8-4Z M8 12v4.5c0 1.4 1.8 2.5 4 2.5s4-1.1 4-2.5V12 M20 10v6" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2Z" />
    </svg>
  );
}

const NUDGES = {
  school: {
    icon: <IconGraduation />,
    accent: "lagune",
    eyebrow: "Solution SaaS",
    title: "s-school",
    message:
      "Inscriptions, notes, facturation : centralisez la gestion de votre établissement avec s-school, déjà en production.",
    ctaLabel: "Découvrir s-school",
    ctaTo: "/saas/s-school",
  },
  diagnostic: {
    icon: <IconCompass />,
    accent: "ambre",
    eyebrow: "Accompagnement",
    title: "Un diagnostic clair, sans engagement",
    message:
      "Beaucoup d'organisations avancent à l'instinct. On peut vous aider à voir clair sur ce qui freine vraiment votre croissance.",
    ctaLabel: "Diagnostiquer mon activité",
  },
};

// "school" et "diagnostic" sont tous les deux pertinents sur Accueil/Services -- afficher les
// deux y serait envahissant, donc un seul est tiré au sort par session (voir getVariant). "s-school"
// reste pertinent sur Blog/À propos (contenu plus large) ; le diagnostic n'a de sens qu'à côté
// du pilier "Transformation", donc seulement Accueil/Services.
function eligibilityFor(pathname) {
  if (pathname === "/" || pathname === "/services") return "both";
  if (pathname === "/a-propos" || pathname === "/blog" || pathname.startsWith("/blog/")) return "school";
  return "none";
}

function getVariant() {
  let variant = sessionStorage.getItem(SESSION_VARIANT_KEY);
  if (!variant) {
    variant = Math.random() < 0.5 ? "school" : "diagnostic";
    sessionStorage.setItem(SESSION_VARIANT_KEY, variant);
  }
  return variant;
}

export default function SiteNudges() {
  const { pathname } = useLocation();
  const { openDiagnosticModal } = useDiagnosticModal();
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_SHOWN_KEY)) return;
    const timer = setTimeout(() => setReady(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready || active || sessionStorage.getItem(SESSION_SHOWN_KEY)) return;

    const eligibility = eligibilityFor(pathname);
    if (eligibility === "none") return;

    const variant = eligibility === "both" ? getVariant() : "school";
    setActive(variant);
  }, [ready, active, pathname]);

  function dismiss() {
    // Mémorisé seulement à la fermeture réelle (X ou clic sur le CTA), pas au simple affichage
    // -- sinon un aller-retour de page avant d'avoir vu le pop-up empêcherait toute nouvelle
    // tentative pour le reste de la session.
    sessionStorage.setItem(SESSION_SHOWN_KEY, "1");
    setActive(null);
  }

  if (!active) return null;

  return (
    <NudgePopup
      {...NUDGES[active]}
      onCtaClick={active === "diagnostic" ? openDiagnosticModal : undefined}
      onDismiss={dismiss}
    />
  );
}
