import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { getVisitorId } from "../lib/visitor";

// Badge de compteur seul (voir LikeIndicator.jsx, plusieurs par page sur la liste d'articles) --
// volontairement séparé de usePostReactions, qui rapatrie aussi tous les commentaires et ne
// convient qu'à la page de détail d'un article.
export function useLikeCount(slug) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    let annule = false;
    const visitorId = getVisitorId();
    apiFetch(`/api/blog/${encodeURIComponent(slug)}/likes?visitorId=${encodeURIComponent(visitorId)}`)
      .then((data) => {
        if (annule) return;
        setLiked(data.liked);
        setLikes(data.likes);
      })
      .catch(() => {});
    return () => {
      annule = true;
    };
  }, [slug]);

  return { liked, likes };
}
