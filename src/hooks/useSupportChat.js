import { useCallback, useEffect, useRef, useState } from "react";
import { apiFetch } from "../lib/api";
import { getVisitorId } from "../lib/visitor";
import { useSession } from "../context/SessionContext";

const OPEN_POLL_MS = 6000;
const CLOSED_POLL_MS = 25000;

// Remplace le localStorage fantôme d'avant : les messages passent désormais réellement par la
// console (voir back/src/routes/support.js, relais vers /api/public/support/* côté console).
// `open` pilote la fréquence de poll -- actif et fréquent pendant que le widget est affiché
// (l'utilisateur attend une réponse), léger et rare sinon (juste pour le badge non-lu).
export function useSupportChat(open) {
  const { user } = useSession();
  const [messages, setMessages] = useState([]);
  const [unread, setUnread] = useState(false);
  const [sending, setSending] = useState(false);
  const tokenRef = useRef(null);
  if (!tokenRef.current) tokenRef.current = getVisitorId();
  const token = tokenRef.current;

  const fetchThread = useCallback(async () => {
    try {
      const data = await apiFetch(`/api/support?token=${encodeURIComponent(token)}`);
      setMessages(data.messages || []);
      setUnread(false);
    } catch {
      // silencieux -- un poll raté n'a pas besoin d'interrompre la conversation, le suivant
      // réessaiera de lui-même.
    }
  }, [token]);

  const fetchUnread = useCallback(async () => {
    try {
      const data = await apiFetch(`/api/support/unread?token=${encodeURIComponent(token)}`);
      setUnread(!!data.unread);
    } catch {
      // idem
    }
  }, [token]);

  useEffect(() => {
    if (open) {
      fetchThread();
      const id = setInterval(fetchThread, OPEN_POLL_MS);
      return () => clearInterval(id);
    }
    fetchUnread();
    const id = setInterval(fetchUnread, CLOSED_POLL_MS);
    return () => clearInterval(id);
  }, [open, fetchThread, fetchUnread]);

  const sendMessage = useCallback(
    async (text) => {
      const optimistic = {
        id: `pending-${Date.now()}`,
        from: "visitor",
        text,
        date: new Date().toISOString(),
      };
      setMessages((current) => [...current, optimistic]);
      setSending(true);
      try {
        await apiFetch("/api/support", {
          method: "POST",
          body: JSON.stringify({ token, text, name: user?.name || null, email: user?.email || null }),
        });
        await fetchThread();
      } catch {
        // Le message optimiste reste affiché même en cas d'échec réseau -- mieux qu'une
        // disparition silencieuse ; le visiteur peut retenter, la prochaine réussite le
        // remplacera via fetchThread.
      } finally {
        setSending(false);
      }
    },
    [token, user, fetchThread]
  );

  return { messages, unread, sending, sendMessage };
}
