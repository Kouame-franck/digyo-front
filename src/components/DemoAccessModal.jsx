import { useEffect, useState } from "react";
import Modal from "./Modal";
import { apiFetch } from "../lib/api";

// Accès au compte test s-school : capture nom/email/téléphone, puis révèle les identifiants
// partagés remis par la console (voir digyo-site/back/src/routes/demo.js). Pas de paiement, pas
// de provisioning — un seul compte de démonstration sert à tout le monde.
export default function DemoAccessModal({ open, onClose, productName = "s-school" }) {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "" });
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState("");
  const [acces, setAcces] = useState(null); // { login, password, url }
  const [copie, setCopie] = useState("");

  useEffect(() => {
    if (open) {
      setForm({ nom: "", email: "", telephone: "" });
      setEnvoi(false);
      setErreur("");
      setAcces(null);
      setCopie("");
    }
  }, [open]);

  function majChamp(champ, valeur) {
    setForm((f) => ({ ...f, [champ]: valeur }));
  }

  function demanderAcces(e) {
    e.preventDefault();
    setEnvoi(true);
    setErreur("");
    apiFetch("/api/demo/acceder", { method: "POST", body: JSON.stringify(form) })
      .then((data) => setAcces(data))
      .catch((err) => setErreur(err.message || "Impossible de récupérer l'accès test pour le moment."))
      .finally(() => setEnvoi(false));
  }

  function copier(valeur, champ) {
    navigator.clipboard?.writeText(valeur).then(() => {
      setCopie(champ);
      setTimeout(() => setCopie(""), 1500);
    });
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="demo-access-title" size="md">
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

      <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
        Tester {productName}
      </span>

      {!acces ? (
        <>
          <h2 id="demo-access-title" className="mt-1 font-display text-xl font-bold text-ink">
            Vos coordonnées
          </h2>
          <p className="mt-2 text-sm text-ink/60">
            Trois champs, et vous accédez tout de suite à un compte de démonstration —
            partagé, sans engagement.
          </p>

          <form onSubmit={demanderAcces} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-ink">Nom complet</span>
              <input
                type="text"
                required
                value={form.nom}
                onChange={(e) => majChamp("nom", e.target.value)}
                className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                placeholder="Votre nom"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => majChamp("email", e.target.value)}
                className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                placeholder="vous@exemple.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Téléphone</span>
              <input
                type="tel"
                required
                value={form.telephone}
                onChange={(e) => majChamp("telephone", e.target.value)}
                className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                placeholder="07 00 00 00 00"
              />
            </label>

            {erreur && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-600">
                {erreur}
              </div>
            )}

            <button
              type="submit"
              disabled={envoi}
              className="w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {envoi ? "Un instant…" : "Accéder au compte test"}
            </button>
            <p className="text-center text-[11px] text-ink/45">
              Un compte de démonstration partagé — les données que vous y verrez ne sont pas
              les vôtres, et vos essais peuvent être visibles d'autres testeurs.
            </p>
          </form>
        </>
      ) : (
        <>
          <h2 className="mt-1 font-display text-xl font-bold text-ink">C'est ouvert</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            Voici les identifiants du compte de démonstration — ils donnent accès à
            l'espace administrateur, celui qui pilote l'ensemble de l'établissement.
          </p>

          <div className="mt-6 space-y-2 rounded-2xl border border-ink/10 bg-canvas p-5 text-left">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Identifiant
                </div>
                <div className="mt-0.5 text-sm font-medium text-ink">{acces.login}</div>
              </div>
              <button
                type="button"
                onClick={() => copier(acces.login, "login")}
                className="shrink-0 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink/70 hover:border-ink/30"
              >
                {copie === "login" ? "Copié" : "Copier"}
              </button>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-ink/10 pt-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Mot de passe
                </div>
                <div className="mt-0.5 text-sm font-medium text-ink">{acces.password}</div>
              </div>
              <button
                type="button"
                onClick={() => copier(acces.password, "password")}
                className="shrink-0 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink/70 hover:border-ink/30"
              >
                {copie === "password" ? "Copié" : "Copier"}
              </button>
            </div>
          </div>

          <a
            href={acces.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
          >
            Me connecter à {productName}
          </a>
        </>
      )}
    </Modal>
  );
}
