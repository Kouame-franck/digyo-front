import { deepStatusMeta } from "../lib/diagnostic";

// Statut du diagnostic approfondi (humain) d'une fiche enregistrée -- partagé entre la modale
// et la carte dépliée d'Espace client. N'a de sens que pour un `profile` réellement persisté,
// jamais pour un essai libre non connecté.
export default function DeepDiagnosticStatus({ profile, requesting, onRequest }) {
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
      {profile.deepStatus === "not_requested" && (
        <button
          type="button"
          onClick={onRequest}
          disabled={requesting}
          className="mt-4 w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark disabled:opacity-60"
        >
          {requesting ? "Envoi…" : "Soumettre à un diagnostic plus approfondi"}
        </button>
      )}
    </div>
  );
}
