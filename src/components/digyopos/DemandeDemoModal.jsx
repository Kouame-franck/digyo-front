import { useEffect, useState } from "react";
import Modal from "../Modal";
import { trackEvent } from "../../lib/analytics";

// Demande de démonstration digyo-pos : passe par la route de contact du site (/api/contact), qui
// enregistre le message, prévient digyo par email et le pousse dans la console. Les champs propres
// au commerce (activité, boutiques, caisses) sont rassemblés dans le message.
const VIDE = { nom: "", email: "", telephone: "", commerce: "", activite: "", boutiques: "1", caisses: "1" };
const champ =
  "mt-2 w-full rounded-xl border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20";

export default function DemandeDemoModal({ open, onClose, emplacement }) {
  const [form, setForm] = useState(VIDE);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");
  const [envoye, setEnvoye] = useState(false);

  useEffect(() => {
    if (open) {
      setEnvoi(false);
      setErreur("");
      setEnvoye(false);
    }
  }, [open]);

  const maj = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function envoyer(e) {
    e.preventDefault();
    setEnvoi(true);
    setErreur("");
    const message = [
      "Demande de démonstration digyo-pos",
      `Commerce : ${form.commerce || "non précisé"}`,
      `Activité : ${form.activite || "non précisée"}`,
      `Boutiques : ${form.boutiques} · Caisses : ${form.caisses}`,
      `Téléphone : ${form.telephone}`,
    ].join("\n");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.nom, email: form.email, service: "digyo-pos (démonstration)", message }),
      });
      if (!r.ok) throw new Error();
      setEnvoye(true);
      setForm(VIDE);
      trackEvent("generate_lead", { lead_source: "demo", product: "digyo-pos", location: emplacement });
    } catch {
      setErreur("L'envoi n'a pas abouti. Réessayez dans un instant, ou écrivez-nous depuis la page Contact.");
    } finally {
      setEnvoi(false);
    }
  }

  return (
    // Un clic à côté ne ferme pas : on perdrait le formulaire en cours de saisie.
    <Modal open={open} onClose={onClose} labelledBy="demo-pos-titre" size="lg" closeOnBackdropClick={false}>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-md text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
        </svg>
      </button>
      <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">digyo-pos</span>

      {envoye ? (
        <div className="py-4">
          <h2 id="demo-pos-titre" className="mt-1 font-display text-xl font-bold text-ink">
            Demande envoyée
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            Merci ! Nous vous rappelons rapidement pour convenir d'un créneau de démonstration.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-md bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-hover"
          >
            Fermer
          </button>
        </div>
      ) : (
        <>
          <h2 id="demo-pos-titre" className="mt-1 font-display text-xl font-bold text-ink">
            Demander une démonstration
          </h2>
          <p className="mt-2 text-sm text-ink/60">Nous vous rappelons pour vous montrer digyo-pos sur un cas proche du vôtre.</p>

          <form onSubmit={envoyer} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold text-ink">Nom complet</span>
              <input required value={form.nom} onChange={maj("nom")} className={champ} placeholder="Votre nom" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Téléphone</span>
              <input type="tel" required value={form.telephone} onChange={maj("telephone")} className={champ} placeholder="07 00 00 00 00" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Email</span>
              <input type="email" required value={form.email} onChange={maj("email")} className={champ} placeholder="vous@exemple.com" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Nom du commerce</span>
              <input value={form.commerce} onChange={maj("commerce")} className={champ} placeholder="Facultatif" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Activité</span>
              <input value={form.activite} onChange={maj("activite")} className={champ} placeholder="Supérette, librairie, quincaillerie…" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Nombre de boutiques</span>
              <select value={form.boutiques} onChange={maj("boutiques")} className={champ}>
                {["1", "2", "3 à 5", "Plus de 5"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Caisses au total</span>
              <select value={form.caisses} onChange={maj("caisses")} className={champ}>
                {["1", "2", "3 à 5", "Plus de 5"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>

            {erreur && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600 sm:col-span-2">{erreur}</div>}

            <button
              type="submit"
              disabled={envoi}
              className="w-full rounded-md bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-hover disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
            >
              {envoi ? "Envoi…" : "Être rappelé"}
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}
