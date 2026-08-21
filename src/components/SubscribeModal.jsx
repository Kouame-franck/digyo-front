import { useEffect, useState } from "react";
import Modal from "./Modal";
import { apiFetch } from "../lib/api";
import { ouvrirWidgetKadevPay } from "../lib/kadevpay";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  institution: "",
  ville: "",
};

const steps = ["Formule", "Vos informations", "Paiement"];

function formatFCFA(montant) {
  return `${Number(montant).toLocaleString("fr-FR")} FCFA`;
}

export default function SubscribeModal({ open, onClose, product, plans, initialPlanId }) {
  const [step, setStep] = useState(0);
  const [planId, setPlanId] = useState(initialPlanId || plans?.[0]?.id);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  // La console publie une offre distincte par cycle ("starter" / "starter-annuel") : la carte
  // met en avant l'annuel, c'est ici que le visiteur arbitre réellement mensuel vs annuel.
  const [cycle, setCycle] = useState("annuel");
  // Nombre de périodes achetées d'un coup (mois ou années selon le cycle) — plafonds alignés
  // sur calculerPeriode() côté console (lib/abonnement.js) : 11 mois (12 basculerait sur l'offre
  // annuelle, déjà moins chère), 10 ans. Jusqu'ici fixé à 1 sans aucun contrôle, ce qui empêchait
  // de payer plusieurs mois d'un coup, et a fortiori plusieurs années.
  const [quantite, setQuantite] = useState(1);

  useEffect(() => {
    if (open) {
      setStep(0);
      setPlanId(initialPlanId || plans?.[0]?.id);
      setForm(initialForm);
      setSubmitting(false);
      setError("");
      setCycle("annuel");
      setQuantite(1);
    }
  }, [open, initialPlanId, plans]);

  const plan = plans?.find((p) => p.id === planId) ?? plans?.[0];
  // Repli sur l'autre cycle si la formule choisie n'existe pas dans la période demandée.
  const offre = plan ? plan[cycle] ?? plan.annuel ?? plan.mensuel ?? null : null;
  const cycleDisponible = Boolean(plan?.mensuel && plan?.annuel);
  const periodeAffichee = offre
    ? offre.cycle === "annuel"
      ? "par an"
      : "par mois"
    : plan?.period;
  const montantTotal = offre ? offre.price * quantite : null;
  // `plan.price` (catalogue "legacy", sans offre live — voir hasPlans dans SaasDetail.jsx) est
  // déjà une chaîne formatée, pas un nombre : on ne la refait pas passer par formatFCFA.
  const montantAffiche = offre ? formatFCFA(montantTotal) : plan?.price;
  const dureeLabel = offre
    ? offre.cycle === "annuel"
      ? (quantite > 1 ? `${quantite} ans` : "1 an")
      : (quantite > 1 ? `${quantite} mois` : "1 mois")
    : plan?.period;

  function updateForm(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function goNext() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  // Une fois le widget terminé côté navigateur, on rejoint la page de confirmation existante en
  // lui donnant le même `?token=` qu'un agrégateur en mode "redirect" y déposerait lui-même — un
  // seul chemin de vérification (SaasSignupConfirmation.jsx), quel que soit l'agrégateur actif.
  function allerVersConfirmation(returnUrl, token) {
    const sep = returnUrl.includes("?") ? "&" : "?";
    window.location.href = `${returnUrl}${sep}token=${encodeURIComponent(token)}`;
  }

  async function handlePay() {
    setSubmitting(true);
    setError("");
    try {
      const data = await apiFetch("/api/sschool-signup/initier", {
        method: "POST",
        body: JSON.stringify({
          offerSlug: offre?.id ?? plan.id,
          quantite,
          nom: form.institution,
          ville: form.ville,
          responsableNom: form.fullName,
          responsableTelephone: form.phone,
          responsableEmail: form.email,
        }),
      });

      if (data.mode === "widget") {
        // KadevPay aujourd'hui : le paiement se fait dans une fenêtre modale sur cette même
        // page, pas par redirection — voir digyo-site/front/src/lib/kadevpay.js.
        await ouvrirWidgetKadevPay(data.widget, {
          onSuccess: async (res) => {
            try {
              await apiFetch("/api/sschool-signup/confirmer-widget", {
                method: "POST",
                body: JSON.stringify({ token: data.token, reference: res.reference }),
              });
            } catch (err) {
              // Sans effet bloquant : SaasSignupConfirmation.jsx revérifie de toute façon le
              // statut auprès de la console au chargement de la page suivante.
              console.error("Confirmation widget paiement :", err);
            }
            allerVersConfirmation(data.returnUrl, data.token);
          },
          onClose: () => setSubmitting(false),
        });
        return;
      }

      // Redirection pleine page vers le paiement électronique (agrégateur choisi par la
      // console, voir projects-admin/back/src/lib/paiement/) : on quitte la SPA, le retour se fait sur
      // /saas/:slug/confirmation?token=... (SIGNUP_RETURN_URL côté projects-admin), voir
      // SaasSignupConfirmation.jsx.
      window.location.href = data.url;
    } catch (err) {
      setError(err.message || "Impossible d'initier le paiement pour le moment.");
      setSubmitting(false);
    }
  }

  function handleClose() {
    onClose();
  }

  if (!plan) return null;

  return (
    <Modal open={open} onClose={handleClose} labelledBy="subscribe-modal-title" size="lg">
      <button
        type="button"
        onClick={handleClose}
        aria-label="Fermer"
        className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
        </svg>
      </button>

      <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
        S'abonner à {product.name}
      </span>
      <h2 id="subscribe-modal-title" className="mt-1 font-display text-xl font-bold text-ink">
        {steps[step]}
      </h2>

      <div className="mt-5 flex items-center gap-1.5">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= step ? "bg-lagune" : "bg-ink/10"
            }`}
          />
        ))}
      </div>

      {step === 0 && (
        <div className="mt-6 space-y-3">
          {cycleDisponible && (
            <div className="flex rounded-full bg-ink/5 p-1">
              {[
                { id: "mensuel", label: "Mensuel" },
                { id: "annuel", label: "Annuel" },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => { setCycle(c.id); setQuantite(1); }}
                  className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    cycle === c.id ? "bg-surface text-ink shadow-sm" : "text-ink/50 hover:text-ink/80"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}

          {offre && (
            <div className="flex items-center gap-3 rounded-2xl border border-ink/10 px-4 py-3">
              <span className="text-xs font-semibold text-ink/70 shrink-0">
                {cycle === "annuel" ? "Durée (années)" : "Durée (mois)"}
              </span>
              <input
                type="range"
                min={1}
                max={cycle === "annuel" ? 10 : 11}
                value={quantite}
                onChange={(e) => setQuantite(Number(e.target.value))}
                className="flex-1 accent-lagune"
              />
              <span className="text-sm font-bold text-ink w-14 text-right shrink-0">{dureeLabel}</span>
            </div>
          )}

          {plans.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlanId(p.id)}
              className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors ${
                p.id === planId
                  ? "border-lagune bg-lagune/5"
                  : "border-ink/10 hover:border-ink/25"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-ink">{p.name}</span>
                  {p.featured && (
                    <span className="inline-flex items-center rounded-full bg-lagune/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-lagune-dark">
                      Populaire
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-ink/60">{p.description}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-display text-sm font-bold text-ink">
                  {p[cycle] ? formatFCFA(p[cycle].price) : p.price}
                </div>
                <div className="text-[11px] text-ink/50">
                  {p[cycle] ? (cycle === "annuel" ? "par an" : "par mois") : p.period}
                </div>
              </div>
            </button>
          ))}

          <button
            type="button"
            onClick={goNext}
            className="mt-4 w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
          >
            Continuer avec {plan.name}
          </button>
        </div>
      )}

      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            goNext();
          }}
          className="mt-6 space-y-4"
        >
          <label className="block">
            <span className="text-sm font-semibold text-ink">Nom complet</span>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => updateForm("fullName", e.target.value)}
              className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
              placeholder="Votre nom"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-ink">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
                className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                placeholder="vous@etablissement.com"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Téléphone (Mobile Money)</span>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
                className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                placeholder="07 00 00 00 00"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-ink">Nom de l'établissement</span>
              <input
                type="text"
                required
                value={form.institution}
                onChange={(e) => updateForm("institution", e.target.value)}
                className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                placeholder="Nom de votre école ou centre"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Ville</span>
              <input
                type="text"
                required
                value={form.ville}
                onChange={(e) => updateForm("ville", e.target.value)}
                className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                placeholder="Abidjan, Bouaké…"
              />
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={goBack}
              className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/50"
            >
              Retour
            </button>
            <button
              type="submit"
              className="flex-1 rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
            >
              Continuer
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="mt-6">
          <div className="flex items-center gap-2 rounded-xl border border-blue-500 bg-blue-50 dark:bg-blue-900/20 py-3 px-4">
            <div>
              <p className="text-sm font-semibold text-blue-700">Paiement par Mobile Money</p>
              <p className="text-xs text-ink/60">Orange Money, MTN, Moov, Wave.</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-ink/10 bg-canvas p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink/60">Formule {plan.name}</span>
              <span className="font-display font-bold text-ink">{montantAffiche}</span>
            </div>
            <p className="mt-1 text-xs text-ink/50">
              {dureeLabel}{quantite > 1 && ` (${formatFCFA(offre.price)} ${periodeAffichee})`}
            </p>
            <p className="mt-3 text-xs text-ink/50">
              Établissement : <strong className="text-ink/70">{form.institution}</strong> — {form.ville}
            </p>
          </div>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-600">
              {error}
            </div>
          )}

          <p className="mt-4 text-xs text-ink/50">
            Vous serez redirigé vers notre prestataire de paiement électronique pour finaliser le paiement. Votre établissement et
            votre compte administrateur sont créés automatiquement dès le paiement confirmé.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={goBack}
              className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/50"
            >
              Retour
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={handlePay}
              className="flex-1 rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Redirection…" : `Payer ${montantAffiche}`}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
