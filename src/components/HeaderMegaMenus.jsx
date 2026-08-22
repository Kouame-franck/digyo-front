import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pillars } from "../data/content";
import { saasProducts } from "../data/saas";
import { ACCENTS, ACCENT_DEFAUT } from "../data/pillarAccents";
import { apiFetch } from "../lib/api";
import { formatPostDate } from "../data/blog";

export function ServicesMegaMenu() {
  return (
    <>
      <div className="grid gap-1 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar) => {
          const accent = ACCENTS[pillar.slug] ?? ACCENT_DEFAUT;
          return (
            <Link
              key={pillar.slug}
              to={`/services#${pillar.slug}`}
              className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-ink/5"
            >
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full bg-current ${accent.trait}`} />
              <span>
                <span className="block font-display text-sm font-bold text-ink">{pillar.name}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-ink/60">{pillar.tagline}</span>
              </span>
            </Link>
          );
        })}
      </div>
      <div className="border-t border-ink/10 bg-canvas/60 px-4 py-3">
        <Link to="/services" className="text-sm font-semibold text-lagune-dark hover:underline">
          Voir tous nos services →
        </Link>
      </div>
    </>
  );
}

export function SaasMegaMenu() {
  return (
    <>
      <div className="flex flex-col gap-1 p-4">
        {saasProducts.map((product) => (
          <Link
            key={product.slug}
            to={`/saas/${product.slug}`}
            className="flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-ink/5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lagune/10 font-display text-sm font-bold text-lagune-dark">
              {product.name.slice(0, 2).toUpperCase()}
            </span>
            <span>
              <span className="flex items-center gap-2">
                <span className="font-display text-sm font-bold text-ink">{product.name}</span>
                <span className="rounded-full bg-lagune/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-lagune-dark">
                  {product.status}
                </span>
              </span>
              <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-ink/60">
                {product.description}
              </span>
            </span>
          </Link>
        ))}
      </div>
      <div className="border-t border-ink/10 bg-canvas/60 px-4 py-3">
        <Link to="/saas" className="text-sm font-semibold text-lagune-dark hover:underline">
          Voir le catalogue SaaS →
        </Link>
      </div>
    </>
  );
}

export function BlogMegaMenu() {
  // Chargé une seule fois au montage du header (pas à chaque survol) : le menu doit s'ouvrir
  // instantanément, pas afficher un état de chargement à chaque fois qu'on passe la souris dessus.
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    apiFetch("/api/blog")
      .then((data) => setPosts(data.slice(0, 3)))
      .catch(() => setPosts([]));
  }, []);

  return (
    <>
      <div className="flex flex-col gap-1 p-4">
        {posts === null && <p className="p-3 text-sm text-ink/50">Chargement…</p>}
        {posts?.length === 0 && <p className="p-3 text-sm text-ink/50">Pas encore d'article publié.</p>}
        {posts?.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="flex flex-col gap-1 rounded-xl p-3 transition-colors hover:bg-ink/5"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-lagune-dark">
              {post.category}
            </span>
            <span className="font-display text-sm font-bold leading-snug text-ink">{post.title}</span>
            <span className="text-xs text-ink/50">{formatPostDate(post.date)}</span>
          </Link>
        ))}
      </div>
      <div className="border-t border-ink/10 bg-canvas/60 px-4 py-3">
        <Link to="/blog" className="text-sm font-semibold text-lagune-dark hover:underline">
          Voir tous les articles →
        </Link>
      </div>
    </>
  );
}
