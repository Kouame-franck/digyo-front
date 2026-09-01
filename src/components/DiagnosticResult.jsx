// Rendu du score/axes/recommandations d'un diagnostic rapide -- partagé entre la modale
// (essai libre, confirmation après sauvegarde) et la carte dépliée d'Espace client, qui
// affichent toutes deux la même forme de résultat ({ score, level, axes, recommendations }).
export default function DiagnosticResult({ result }) {
  return (
    <div>
      {(result.companyName || result.sector) && (
        <div className="mb-4">
          {result.companyName && (
            <div className="font-display text-lg font-bold text-ink">{result.companyName}</div>
          )}
          {result.sector && <div className="text-sm text-ink/60">{result.sector}</div>}
        </div>
      )}
      <div className="flex items-center gap-5 rounded-2xl border border-ink/10 bg-canvas p-5">
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
    </div>
  );
}
