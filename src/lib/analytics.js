import { apiFetch } from "./api";
import { getVisitorId } from "./visitor";

// Best-effort, jamais bloquant pour la navigation : un tableau de bord qui perd un pageview
// n'est pas grave, une page qui freeze pour ça le serait. Voir back/src/routes/analytics.js et
// projects-admin/back/src/routes/dashboard.js (graphe de visites).
export function trackPageview(path) {
  apiFetch("/api/analytics/pageview", {
    method: "POST",
    body: JSON.stringify({ visitorId: getVisitorId(), path }),
  }).catch(() => {});
}
