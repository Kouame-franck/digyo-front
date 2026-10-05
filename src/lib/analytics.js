import { apiFetch } from "./api";
import { getVisitorId } from "./visitor";

// Deux mesures d'audience indépendantes :
// - le compteur maison (POST /api/analytics/pageview), sans cookie, toujours actif : il alimente
//   le graphe de visites de la console ;
// - Google Analytics 4, qui dépose des cookies (_ga, _ga_*) : chargé UNIQUEMENT après
//   consentement explicite via le bandeau (CookieBanner.jsx), comme promis dans la section 5 de
//   PolitiqueConfidentialite.jsx. Sans « Accepter », gtag.js n'est même pas téléchargé.

const GA_ID = "G-J8EZ8RRYJH";
const CONSENT_KEY = "digyo_analytics_consent"; // "granted" | "denied" | absent = pas encore choisi
export const CONSENT_CHANGE_EVENT = "digyo:consent-change";
export const CONSENT_OPEN_EVENT = "digyo:consent-open";

let gaLoaded = false;

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function gaActive() {
  // En dev, les visites locales pollueraient les rapports GA comme le graphe de la console.
  return !import.meta.env.DEV && getConsent() === "granted";
}

function loadGa() {
  if (gaLoaded) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  // SPA : les page_view sont envoyés à la main à chaque changement de route (trackPageview),
  // sinon GA ne compterait que la première page chargée.
  window.gtag("config", GA_ID, { send_page_view: false });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function sendGaPageview(path) {
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
  });
}

// Un refus après une acceptation doit aussi effacer ce qui a déjà été déposé.
function deleteGaCookies() {
  const host = window.location.hostname;
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (name !== "_ga" && !name.startsWith("_ga_")) return;
    for (const domain of ["", `; domain=${host}`, `; domain=.${host.replace(/^www\./, "")}`]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  });
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Stockage indisponible (navigation privée stricte) : le choix vaut pour cette page seulement.
  }
  if (value === "granted" && !import.meta.env.DEV) {
    loadGa();
    // La page en cours a déjà été vue avant le clic : on la compte maintenant.
    sendGaPageview(window.location.pathname);
  } else if (value === "denied") {
    if (gaLoaded) window.gtag("consent", "update", { analytics_storage: "denied" });
    deleteGaCookies();
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

// Rouvre le bandeau (lien « Gérer les cookies » du pied de page).
export function openConsentBanner() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

// Best-effort, jamais bloquant pour la navigation : un tableau de bord qui perd un pageview
// n'est pas grave, une page qui freeze pour ça le serait. Voir back/src/routes/analytics.js et
// projects-admin/back/src/routes/dashboard.js (graphe de visites).
export function trackPageview(path) {
  // En dev, /api pointe sur la prod (vite.config.js) : les visites locales fausseraient le graphe.
  if (import.meta.env.DEV) return;
  apiFetch("/api/analytics/pageview", {
    method: "POST",
    body: JSON.stringify({ visitorId: getVisitorId(), path }),
  }).catch(() => {});
  if (gaActive()) {
    loadGa();
    sendGaPageview(path);
  }
}

// Événements de conversion GA4 (generate_lead, begin_checkout, purchase…). Sans consentement,
// rien n'est envoyé. Jamais de donnée personnelle (nom, email, téléphone) dans `params`.
export function trackEvent(name, params = {}) {
  if (!gaActive()) return;
  loadGa();
  window.gtag("event", name, params);
}
