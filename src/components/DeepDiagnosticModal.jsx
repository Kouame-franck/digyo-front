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

// Le formulaire lui-même (pas la vue post-soumission) : chaque étape doit être complète avant
// de pouvoir avancer -- toutes les questions sont obligatoires pour un diagnostic approfondi,
// contrairement au diagnostic rapide où presque tout est facultatif. Le consentement à l'audit
// physique reste volontairement hors de cette liste : en faire un champ "obligatoire" reviendrait
// à forcer une réponse positive, ce qui n'a pas de sens pour un consentement.
const STEPS = [
  { key: "challenge", label: "Défi & objectifs" },
  { key: "business", label: "Activité en détail" },
  { key: "support", label: "Accompagnement" },
  { key: "contact", label: "Échange" },
  { key: "review", label: "Récapitulatif" },
];

function stepIsComplete(index, form) {
  switch (index) {
    case 0:
      return Boolean(
        form.detailedChallenge.trim() &&
          form.constraints.trim() &&
          form.businessGoals.length > 0 &&
          form.differentiation.trim()
      );
    case 1:
      return Boolean(
        form.clientele && form.annualRevenue && form.decisionMaker.trim() && form.lostProspects
      );
    case 2:
      return Boolean(
        form.interestAreas.length > 0 &&
          form.investmentBudget &&
          form.digitalImportance &&
          form.expectations.trim()
      );
    case 3:
      return Boolean(
        form.address.trim() &&
          form.phone.trim() &&
          (form.contactMethod === "ecrit" || form.availability.length > 0)
      );
    default:
      return true;
  }
}

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

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">
        {label} <span className="text-ambre-dark">*</span>
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20";

