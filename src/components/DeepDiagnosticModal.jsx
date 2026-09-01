import { useEffect, useState } from "react";
import Modal from "./Modal";
import { apiFetch } from "../lib/api";

const emptyForm = {
  detailedChallenge: "",
  address: "",
  phone: "",
  acceptPhysicalAudit: false,
};

// Formulaire dédié à la demande de diagnostic approfondi (humain) -- distinct du diagnostic
// rapide, qui ne sert qu'à calculer un score automatique. Ici on récolte de quoi permettre à
// l'équipe de comprendre le défi et, si besoin, planifier une visite terrain.
export default function DeepDiagnosticModal({ open, onClose, onSubmitted }) {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setStep("form");
      setForm(emptyForm);
      setError("");
    }
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await apiFetch("/api/client-profile/deep-diagnostic", {
        method: "POST",
        body: JSON.stringify(form),
      });
      onSubmitted(data.profile);
      setStep("sent");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="deep-diagnostic-title" closeOnBackdropClick={false}>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
        </svg>
      </button>

      {step === "form" && (
        <>
          <h2 id="deep-diagnostic-title" className="font-display text-xl font-bold text-ink">
            Diagnostic approfondi
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            Notre équipe examine votre situation en détail et revient vers vous avec des
            recommandations concrètes. Plus vous êtes précis, plus la réponse sera pertinente.
          </p>
          <p className="mt-1 text-xs text-ink/40">
            <span className="text-ambre-dark">*</span> Champs obligatoires
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-ink">
                Décrivez plus précisément vos défis et ce que vous attendez de ce diagnostic{" "}
                <span className="text-ambre-dark">*</span>
              </span>
              <textarea
                required
                rows={5}
                value={form.detailedChallenge}
                onChange={(e) => setForm((f) => ({ ...f, detailedChallenge: e.target.value }))}
                placeholder="Ex. Nous perdons des clients faute de suivi après la vente, notre équipe jongle entre trois outils différents qui ne communiquent pas entre eux…"
                className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-ink">Adresse ou zone précise (optionnel)</span>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                placeholder="Ex. Cocody, Riviera 3, Abidjan"
                className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-ink">Téléphone (optionnel)</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="Ex. 07 00 00 00 00"
                className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
              />
            </label>

            <label className="flex items-start gap-2.5">
              <input
                type="checkbox"
                checked={form.acceptPhysicalAudit}
                onChange={(e) => setForm((f) => ({ ...f, acceptPhysicalAudit: e.target.checked }))}
                className="mt-0.5 h-4 w-4 rounded border-ink/30 text-lagune focus:ring-lagune/30"
              />
              <span className="text-sm text-ink">
                J'accepte qu'un audit physique soit réalisé sur place si notre équipe le juge
                nécessaire pour bien comprendre la situation.
              </span>
            </label>

            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark disabled:opacity-60"
            >
              {submitting ? "Envoi…" : "Envoyer ma demande"}
            </button>
          </form>
        </>
      )}

      {step === "sent" && (
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lagune/10 text-lagune-dark">
            <svg viewBox="0 0 20 20" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div>
            <p className="font-display text-lg font-bold text-ink">Demande envoyée</p>
            <p className="mt-1 max-w-xs text-sm text-ink/60">
              Notre équipe revient vers vous prochainement avec un diagnostic détaillé.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 rounded-full bg-lagune px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
          >
            Fermer
          </button>
        </div>
      )}
    </Modal>
  );
}
