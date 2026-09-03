import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Button from "../components/Button";
import BlogCover from "../components/BlogCover";
import PostReactions from "../components/PostReactions";
import Seo from "../components/Seo";
import { apiFetch } from "../lib/api";
import { formatPostDate } from "../data/blog";

function Block({ block }) {
  if (block.type === "h2") {
    return (
      <h2 className="mt-10 font-display text-xl font-bold text-ink md:text-2xl">
        {block.text}
      </h2>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="mt-4 space-y-2.5">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-base leading-relaxed text-ink/75">
            <svg viewBox="0 0 20 20" className="mt-1.5 h-3.5 w-3.5 shrink-0 text-lagune-dark" fill="currentColor">
              <circle cx="10" cy="10" r="4" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className="mt-5 text-base leading-relaxed text-ink/75">{block.text}</p>;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(undefined);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    setPost(undefined);
    apiFetch(`/api/blog/${slug}`)
      .then(setPost)
      .catch(() => setPost(null));
    apiFetch("/api/blog")
      .then(setBlogPosts)
      .catch(() => setBlogPosts([]));
  }, [slug]);

  if (post === undefined) {
    return (
      <section className="py-20">
        <div className="container-page max-w-2xl text-center text-ink/50">Chargement…</div>
      </section>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);
  const otherPosts =
    relatedPosts.length > 0
      ? relatedPosts
      : blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "digyo" },
    publisher: { "@type": "Organization", name: "digyo" },
    ...(post.image ? { image: post.image } : {}),
  };

  return (
    <>
      <Seo
        title={`${post.title} | Blog digyo`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        jsonLd={articleJsonLd}
      />
      <section className="border-b border-ink/10 bg-surface">
        <div className="container-page py-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 transition-colors hover:text-ink"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M13 4l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Tous les articles
          </Link>
        </div>

        <div className="container-page max-w-3xl pb-14">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-ink/40">
            <span className="text-lagune-dark">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{formatPostDate(post.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink/70">{post.excerpt}</p>
          <p className="mt-4 text-sm font-semibold text-ink/50">Par {post.author}</p>
        </div>
      </section>

      <BlogCover
        icon={post.icon}
        category={post.category}
        image={post.image}
        coverType={post.coverType}
        videoMode="player"
        className="aspect-[2.4/1] w-full md:aspect-[3/1]"
      />

      <section className="py-16">
        <div className="container-page max-w-3xl">
          <article>
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </article>

          <PostReactions slug={post.slug} />

          <div className="mt-14 flex flex-col items-start gap-5 rounded-3xl bg-panel px-8 py-10 text-on-panel sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-bold">
                Un besoin qui rejoint ce sujet ?
              </h2>
              <p className="mt-1.5 text-sm text-on-panel/70">
                Parlons-en — premier échange sans engagement.
              </p>
            </div>
            <Button to="/contact" variant="accent" className="shrink-0">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      {otherPosts.length > 0 && (
        <section className="border-t border-ink/10 bg-surface py-20">
          <div className="container-page">
            <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
              À lire aussi
            </span>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group flex items-center gap-5 overflow-hidden rounded-2xl border border-ink/10 bg-canvas p-5 transition-shadow hover:shadow-lg hover:shadow-ink/10"
                >
                  <BlogCover
                    icon={p.icon}
                    category={p.category}
                    image={p.image}
                    coverType={p.coverType}
                    className="h-16 w-16 shrink-0 rounded-xl"
                  />
                  <div>
                    <h4 className="font-display text-base font-bold text-ink">{p.title}</h4>
                    <p className="mt-1 text-sm text-ink/60">{formatPostDate(p.date)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
