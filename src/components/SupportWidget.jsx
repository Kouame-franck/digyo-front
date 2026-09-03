import { useEffect, useRef, useState } from "react";
import { useSupportChat } from "../hooks/useSupportChat";

export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { messages, unread, sending, sendMessage } = useSupportChat(open);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || sending) return;
    sendMessage(text.trim());
    setText("");
  }

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Assistance digyo"
          className="animate-modal-in fixed bottom-24 right-6 z-40 flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-2xl shadow-panel/30"
        >
          <div className="flex items-center justify-between border-b border-ink/10 bg-panel px-5 py-4 text-on-panel">
            <div>
              <h3 className="font-display text-sm font-bold">Assistance digyo</h3>
              <p className="text-xs text-on-panel/60">On répond généralement sous 24h</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer l'assistance"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-on-panel/60 transition-colors hover:bg-on-panel/10 hover:text-on-panel"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            <div className="flex">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-ink/5 px-3.5 py-2.5 text-sm text-ink/80">
                👋 Bonjour ! Une question sur nos services, un projet en tête ? Écrivez-nous ici.
              </div>
            </div>

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "visitor" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    m.from === "visitor"
                      ? "rounded-br-sm bg-lagune text-white"
                      : "rounded-bl-sm bg-ink/5 text-ink/80"
                  }`}
                >
                  {m.text}
                  {m.from === "auto" && (
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
                      Réponse automatique
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-ink/10 p-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Votre message..."
              disabled={sending}
              className="flex-1 rounded-full border border-ink/15 px-4 py-2 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={sending}
              aria-label="Envoyer le message"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lagune text-white transition-colors hover:bg-lagune-dark disabled:opacity-60"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                <path d="M2 10l15-7-6 7 6 7-15-7Z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer l'assistance" : "Ouvrir l'assistance"}
        className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-lagune text-white shadow-lg shadow-panel/30 transition-transform hover:scale-105 hover:bg-lagune-dark"
      >
        {!open && unread && (
          <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-red-500 ring-2 ring-white" />
        )}
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 5h16v11H8l-4 4V5Z" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </>
  );
}
