import { useEffect, useState } from "react";
import Modal from "./Modal";
import { apiFetch } from "../lib/api";
import { useSession } from "../context/SessionContext";
import { useAuthModal } from "../context/AuthModalContext";
import {
  sectorOptions,
  teamSizeOptions,
  yearsActiveOptions,
  socialMediaOptions,
  digitalComfortOptions,
  toolsOptions,
  timelineOptions,
  deepStatusMeta,
} from "../lib/diagnostic";

const emptyForm = {
  companyName: "",
  sector: "",
  sectorOther: "",
  city: "",
  teamSize: "",
  yearsActive: "",
  hasWebsite: false,
  website: "",
  sellsOnline: false,
  socialMedia: [],
  digitalComfort: "",
  currentTools: [],
  timeline: "",
  mainChallenge: "",
  goals: "",
  budgetRange: "",
};

function formFromProfile(profile) {
  if (!profile) return emptyForm;
  // Un secteur enregistré qui n'est pas l'une des options fixes ne peut venir que d'un "Autre"
  // précisé manuellement (voir validateAnswers côté back, qui stocke directement la précision) --
  // on rouvre donc le champ libre pré-rempli plutôt que de perdre la sélection "Autre".
  const isCustomSector = profile.sector && !sectorOptions.includes(profile.sector);
  return {
    companyName: profile.companyName || "",
    sector: isCustomSector ? "Autre" : profile.sector || "",
    sectorOther: isCustomSector ? profile.sector : "",
    city: profile.city || "",
    teamSize: profile.teamSize || "",
    yearsActive: profile.yearsActive || "",
    hasWebsite: profile.hasWebsite,
    website: profile.website || "",
    sellsOnline: profile.sellsOnline,
    socialMedia: profile.socialMedia || [],
    digitalComfort: profile.digitalComfort || "",
    currentTools: profile.currentTools || [],
    timeline: profile.timeline || "",
    mainChallenge: profile.mainChallenge || "",
    goals: profile.goals || "",
    budgetRange: profile.budgetRange || "",
  };
}

