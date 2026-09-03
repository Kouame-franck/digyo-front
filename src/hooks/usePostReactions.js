import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { getVisitorId } from "../lib/visitor";

export function usePostReactions(slug) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let annule = false;
    setLoading(true);
    setError("");
    const visitorId = getVisitorId();

    apiFetch(`/api/blog/${encodeURIComponent(slug)}/reactions?visitorId=${encodeURIComponent(visitorId)}`)
      .then((data) => {
        if (annule) return;
        setLiked(data.liked);
        setLikes(data.likes);
        setComments(data.comments || []);
      })
      .catch((err) => !annule && setError(err.message))
      .finally(() => !annule && setLoading(false));

    return () => {
      annule = true;
    };
  }, [slug]);

  const toggleLike = useCallback(async () => {
    const visitorId = getVisitorId();
    const next = !liked;
    // Optimiste : l'essentiel de l'intérêt d'un bouton "j'aime" est la réaction immédiate --
    // on revient en arrière si l'appel échoue plutôt que de faire attendre le visiteur.
    setLiked(next);
    setLikes((n) => n + (next ? 1 : -1));
    try {
      const data = await apiFetch(`/api/blog/${encodeURIComponent(slug)}/like`, {
        method: "POST",
        body: JSON.stringify({ visitorId, liked: next }),
      });
      setLiked(data.liked);
      setLikes(data.likes);
    } catch {
      setLiked(!next);
      setLikes((n) => n - (next ? 1 : -1));
    }
  }, [slug, liked]);

  const addComment = useCallback(
    async (name, text) => {
      setError("");
      try {
        const comment = await apiFetch(`/api/blog/${encodeURIComponent(slug)}/comments`, {
          method: "POST",
          body: JSON.stringify({ name, text }),
        });
        setComments((current) => [...current, comment]);
        return true;
      } catch (err) {
        setError(err.message);
        return false;
      }
    },
    [slug]
  );

  return { liked, likes, comments, loading, error, toggleLike, addComment };
}