function Stepper({ currentIndex }) {
  return (
    <div className="mt-5">
      <div className="flex items-center">
        {STEPS.map((s, i) => (
          <div key={s.key} className="flex flex-1 items-center last:flex-none">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                i < currentIndex
                  ? "bg-lagune text-white"
                  : i === currentIndex
                  ? "border-2 border-lagune text-lagune-dark"
                  : "border border-ink/15 text-ink/40"
              }`}
            >
              {i < currentIndex ? (
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 10.5l3.5 3.5 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            {i < STEPS.length - 1 && (
              <span className={`mx-1.5 h-px flex-1 ${i < currentIndex ? "bg-lagune" : "bg-ink/10"}`} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 hidden justify-between sm:flex">
        {STEPS.map((s, i) => (
          <span
            key={s.key}
            className={`w-8 text-center text-[11px] font-semibold leading-tight ${
              i === currentIndex ? "text-ink" : "text-ink/40"
            }`}
            style={{ width: `${100 / STEPS.length}%` }}
          >
            {s.label}
          </span>
        ))}
      </div>
      <p className="mt-2 text-center text-xs font-semibold text-ink/50 sm:hidden">
        Étape {currentIndex + 1} / {STEPS.length} — {STEPS[currentIndex].label}
      </p>
    </div>
  );
}

// Formulaire dédié à la demande de diagnostic approfondi (humain) -- distinct du diagnostic
// rapide, qui ne sert qu'à calculer un score automatique. Les questions reprennent, en version
// allégée pour un formulaire en libre-service, celles de la fiche d'audit DIGYO
// (public/DIGYO_Fiche_Audit_Diagnostic_Digital.pdf) -- pas ses grilles internes (score, SWOT,
// feuille de route, signature), qui n'ont de sens que remplies par l'auditeur après coup.
// `profile` détermine le point d'entrée : assistant par étapes si rien n'a encore été demandé,
// résumé en lecture seule sinon -- pour pouvoir revoir sa demande à tout moment sans la refaire.
export default function DeepDiagnosticModal({ open, onClose, profile, onSubmitted }) {
  const alreadyRequested = profile && profile.deepStatus !== "not_requested";
  const [mode, setMode] = useState(alreadyRequested ? "summary" : "wizard");
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [stepError, setStepError] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setMode(alreadyRequested ? "summary" : "wizard");
      setStepIndex(0);
      setForm(emptyForm);
      setStepError("");
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function goNext() {
    if (!stepIsComplete(stepIndex, form)) {
      setStepError("Merci de compléter tous les champs de cette section avant de continuer.");
      return;
    }
    setStepError("");
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }

  function goBack() {
    setStepError("");
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (STEPS.some((_, i) => i < STEPS.length - 1 && !stepIsComplete(i, form))) {
      setStepError("Merci de compléter tous les champs avant d'envoyer votre demande.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const data = await apiFetch("/api/client-profile/deep-diagnostic", {
        method: "POST",
        body: JSON.stringify(form),
      });
      onSubmitted(data.profile);
      setMode("sent");
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

      {mode === "wizard" && (
        <>
          <h2 id="deep-diagnostic-title" className="font-display text-xl font-bold text-ink">
            Diagnostic approfondi
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            Notre équipe examine votre situation en détail et revient vers vous avec des
            recommandations concrètes. Toutes les questions sont nécessaires pour un diagnostic
            complet.
          </p>

          <Stepper currentIndex={stepIndex} />

          <form onSubmit={handleSubmit} className="mt-7">
            {stepIndex === 0 && (
              <fieldset className="space-y-5">
                <Field label="Décrivez plus précisément vos défis et ce que vous attendez de ce diagnostic">
                  <textarea
                    rows={4}
                    value={form.detailedChallenge}
                    onChange={set("detailedChallenge")}
                    placeholder="Ex. Nous perdons des clients faute de suivi après la vente, notre équipe jongle entre trois outils différents qui ne communiquent pas entre eux…"
                    className={inputClass}
                  />
                </Field>
                <Field label="Contraintes particulières">
                  <textarea
                    rows={2}
                    value={form.constraints}
                    onChange={set("constraints")}
                    placeholder="Réglementaires, techniques, budgétaires…"
                    className={inputClass}
                  />
                </Field>
                <div>
                  <span className="text-sm font-semibold text-ink">
                    Vos principaux objectifs pour les 12 prochains mois <span className="text-ambre-dark">*</span>
                  </span>
                  <TagToggle
                    options={businessGoalsOptions}
                    selected={form.businessGoals}
                    onToggle={(g) => setForm((f) => ({ ...f, businessGoals: toggleIn(f.businessGoals, g) }))}
                  />
                </div>
                <Field label="Pourquoi un client devrait-il vous choisir plutôt qu'un concurrent ?">
                  <textarea rows={2} value={form.differentiation} onChange={set("differentiation")} className={inputClass} />
                </Field>
              </fieldset>
            )}

            {stepIndex === 1 && (
              <fieldset className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="Nombre de clients actuels">
                    <select value={form.clientele} onChange={set("clientele")} className={`${inputClass} bg-surface`}>
                      <option value="">Sélectionner…</option>
                      {clienteleOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Chiffre d'affaires annuel">
                    <select value={form.annualRevenue} onChange={set("annualRevenue")} className={`${inputClass} bg-surface`}>
                      <option value="">Sélectionner…</option>
                      {annualRevenueOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Prospects perdus faute de suivi / mois">
                    <select value={form.lostProspects} onChange={set("lostProspects")} className={`${inputClass} bg-surface`}>
                      <option value="">Sélectionner…</option>
                      {lostProspectsOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Qui prend la décision pour ce projet ?">
                  <input
                    type="text"
                    value={form.decisionMaker}
                    onChange={set("decisionMaker")}
                    placeholder="Nom et fonction"
                    className={`${inputClass} max-w-sm`}
                  />
                </Field>
              </fieldset>
            )}

            {stepIndex === 2 && (
              <fieldset className="space-y-5">
                <div>
                  <span className="text-sm font-semibold text-ink">
                    Domaines qui vous intéressent le plus <span className="text-ambre-dark">*</span>
                  </span>
                  <TagToggle
                    options={interestAreasOptions}
                    selected={form.interestAreas}
                    onToggle={(a) => setForm((f) => ({ ...f, interestAreas: toggleIn(f.interestAreas, a) }))}
                  />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Budget d'investissement envisagé">
                    <select
                      value={form.investmentBudget}
                      onChange={set("investmentBudget")}
                      className={`${inputClass} bg-surface`}
                    >
                      <option value="">Sélectionner…</option>
                      {investmentBudgetOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <div>
                    <span className="text-sm font-semibold text-ink">
                      Importance du digital pour votre activité <span className="text-ambre-dark">*</span>
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
                <Field label="Qu'attendez-vous concrètement de cet accompagnement ?">
                  <textarea rows={2} value={form.expectations} onChange={set("expectations")} className={inputClass} />
                </Field>
              </fieldset>
            )}

            {stepIndex === 3 && (
              <fieldset className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Adresse ou zone précise">
                    <input
                      type="text"
                      value={form.address}
                      onChange={set("address")}
                      placeholder="Ex. Cocody, Riviera 3, Abidjan"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Téléphone">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="Ex. 07 00 00 00 00"
                      className={inputClass}
                    />
                  </Field>
                </div>
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Comment souhaitez-vous échanger avec notre équipe ?</span>
                  <select
                    value={form.contactMethod}
                    onChange={set("contactMethod")}
                    className={`${inputClass} max-w-sm bg-surface`}
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
                    <span className="text-sm font-semibold text-ink">
                      Vos créneaux de disponibilité <span className="text-ambre-dark">*</span>
                    </span>
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
            )}

            {stepIndex === 4 && (
              <ReviewStep form={form} onEditStep={(i) => setStepIndex(i)} />
            )}

            {stepError && <p className="mt-5 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{stepError}</p>}
            {error && <p className="mt-5 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            <div className="mt-8 flex items-center justify-between gap-3">
              {stepIndex > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
                >
                  Précédent
                </button>
              ) : (
                <span />
              )}
              {stepIndex < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-full bg-lagune px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark disabled:opacity-60"
                >
                  {submitting ? "Envoi…" : "Envoyer ma demande"}
                </button>
              )}
            </div>
          </form>
        </>
      )}

      {mode === "sent" && (
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

      {mode === "summary" && profile && (
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
              <p className="text-xs font-semibold uppercase tracking-wide text-lagune-dark">Notre diagnostic</p>
              <p className="mt-1.5 whitespace-pre-line text-sm text-ink/80">{profile.deepResult}</p>
            </div>
          )}

          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <SummaryItem full label="Défis décrits" value={profile.deepChallenge} multiline />
            <SummaryItem full label="Contraintes particulières" value={profile.deepConstraints} multiline />
            <SummaryItem full label="Objectifs pour les 12 prochains mois" value={profile.deepBusinessGoals?.join(", ")} />
            <SummaryItem full label="Différenciation" value={profile.deepDifferentiation} multiline />
            <SummaryItem label="Nombre de clients" value={labelFor(clienteleOptions, profile.deepClientele)} />
            <SummaryItem label="Chiffre d'affaires" value={labelFor(annualRevenueOptions, profile.deepAnnualRevenue)} />
            <SummaryItem label="Prospects perdus / mois" value={labelFor(lostProspectsOptions, profile.deepLostProspects)} />
            <SummaryItem label="Décideur pour ce projet" value={profile.deepDecisionMaker} />
            <SummaryItem full label="Domaines d'intérêt" value={profile.deepInterestAreas?.join(", ")} />
            <SummaryItem label="Budget d'investissement" value={labelFor(investmentBudgetOptions, profile.deepInvestmentBudget)} />
            <SummaryItem label="Importance du digital" value={profile.deepDigitalImportance ? `${profile.deepDigitalImportance} / 5` : null} />
            <SummaryItem full label="Attentes de l'accompagnement" value={profile.deepExpectations} multiline />
            <SummaryItem label="Adresse" value={profile.deepAddress} />
            <SummaryItem label="Téléphone" value={profile.deepPhone} />
            <SummaryItem label="Mode d'échange préféré" value={labelFor(contactMethodOptions, profile.deepContactMethod)} />
            <SummaryItem label="Créneaux de disponibilité" value={profile.deepAvailability?.join(", ")} />
            <SummaryItem label="Audit physique" value={profile.deepAcceptAudit ? "Accepté si nécessaire" : "Non souhaité"} />
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

function SummaryItem({ label, value, multiline, full }) {
  if (!value) return null;
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <dt className="text-xs font-semibold uppercase tracking-wide text-ink/40">{label}</dt>
      <dd className={`mt-1 text-ink/80 ${multiline ? "whitespace-pre-line" : ""}`}>{value}</dd>
    </div>
  );
}

// Récapitulatif affiché comme dernière étape de l'assistant, avant l'envoi -- distinct du
// résumé post-soumission ci-dessus : celui-ci lit `form` (le brouillon en cours), pas `profile`
// (une fiche déjà enregistrée), et chaque section renvoie à l'étape correspondante pour
// modification plutôt que de n'être qu'en lecture seule.
function ReviewStep({ form, onEditStep }) {
  const sections = [
    {
      step: 0,
      title: "Défi & objectifs",
      items: [
        { label: "Défis décrits", value: form.detailedChallenge },
        { label: "Contraintes particulières", value: form.constraints },
        { label: "Objectifs 12 mois", value: form.businessGoals.join(", ") },
        { label: "Différenciation", value: form.differentiation },
      ],
    },
    {
      step: 1,
      title: "Activité en détail",
      items: [
        { label: "Nombre de clients", value: labelFor(clienteleOptions, form.clientele) },
        { label: "Chiffre d'affaires", value: labelFor(annualRevenueOptions, form.annualRevenue) },
        { label: "Prospects perdus / mois", value: labelFor(lostProspectsOptions, form.lostProspects) },
        { label: "Décideur", value: form.decisionMaker },
      ],
    },
    {
      step: 2,
      title: "Accompagnement souhaité",
      items: [
        { label: "Domaines d'intérêt", value: form.interestAreas.join(", ") },
        { label: "Budget d'investissement", value: labelFor(investmentBudgetOptions, form.investmentBudget) },
        { label: "Importance du digital", value: form.digitalImportance ? `${form.digitalImportance} / 5` : "" },
        { label: "Attentes", value: form.expectations },
      ],
    },
    {
      step: 3,
      title: "Échange avec l'équipe",
      items: [
        { label: "Adresse", value: form.address },
        { label: "Téléphone", value: form.phone },
        { label: "Mode d'échange", value: labelFor(contactMethodOptions, form.contactMethod) },
        { label: "Disponibilités", value: form.availability.join(", ") },
        { label: "Audit physique", value: form.acceptPhysicalAudit ? "Accepté si nécessaire" : "Non souhaité" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm text-ink/60">
        Dernière étape : vérifiez vos réponses avant l'envoi. Vous pouvez encore modifier
        n'importe quelle section.
      </p>
      {sections.map((section) => (
        <div key={section.step} className="rounded-2xl border border-ink/10 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-lagune-dark">{section.title}</h3>
            <button
              type="button"
              onClick={() => onEditStep(section.step)}
              className="text-xs font-semibold text-ink/50 transition-colors hover:text-lagune-dark"
            >
              Modifier
            </button>
          </div>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            {section.items
              .filter((i) => i.value)
              .map((i) => (
                <div key={i.label}>
                  <dt className="text-xs text-ink/40">{i.label}</dt>
                  <dd className="mt-0.5 whitespace-pre-line text-ink/80">{i.value}</dd>
                </div>
              ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
