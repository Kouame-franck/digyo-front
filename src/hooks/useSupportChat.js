import { useCallback, useEffect, useRef, useState } from "react";
import { apiFetch } from "../lib/api";
import { getVisitorId } from "../lib/visitor";
import { useSession } from "../context/SessionContext";
import { useAuthModal } from "../context/AuthModalContext";

const OPEN_POLL_MS = 6000;
const CLOSED_POLL_MS = 25000;

// Remplace le localStorage fantôme d'avant : les messages passent désormais réellement par la
// console (voir back/src/routes/support.js, relais vers /api/public/support/* côté console).
// `open` pilote la fréquence de poll -- actif et fréquent pendant que le widget est affiché
// (l'utilisateur attend une réponse), léger et rare sinon (juste pour le badge non-lu).
export function useSupportChat(open) {
  const { user } = useSession();
  const { openAuthModal } = useAuthModal();
  const [messages, setMessages] = useState([]);
  const [unread, setUnread] = useState(false);
  const [sending, setSending] = useState(false);
  const tokenRef = useRef(null);
  if (!tokenRef.current) tokenRef.current = getVisitorId();
  const token = tokenRef.current;
  // Lu depuis sendMessage plutôt que `user` directement -- évite de recréer sendMessage (et donc
  // le onSuccess capturé par AuthModal) à chaque changement de session, ce qui casserait l'auto-
  // renvoi juste après connexion (closure perimée sur l'ancien `user`, encore `null`).
  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  }, [user]);

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

  const doSend = useCallback(
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
          body: JSON.stringify({ token, text }),
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
    [token, fetchThread]
  );

  // Le back exige désormais une session pour écrire (nom/email viennent du cookie, pas du
  // visiteur -- voir back/src/routes/support.js). Un visiteur non connecté qui envoie son
  // premier message se voit proposer AuthModal ; le message part automatiquement une fois
  // connecté, sans qu'il ait besoin de le retaper.
  const sendMessage = useCallback(
    (text) => {
      if (!userRef.current) {
        openAuthModal("login", { onSuccess: () => doSend(text) });
        return;
      }
      return doSend(text);
    },
    [doSend, openAuthModal]
  );

  return { messages, unread, sending, sendMessage };
}
