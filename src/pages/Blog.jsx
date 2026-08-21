import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCover from "../components/BlogCover";
import LikeIndicator from "../components/LikeIndicator";
import { apiFetch } from "../lib/api";
import { formatPostDate } from "../data/blog";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/api/blog")
      .then(setBlogPosts)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <section className="py-20">
        <div className="container-page max-w-2xl text-center text-ink/60">{error}</div>
      </section>
    );
  }

  if (!blogPosts) {
    return (
      <section className="py-20">
        <div className="container-page max-w-2xl text-center text-ink/50">Chargement…</div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <section className="py-20">
        <div className="container-page max-w-2xl text-center text-ink/50">Aucun article pour l'instant.</div>
      </section>
    );
  }

  const [featured, ...rest] = blogPosts;

  return (
    <>
      <section className="border-b border-ink/10 bg-surface py-20">
        <div className="container-page max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
            Blog
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink md:text-5xl">
            Nos réflexions sur le digital.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Des articles courts et concrets sur la transformation digitale,
            la création d'outils web et l'accompagnement des équipes — écrits
            à partir de ce que nous observons sur le terrain, pas de théorie
            générale.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <Link
            to={`/blog/${featured.slug}`}
            className="group flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-sm shadow-ink/5 transition-shadow hover:shadow-lg hover:shadow-ink/10 md:flex-row"
          >
            <BlogCover
              icon={featured.icon}
              category={featured.category}
              image={featured.image}
              className="h-56 w-full md:h-auto md:w-2/5"
            />
            <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-ink/40">
                <span className="text-lagune-dark">{featured.category}</span>
                <span aria-hidden="true">·</span>
                <span>{formatPostDate(featured.date)}</span>
                <span aria-hidden="true">·</span>
                <span>{featured.readTime}</span>
                <span aria-hidden="true">·</span>
                <LikeIndicator slug={featured.slug} />
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink/70">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-lagune-dark">
                Lire l'article
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-sm shadow-ink/5 transition-shadow hover:shadow-lg hover:shadow-ink/10"
              >
                <BlogCover icon={post.icon} category={post.category} image={post.image} className="h-40 w-full" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/40">
                    <span className="text-lagune-dark">{post.category}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs text-ink/50">
                    <span>{formatPostDate(post.date)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <LikeIndicator slug={post.slug} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
