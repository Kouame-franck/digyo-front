import { useState } from "react";
import { usePostReactions } from "../hooks/usePostReactions";
import { useSession } from "../context/SessionContext";
import { initialsFrom } from "../lib/initials";

export default function PostReactions({ slug }) {
  const { liked, comments, toggleLike, addComment } = usePostReactions(slug);
  const { user } = useSession();
  const [name, setName] = useState(user?.name || "");
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    addComment(name.trim(), text.trim());
    setText("");
  }

  return (
    <div className="mt-14 border-t border-ink/10 pt-10">
      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={toggleLike}
          aria-pressed={liked}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
            liked
              ? "border-lagune bg-lagune/10 text-lagune-dark"
              : "border-ink/15 text-ink/70 hover:border-ink/30"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              d="M12 20.5S3.5 15 3.5 9a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20.5 9c0 6-8.5 11.5-8.5 11.5Z"
              strokeLinejoin="round"
            />
          </svg>
          J'aime
        </button>
        <span className="text-sm text-ink/50">
          {comments.length} commentaire{comments.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-8">
        <h3 className="font-display text-lg font-bold text-ink">Commentaires</h3>

        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-2xl border border-ink/10 bg-surface p-5"
        >
          <div className="grid gap-3 sm:grid-cols-[1fr_2fr]">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              className="rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
            />
            <input
              type="text"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Votre commentaire"
              className="rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
            />
          </div>
          <button
            type="submit"
            className="mt-3 rounded-full bg-lagune px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
          >
            Publier
          </button>
        </form>

        <ul className="mt-6 space-y-5">
          {comments.length === 0 && (
            <li className="text-sm text-ink/50">Soyez le premier à commenter cet article.</li>
          )}
          {comments.map((c) => (
            <li key={c.id} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lagune/15 text-xs font-bold text-lagune-dark">
                {initialsFrom(c.name)}
              </span>
              <div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-ink">{c.name}</span>
                  <span className="text-xs text-ink/40">
                    {new Date(c.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink/75">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
