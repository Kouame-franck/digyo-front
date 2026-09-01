import { deepStatusMeta } from "../lib/diagnostic";

// Statut du diagnostic approfondi (humain) d'une fiche enregistrée -- partagé entre la modale
// et la carte dépliée d'Espace client. N'a de sens que pour un `profile` réellement persisté,
// jamais pour un essai libre non connecté. `onOpen` ouvre DeepDiagnosticModal, qui affiche soit
// le formulaire (rien encore demandé), soit un résumé en lecture seule de la demande en cours.
export default function DeepDiagnosticStatus({ profile, onOpen }) {
  const meta = deepStatusMeta[profile.deepStatus];
  const requested = profile.deepStatus !== "not_requested";

  return (
    <div className="mt-6 rounded-2xl border border-ink/10 p-5">
      {requested && (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${meta.badge}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {meta.label}
        </span>
      )}
      {meta.description && <p className="mt-2 text-sm text-ink/60">{meta.description}</p>}
      {profile.deepStatus === "completed" && profile.deepResult && (
        <p className="mt-3 whitespace-pre-line rounded-xl bg-ink/5 p-4 text-sm text-ink/80">
          {profile.deepResult}
        </p>
      )}

      {requested ? (
        <button
          type="button"
          onClick={onOpen}
          className="mt-4 text-sm font-semibold text-lagune-dark hover:underline"
        >
          Voir le résumé de ma demande →
        </button>
      ) : (
        <button
          type="button"
          onClick={onOpen}
          className="w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
        >
          Diagnostic approfondi
        </button>
      )}
    </div>
  );
}
