import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "digyo-blog-reactions";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // stockage indisponible (mode privé) -- les réactions ne persisteront pas
  }
}

// TODO: remplacer par de vrais appels API (GET/POST /api/posts/:slug/reactions)
// une fois le service back/ en place, pour un comptage partagé entre visiteurs.
export function usePostReactions(slug) {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const entry = readAll()[slug];
    setLiked(entry?.liked || false);
    setComments(entry?.comments || []);
  }, [slug]);

  const toggleLike = useCallback(() => {
    setLiked((current) => {
      const next = !current;
      const all = readAll();
      all[slug] = { comments: [], ...all[slug], liked: next };
      writeAll(all);
      return next;
    });
  }, [slug]);

  const addComment = useCallback(
    (name, text) => {
      const comment = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name,
        text,
        date: new Date().toISOString(),
      };
      setComments((current) => {
        const next = [...current, comment];
        const all = readAll();
        all[slug] = { liked: false, ...all[slug], comments: next };
        writeAll(all);
        return next;
      });
    },
    [slug]
  );

  return { liked, comments, toggleLike, addComment };
}
