import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const sizes = {
  md: "max-w-md",
  lg: "max-w-xl",
  xl: "max-w-2xl",
  "2xl": "max-w-4xl",
};

export default function Modal({
  open,
  onClose,
  labelledBy,
  size = "md",
  closeOnBackdropClick = true,
  children,
}) {
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const firstField = panelRef.current?.querySelector("input, button, select, textarea");
    firstField?.focus();

    function onKeyDown(e) {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll(
        'input, button, select, textarea, a[href]'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
    // Ne se relance qu'a l'ouverture/fermeture -- pas a chaque frappe dans le formulaire
    // (onClose est lu via une ref pour eviter de reprendre le focus a chaque re-render du parent).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-panel/60 backdrop-blur-sm"
        onClick={closeOnBackdropClick ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`animate-modal-in relative max-h-[90vh] w-full overflow-y-auto rounded-3xl bg-surface p-8 shadow-2xl shadow-panel/30 ${sizes[size]}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
