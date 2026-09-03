// Régénère public/sitemap.xml après chaque build (voir "postbuild" dans package.json), en y
// ajoutant les articles de blog réels. Ces derniers viennent de la console (projects-admin) via
// l'API digyo — voir back/src/routes/blog.js — donc pas moyen de les connaître à partir des
// fichiers du front seuls (data/blog.js n'est qu'un jeu d'exemples, jamais servi en production).
// Si l'API est injoignable (poste hors-ligne, pas de réseau), le sitemap est quand même généré
// avec les routes statiques : mieux vaut un sitemap incomplet qu'un build qui échoue.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const SITE_URL = "https://digyo.pro";
const API_URL = process.env.SITEMAP_API_URL || "https://api-digyo.digyo.pro";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.8" },
  { path: "/a-propos", changefreq: "monthly", priority: "0.6" },
  { path: "/saas", changefreq: "weekly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/contact", changefreq: "yearly", priority: "0.5" },
  { path: "/mentions-legales", changefreq: "yearly", priority: "0.2" },
  { path: "/politique-de-confidentialite", changefreq: "yearly", priority: "0.2" },
];

// Synchronisé à la main avec data/saas.js — un seul produit pour l'instant, à compléter le jour
// où un deuxième SaaS est ajouté au catalogue.
const SAAS_SLUGS = ["s-school"];

async function fetchBlogSlugs() {
  try {
    const res = await fetch(`${API_URL}/api/blog`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts = await res.json();
    return Array.isArray(posts) ? posts.map((p) => p.slug).filter(Boolean) : [];
  } catch (err) {
    console.warn(`[sitemap] Articles de blog indisponibles (${err.message}) — sitemap généré sans eux.`);
    return [];
  }
}

function urlEntry(loc, changefreq, priority) {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function main() {
  const blogSlugs = await fetchBlogSlugs();

  const urls = [
    ...STATIC_ROUTES.map((r) => urlEntry(`${SITE_URL}${r.path}`, r.changefreq, r.priority)),
    ...SAAS_SLUGS.map((slug) => urlEntry(`${SITE_URL}/saas/${slug}`, "monthly", "0.8")),
    ...blogSlugs.map((slug) => urlEntry(`${SITE_URL}/blog/${slug}`, "monthly", "0.6")),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;

  const outPath = resolve(dirname(fileURLToPath(import.meta.url)), "../dist/sitemap.xml");
  writeFileSync(outPath, xml, "utf8");
  console.log(`[sitemap] Écrit ${outPath} — ${urls.length} URLs (${blogSlugs.length} articles de blog).`);
}

main();
