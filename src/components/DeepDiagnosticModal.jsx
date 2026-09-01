import { useEffect, useState } from "react";
import Modal from "./Modal";
import { apiFetch } from "../lib/api";
import {
  clienteleOptions,
  annualRevenueOptions,
  contactMethodOptions,
  availabilityOptions,
  businessGoalsOptions,
  lostProspectsOptions,
  interestAreasOptions,
  investmentBudgetOptions,
  deepStatusMeta,
} from "../lib/diagnostic";

const emptyForm = {
  detailedChallenge: "",
  constraints: "",
  businessGoals: [],
  differentiation: "",
  clientele: "",
  annualRevenue: "",
  decisionMaker: "",
  lostProspects: "",
  interestAreas: [],
  investmentBudget: "",
  digitalImportance: "",
  expectations: "",
  address: "",
  phone: "",
  contactMethod: "ecrit",
  availability: [],
  acceptPhysicalAudit: false,
};

function labelFor(options, value) {
  return options.find((o) => o.value === value)?.label ?? value;
}

function toggleIn(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function TagToggle({ options, selected, onToggle }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onToggle(option)}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            selected.includes(option)
              ? "border-lagune bg-lagune/10 text-lagune-dark"
              : "border-ink/15 text-ink/60 hover:border-ink/30"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

// Formulaire dédié à la demande de diagnostic approfondi (humain) -- distinct du diagnostic
// rapide, qui ne sert qu'à calculer un score automatique. Les questions ci-dessous reprennent,
// en version allégée pour un formulaire en libre-service, celles de la fiche d'audit DIGYO
// (public/DIGYO_Fiche_Audit_Diagnostic_Digital.pdf) -- pas ses grilles internes (score, SWOT,
// feuille de route, signature), qui n'ont de sens que remplies par l'auditeur après coup.
// `profile` détermine le point d'entrée : formulaire si rien n'a encore été demandé, résumé en
// lecture seule sinon -- pour pouvoir revoir sa demande à tout moment sans la refaire.
export default function DeepDiagnosticModal({ open, onClose, profile, onSubmitted }) {
  const alreadyRequested = profile && profile.deepStatus !== "not_requested";
  const [step, setStep] = useState(alreadyRequested ? "summary" : "form");
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(alreadyRequested ? "summary" : "form");
      setForm(emptyForm);
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

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
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="deep-diagnostic-title"
      size="2xl"
      closeOnBackdropClick={false}
    >
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

          <form onSubmit={handleSubmit} className="mt-6 space-y-8">
            <fieldset className="space-y-4">
              <legend className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
                1. Votre défi et vos objectifs
              </legend>
              <label className="block">
                <span className="text-sm font-semibold text-ink">
                  Décrivez plus précisément vos défis et ce que vous attendez de ce diagnostic{" "}
                  <span className="text-ambre-dark">*</span>
                </span>
                <textarea
                  required
                  rows={4}
                  value={form.detailedChallenge}
                  onChange={set("detailedChallenge")}
                  placeholder="Ex. Nous perdons des clients faute de suivi après la vente, notre équipe jongle entre trois outils différents qui ne communiquent pas entre eux…"
                  className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-ink">
                  Contraintes particulières (optionnel)
                </span>
                <textarea
                  rows={2}
                  value={form.constraints}
                  onChange={set("constraints")}
                  placeholder="Réglementaires, techniques, budgétaires…"
                  className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                />
              </label>
              <div>
                <span className="text-sm font-semibold text-ink">
                  Vos principaux objectifs pour les 12 prochains mois (optionnel)
                </span>
                <TagToggle
                  options={businessGoalsOptions}
                  selected={form.businessGoals}
                  onToggle={(g) => setForm((f) => ({ ...f, businessGoals: toggleIn(f.businessGoals, g) }))}
                />
              </div>
              <label className="block">
                <span className="text-sm font-semibold text-ink">
                  Pourquoi un client devrait-il vous choisir plutôt qu'un concurrent ? (optionnel)
                </span>
                <textarea
                  rows={2}
                  value={form.differentiation}
                  onChange={set("differentiation")}
                  className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                />
              </label>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
                2. Votre activité en détail
              </legend>
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Nombre de clients actuels</span>
                  <select
                    value={form.clientele}
                    onChange={set("clientele")}
                    className="mt-2 w-full rounded-xl border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                  >
                    <option value="">Sélectionner…</option>
                    {clienteleOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Chiffre d'affaires annuel</span>
                  <select
                    value={form.annualRevenue}
                    onChange={set("annualRevenue")}
                    className="mt-2 w-full rounded-xl border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                  >
                    <option value="">Sélectionner…</option>
                    {annualRevenueOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink">
                    Prospects perdus faute de suivi / mois
                  </span>
                  <select
                    value={form.lostProspects}
                    onChange={set("lostProspects")}
                    className="mt-2 w-full rounded-xl border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                  >
                    <option value="">Sélectionner…</option>
                    {lostProspectsOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-semibold text-ink">
                  Qui prend la décision pour ce projet ? (optionnel)
                </span>
                <input
                  type="text"
                  value={form.decisionMaker}
                  onChange={set("decisionMaker")}
                  placeholder="Nom et fonction"
                  className="mt-2 w-full max-w-sm rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                />
              </label>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
                3. Votre accompagnement
              </legend>
              <div>
                <span className="text-sm font-semibold text-ink">
                  Domaines qui vous intéressent le plus (optionnel)
                </span>
                <TagToggle
                  options={interestAreasOptions}
                  selected={form.interestAreas}
                  onToggle={(a) => setForm((f) => ({ ...f, interestAreas: toggleIn(f.interestAreas, a) }))}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Budget d'investissement envisagé</span>
                  <select
                    value={form.investmentBudget}
                    onChange={set("investmentBudget")}
                    className="mt-2 w-full rounded-xl border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                  >
                    <option value="">Sélectionner…</option>
                    {investmentBudgetOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
                <div>
                  <span className="text-sm font-semibold text-ink">
                    Importance du digital pour votre activité
                  </span>
                  <div className="mt-2 flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, digitalImportance: String(n) }))}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                          Number(form.digitalImportance) === n
                            ? "border-lagune bg-lagune text-white"
                            : "border-ink/15 text-ink/60 hover:border-ink/30"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <label className="block">
                <span className="text-sm font-semibold text-ink">
                  Qu'attendez-vous concrètement de cet accompagnement ? (optionnel)
                </span>
                <textarea
                  rows={2}
                  value={form.expectations}
                  onChange={set("expectations")}
                  className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                />
              </label>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
                4. Échange avec notre équipe
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Adresse ou zone précise (optionnel)</span>
                  <input
                    type="text"
                    value={form.address}
                    onChange={set("address")}
                    placeholder="Ex. Cocody, Riviera 3, Abidjan"
                    className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Téléphone (optionnel)</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="Ex. 07 00 00 00 00"
                    className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-semibold text-ink">
                  Comment souhaitez-vous échanger avec notre équipe ?
                </span>
                <select
                  value={form.contactMethod}
                  onChange={set("contactMethod")}
                  className="mt-2 w-full max-w-sm rounded-xl border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                >
                  {contactMethodOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
              {form.contactMethod !== "ecrit" && (
                <div>
                  <span className="text-sm font-semibold text-ink">Vos créneaux de disponibilité</span>
                  <TagToggle
                    options={availabilityOptions}
                    selected={form.availability}
                    onToggle={(slot) => setForm((f) => ({ ...f, availability: toggleIn(f.availability, slot) }))}
                  />
                </div>
              )}
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
            </fieldset>

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

      {step === "summary" && profile && (
        <div>
          <h2 id="deep-diagnostic-title" className="font-display text-xl font-bold text-ink">
            Votre demande de diagnostic approfondi
          </h2>
          <span
            className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
              deepStatusMeta[profile.deepStatus].badge
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {deepStatusMeta[profile.deepStatus].label}
          </span>

          {profile.deepStatus === "completed" && profile.deepResult && (
            <div className="mt-5 rounded-xl bg-lagune/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-lagune-dark">
                Notre diagnostic
              </p>
              <p className="mt-1.5 whitespace-pre-line text-sm text-ink/80">{profile.deepResult}</p>
            </div>
          )}

          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Défis décrits
              </dt>
              <dd className="mt-1 whitespace-pre-line text-ink/80">{profile.deepChallenge}</dd>
            </div>
            {profile.deepConstraints && (
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Contraintes particulières
                </dt>
                <dd className="mt-1 whitespace-pre-line text-ink/80">{profile.deepConstraints}</dd>
              </div>
            )}
            {profile.deepBusinessGoals?.length > 0 && (
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Objectifs pour les 12 prochains mois
                </dt>
                <dd className="mt-1 text-ink/80">{profile.deepBusinessGoals.join(", ")}</dd>
              </div>
            )}
            {profile.deepDifferentiation && (
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Différenciation
                </dt>
                <dd className="mt-1 whitespace-pre-line text-ink/80">{profile.deepDifferentiation}</dd>
              </div>
            )}
            {profile.deepClientele && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Nombre de clients
                </dt>
                <dd className="mt-1 text-ink/80">{labelFor(clienteleOptions, profile.deepClientele)}</dd>
              </div>
            )}
            {profile.deepAnnualRevenue && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Chiffre d'affaires
                </dt>
                <dd className="mt-1 text-ink/80">
                  {labelFor(annualRevenueOptions, profile.deepAnnualRevenue)}
                </dd>
              </div>
            )}
            {profile.deepLostProspects && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Prospects perdus / mois
                </dt>
                <dd className="mt-1 text-ink/80">{labelFor(lostProspectsOptions, profile.deepLostProspects)}</dd>
              </div>
            )}
            {profile.deepDecisionMaker && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Décideur pour ce projet
                </dt>
                <dd className="mt-1 text-ink/80">{profile.deepDecisionMaker}</dd>
              </div>
            )}
            {profile.deepInterestAreas?.length > 0 && (
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Domaines d'intérêt
                </dt>
                <dd className="mt-1 text-ink/80">{profile.deepInterestAreas.join(", ")}</dd>
              </div>
            )}
            {profile.deepInvestmentBudget && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Budget d'investissement
                </dt>
                <dd className="mt-1 text-ink/80">
                  {labelFor(investmentBudgetOptions, profile.deepInvestmentBudget)}
                </dd>
              </div>
            )}
            {profile.deepDigitalImportance && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Importance du digital
                </dt>
                <dd className="mt-1 text-ink/80">{profile.deepDigitalImportance} / 5</dd>
              </div>
            )}
            {profile.deepExpectations && (
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Attentes de l'accompagnement
                </dt>
                <dd className="mt-1 whitespace-pre-line text-ink/80">{profile.deepExpectations}</dd>
              </div>
            )}
            {profile.deepAddress && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">Adresse</dt>
                <dd className="mt-1 text-ink/80">{profile.deepAddress}</dd>
              </div>
            )}
            {profile.deepPhone && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">Téléphone</dt>
                <dd className="mt-1 text-ink/80">{profile.deepPhone}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Mode d'échange préféré
              </dt>
              <dd className="mt-1 text-ink/80">
                {labelFor(contactMethodOptions, profile.deepContactMethod)}
              </dd>
            </div>
            {profile.deepAvailability?.length > 0 && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                  Créneaux de disponibilité
                </dt>
                <dd className="mt-1 text-ink/80">{profile.deepAvailability.join(", ")}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                Audit physique
              </dt>
              <dd className="mt-1 text-ink/80">
                {profile.deepAcceptAudit ? "Accepté si nécessaire" : "Non souhaité"}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
          >
            Fermer
          </button>
        </div>
      )}
    </Modal>
  );
}
