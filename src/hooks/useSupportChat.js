import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "digyo-support-chat";

function readThread() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { messages: [], acknowledged: false };
  } catch {
    return { messages: [], acknowledged: false };
  }
}

function writeThread(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // stockage indisponible (mode privé) -- la conversation ne persistera pas
  }
}

// TODO: brancher sur un vrai canal (POST /api/support/messages, ou websocket)
// une fois le service back/ en place, pour une vraie prise en charge par l'équipe.
export function useSupportChat() {
  const [messages, setMessages] = useState([]);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    const thread = readThread();
    setMessages(thread.messages);
    setAcknowledged(thread.acknowledged);
  }, []);

  const sendMessage = useCallback(
    (text) => {
      const visitorMsg = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        from: "visitor",
        text,
        date: new Date().toISOString(),
      };

      setMessages((current) => {
        let next = [...current, visitorMsg];

        if (!acknowledged) {
          next = [
            ...next,
            {
              id: `${Date.now()}-ack`,
              from: "digyo-auto",
              text: "Merci pour votre message ! Un membre de l'équipe digyo vous répondra dès que possible.",
              date: new Date().toISOString(),
            },
          ];
        }

        writeThread({ messages: next, acknowledged: true });
        return next;
      });

      if (!acknowledged) setAcknowledged(true);
    },
    [acknowledged]
  );

  return { messages, sendMessage };
}