export default function QuickDiagnosticModal({ open, onClose, profile, onProfileChange }) {
  const { user } = useSession();
  const { openAuthModal } = useAuthModal();
  // Résultat d'un essai libre (pas connecté, rien d'enregistré) -- distinct de `profile`, qui
  // lui vient toujours d'une fiche réellement sauvegardée en base.
  const [guestResult, setGuestResult] = useState(null);
  const [step, setStep] = useState(profile ? "result" : "form");
  const [form, setForm] = useState(formFromProfile(profile));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [requestingDeep, setRequestingDeep] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(profile || guestResult ? "result" : "form");
      setForm(formFromProfile(profile));
      setError("");
    }
    // Ne se relance qu'à l'ouverture pour ne pas écraser une saisie en cours.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Vue normalisée du résultat affiché, qu'il vienne d'une fiche enregistrée (`profile`) ou
  // d'un essai libre non connecté (`guestResult`) -- les deux endpoints (PUT / preview) reposent
  // sur le même moteur de calcul mais n'exposent pas les champs sous les mêmes noms.
  const result = profile
    ? { score: profile.quickScore, level: profile.quickLevel, axes: profile.quickAxes, recommendations: profile.quickSummary }
    : guestResult;

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function toggleSocial(name) {
    setForm((f) => ({
      ...f,
      socialMedia: f.socialMedia.includes(name)
        ? f.socialMedia.filter((s) => s !== name)
        : [...f.socialMedia, name],
    }));
  }

  function toggleTool(name) {
    setForm((f) => ({
      ...f,
      currentTools: f.currentTools.includes(name)
        ? f.currentTools.filter((t) => t !== name)
        : [...f.currentTools, name],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    setStep("loading");
    try {
      if (user) {
        const [data] = await Promise.all([
          apiFetch("/api/client-profile", { method: "PUT", body: JSON.stringify(form) }),
          new Promise((resolve) => setTimeout(resolve, 1300)),
        ]);
        onProfileChange(data.profile);
        setGuestResult(null);
      } else {
        // Essai libre : même moteur de calcul, mais rien n'est enregistré tant que l'invité
        // ne se connecte pas (voir handleSaveClick).
        const [data] = await Promise.all([
          apiFetch("/api/client-profile/preview", { method: "POST", body: JSON.stringify(form) }),
          new Promise((resolve) => setTimeout(resolve, 1300)),
        ]);
        setGuestResult(data.diagnostic);
      }
      setStep("result");
    } catch (err) {
      setError(err.message);
      setStep("form");
    } finally {
      setSubmitting(false);
    }
  }

  // Sauvegarde le brouillon d'un invité après connexion -- le formulaire déjà rempli (`form`)
  // n'est pas reperdu, on le soumet directement dès que la session s'ouvre.
  function handleSaveClick() {
    openAuthModal("login", {
      onSuccess: async () => {
        try {
          const data = await apiFetch("/api/client-profile", { method: "PUT", body: JSON.stringify(form) });
          onProfileChange(data.profile);
          setGuestResult(null);
        } catch {
          // La fiche reste visible localement ; l'utilisateur peut refaire "Sauvegarder" si besoin.
        }
      },
    });
  }

  async function handleRequestDeep() {
    setRequestingDeep(true);
    try {
      const data = await apiFetch("/api/client-profile/deep-diagnostic", { method: "POST" });
      onProfileChange(data.profile);
    } catch {
      // silencieux : l'utilisateur peut retenter depuis le tableau de bord
    } finally {
      setRequestingDeep(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="quick-diagnostic-title"
      size="lg"
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

      {step === "loading" && (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-lagune/20 border-t-lagune" />
          <p className="font-display text-lg font-bold text-ink">Analyse de votre activité…</p>
          <p className="max-w-xs text-sm text-ink/60">
            Nous croisons vos réponses avec nos critères d'audit digital.
          </p>
        </div>
      )}

      {step === "form" && (
        <>
          <h2 id="quick-diagnostic-title" className="font-display text-xl font-bold text-ink">
            Diagnostic rapide
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            Quelques questions sur votre activité pour générer un premier diagnostic digital,
            immédiatement.
          </p>
          <p className="mt-1 text-xs text-ink/40">
            <span className="text-ambre-dark">*</span> Champs obligatoires
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-7">
            <fieldset className="space-y-4">
              <legend className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
                Votre activité
              </legend>
              <label className="block">
                <span className="text-sm font-semibold text-ink">
                  Nom de l'entreprise / activité <span className="text-ambre-dark">*</span>
                </span>
                <input
                  type="text"
                  required
                  value={form.companyName}
                  onChange={set("companyName")}
                  placeholder="Ex. Boutique Awa, Cabinet Kouassi…"
                  className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-ink">
                    Secteur d'activité <span className="text-ambre-dark">*</span>
                  </span>
                  <select
                    required
                    value={form.sector}
                    onChange={set("sector")}
                    className="mt-2 w-full rounded-xl border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                  >
                    <option value="">Sélectionner…</option>
                    {sectorOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {form.sector === "Autre" && (
                    <>
                      <span className="mt-2 block text-xs font-semibold text-ink">
                        Précisez votre secteur <span className="text-ambre-dark">*</span>
                      </span>
                      <input
                        type="text"
                        required
                        value={form.sectorOther}
                        onChange={set("sectorOther")}
                        placeholder="Ex. Agriculture, Transport…"
                        className="mt-1 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                      />
                    </>
                  )}
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink">
                    Taille de l'équipe <span className="text-ambre-dark">*</span>
                  </span>
                  <select
                    required
                    value={form.teamSize}
                    onChange={set("teamSize")}
                    className="mt-2 w-full rounded-xl border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                  >
                    <option value="">Sélectionner…</option>
                    {teamSizeOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-ink">
                    En activité depuis <span className="text-ambre-dark">*</span>
                  </span>
                  <select
                    required
                    value={form.yearsActive}
                    onChange={set("yearsActive")}
                    className="mt-2 w-full rounded-xl border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                  >
                    <option value="">Sélectionner…</option>
                    {yearsActiveOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Ville / localisation</span>
                  <input
                    type="text"
                    value={form.city}
                    onChange={set("city")}
                    placeholder="Ex. Abidjan, Bouaké…"
                    className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
                Présence digitale
              </legend>
              <label className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={form.hasWebsite}
                  onChange={(e) => setForm((f) => ({ ...f, hasWebsite: e.target.checked }))}
                  className="h-4 w-4 rounded border-ink/30 text-lagune focus:ring-lagune/30"
                />
                <span className="text-sm text-ink">Vous avez un site web</span>
              </label>
              {form.hasWebsite && (
                <input
                  type="url"
                  value={form.website}
                  onChange={set("website")}
                  placeholder="https://…"
                  className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                />
              )}
              <label className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={form.sellsOnline}
                  onChange={(e) => setForm((f) => ({ ...f, sellsOnline: e.target.checked }))}
                  className="h-4 w-4 rounded border-ink/30 text-lagune focus:ring-lagune/30"
                />
                <span className="text-sm text-ink">Vous vendez déjà en ligne</span>
              </label>
              <div>
                <span className="text-sm font-semibold text-ink">Réseaux sociaux actifs</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {socialMediaOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSocial(s)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        form.socialMedia.includes(s)
                          ? "border-lagune bg-lagune/10 text-lagune-dark"
                          : "border-ink/15 text-ink/60 hover:border-ink/30"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-semibold text-ink">Outils déjà utilisés</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {toolsOptions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleTool(t)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        form.currentTools.includes(t)
                          ? "border-lagune bg-lagune/10 text-lagune-dark"
                          : "border-ink/15 text-ink/60 hover:border-ink/30"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <label className="block">
                <span className="text-sm font-semibold text-ink">
                  Aisance digitale de l'équipe <span className="text-ambre-dark">*</span>
                </span>
                <select
                  required
                  value={form.digitalComfort}
                  onChange={set("digitalComfort")}
                  className="mt-2 w-full rounded-xl border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                >
                  <option value="">Sélectionner…</option>
                  {digitalComfortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
                Objectifs
              </legend>
              <label className="block">
                <span className="text-sm font-semibold text-ink">
                  Votre principal défi digital aujourd'hui <span className="text-ambre-dark">*</span>
                </span>
                <textarea
                  required
                  rows={3}
                  value={form.mainChallenge}
                  onChange={set("mainChallenge")}
                  placeholder="Ex. Pas assez de visibilité en ligne, gestion manuelle chronophage…"
                  className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-ink">Vos objectifs (optionnel)</span>
                <textarea
                  rows={2}
                  value={form.goals}
                  onChange={set("goals")}
                  placeholder="Ce que vous aimeriez atteindre dans les prochains mois"
                  className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-ink">Délai souhaité pour démarrer (optionnel)</span>
                <select
                  value={form.timeline}
                  onChange={set("timeline")}
                  className="mt-2 w-full rounded-xl border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                >
                  <option value="">Sélectionner…</option>
                  {timelineOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-ink">Budget indicatif (optionnel)</span>
                <input
                  type="text"
                  value={form.budgetRange}
                  onChange={set("budgetRange")}
                  placeholder="Ex. 200 000 - 500 000 FCFA"
                  className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                />
              </label>
            </fieldset>

            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark disabled:opacity-60"
            >
              Lancer mon diagnostic rapide
            </button>
          </form>
        </>
      )}

      {step === "result" && result && (
        <div>
          <h2 id="quick-diagnostic-title" className="font-display text-xl font-bold text-ink">
            Votre diagnostic rapide
          </h2>

          <div className="mt-5 flex items-center gap-5 rounded-2xl border border-ink/10 bg-canvas p-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-lagune/10 font-display text-xl font-bold text-lagune-dark">
              {result.score}
              <span className="text-xs font-semibold">/100</span>
            </div>
            <div>
              <div className="font-display text-base font-bold text-ink">
                Maturité digitale : {result.level}
              </div>
              <p className="text-sm text-ink/60">Basé sur vos réponses au questionnaire.</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {result.axes.map((axis) => (
              <div key={axis.key}>
                <div className="flex items-center justify-between text-xs font-semibold text-ink/60">
                  <span>{axis.label}</span>
                  <span>{axis.score}/100</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full rounded-full bg-lagune" style={{ width: `${axis.score}%` }} />
                </div>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-sm font-bold text-ink">Nos recommandations prioritaires</h3>
          <ul className="mt-3 space-y-3">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex gap-3 rounded-xl bg-lagune/5 p-3.5 text-sm text-ink/80">
                <span className="mt-0.5 text-lagune-dark">→</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>

          {profile ? (
            <div className="mt-6 rounded-2xl border border-ink/10 p-5">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${
                  deepStatusMeta[profile.deepStatus].badge
                }`}
              >
                {deepStatusMeta[profile.deepStatus].label}
              </span>
              {deepStatusMeta[profile.deepStatus].description && (
                <p className="mt-2 text-sm text-ink/60">{deepStatusMeta[profile.deepStatus].description}</p>
              )}
              {profile.deepStatus === "completed" && profile.deepResult && (
                <p className="mt-3 whitespace-pre-line rounded-xl bg-ink/5 p-4 text-sm text-ink/80">
                  {profile.deepResult}
                </p>
              )}
              {profile.deepStatus === "not_requested" && (
                <button
                  type="button"
                  onClick={handleRequestDeep}
                  disabled={requestingDeep}
                  className="mt-4 w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark disabled:opacity-60"
                >
                  {requestingDeep ? "Envoi…" : "Soumettre à un diagnostic plus approfondi"}
                </button>
              )}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-lagune/40 bg-lagune/5 p-5">
              <p className="text-sm text-ink/70">
                Ceci est un essai libre : rien n'est encore enregistré. Connectez-vous pour
                sauvegarder ce diagnostic et accéder au diagnostic approfondi.
              </p>
              <button
                type="button"
                onClick={handleSaveClick}
                className="mt-4 w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
              >
                Sauvegarder mon diagnostic
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setStep("form")}
            className="mt-5 text-sm font-semibold text-ink/60 transition-colors hover:text-ink"
          >
            Modifier ma fiche
          </button>
        </div>
      )}
    </Modal>
  );
}
