import { useEffect } from "react";

const SITE_URL = "https://digyo.pro";
const SITE_NAME = "digyo";
export const DEFAULT_TITLE = "digyo — Le monde est passé au digital. Et vous ?";
export const DEFAULT_DESCRIPTION =
  "digyo accompagne PME, institutions et indépendants dans leur transformation digitale en Côte d'Ivoire : conseil, création de sites & applications, solutions SaaS, matériel, formation.";
const DEFAULT_IMAGE = `${SITE_URL}/digyo-logo-fond-clair.png`;

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// Gère les balises <head> propres à chaque page de cette SPA (pas de SSR/prerendering) :
// Googlebot exécute le JS et lira donc bien ces balises pour indexer chaque route séparément.
// Limite connue et volontairement acceptée pour l'instant : les bots qui n'exécutent PAS le JS
// (aperçus de lien WhatsApp/Facebook/Twitter) ne verront eux que les balises statiques par défaut
// d'index.html, quel que soit le chemin partagé — seul un prerendering résoudrait ça.
export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  jsonLd = null,
}) {
  const url = `${SITE_URL}${path}`;
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
    upsertLink("canonical", url);

    let script = null;
    if (jsonLdString) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = jsonLdString;
      document.head.appendChild(script);
    }
    return () => {
      if (script) script.remove();
    };
  }, [title, description, url, image, type, noindex, jsonLdString]);

  return null;
}
