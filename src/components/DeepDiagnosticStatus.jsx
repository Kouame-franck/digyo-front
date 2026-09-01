import { deepStatusMeta } from "../lib/diagnostic";

// Statut du diagnostic approfondi (humain) d'une fiche enregistrée -- partagé entre la modale
// et la carte dépliée d'Espace client. N'a de sens que pour un `profile` réellement persisté,
// jamais pour un essai libre non connecté. `onOpenForm` ouvre le formulaire de demande
// (DeepDiagnosticModal) ; ce composant ne soumet jamais rien lui-même.
export default function DeepDiagnosticStatus({ profile, onOpenForm }) {
  const meta = deepStatusMeta[profile.deepStatus];

  return (
    <div className="mt-6 rounded-2xl border border-ink/10 p-5">
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${meta.badge}`}
      >
        {meta.label}
      </span>
      {meta.description && <p className="mt-2 text-sm text-ink/60">{meta.description}</p>}
      {profile.deepStatus === "completed" && profile.deepResult && (
        <p className="mt-3 whitespace-pre-line rounded-xl bg-ink/5 p-4 text-sm text-ink/80">
          {profile.deepResult}
        </p>
      )}
      {profile.deepStatus !== "not_requested" && profile.deepChallenge && (
        <div className="mt-3 rounded-xl bg-ink/5 p-4 text-sm text-ink/70">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Votre demande</p>
          <p className="mt-1.5 whitespace-pre-line">{profile.deepChallenge}</p>
          {(profile.deepAddress || profile.deepPhone) && (
            <p className="mt-2 text-xs text-ink/50">
              {[profile.deepAddress, profile.deepPhone].filter(Boolean).join(" · ")}
            </p>
          )}
          {profile.deepAcceptAudit && (
            <p className="mt-1 text-xs text-ink/50">Audit physique accepté si nécessaire.</p>
          )}
        </div>
      )}
      {profile.deepStatus === "not_requested" && (
        <button
          type="button"
          onClick={onOpenForm}
          className="mt-4 w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
        >
          Diagnostic approfondi
        </button>
      )}
    </div>
  );
}
