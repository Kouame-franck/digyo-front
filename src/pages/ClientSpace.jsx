import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { apiFetch } from "../lib/api";
import Avatar from "../components/Avatar";
import QuickDiagnosticModal from "../components/QuickDiagnosticModal";
import DeepDiagnosticModal from "../components/DeepDiagnosticModal";
import DiagnosticResult from "../components/DiagnosticResult";
import DeepDiagnosticStatus from "../components/DeepDiagnosticStatus";
import { deepStatusMeta } from "../lib/diagnostic";

const projectStatusStyles = {
  submitted: "bg-ambre/15 text-ambre-dark",
  in_review: "bg-ambre/15 text-ambre-dark",
  accepted: "bg-lagune/10 text-lagune-dark",
  in_progress: "bg-lagune/10 text-lagune-dark",
  completed: "bg-ink/8 text-ink/60",
  declined: "bg-ink/8 text-ink/60",
};

const projectStatusLabels = {
  submitted: "Envoyé",
  in_review: "En cours d'étude",
  accepted: "Accepté",
  in_progress: "En cours",
  completed: "Terminé",
  declined: "Refusé",
};

function IndicatorCard({ icon, tone, value, label }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-ink/10 bg-surface p-4">
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tone}`}>{icon}</span>
      <div className="min-w-0">
        <div className="truncate font-display text-xl font-bold text-ink">{value}</div>
        <div className="truncate text-xs text-ink/55">{label}</div>
      </div>
    </div>
  );
}

export default function ClientSpace() {
  const { user, loading } = useSession();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(undefined);
  const [projects, setProjects] = useState(undefined);
  const [quickOpen, setQuickOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deepFormOpen, setDeepFormOpen] = useState(false);

  // Cette page affiche des informations personnelles : dès que la session se ferme (déconnexion
  // depuis cette page ou une autre, expiration...), on quitte immédiatement plutôt que de laisser
  // le contenu déjà chargé visible derrière un utilisateur qui n'est plus authentifié.
  useEffect(() => {
    if (!loading && !user) {
      navigate("/", { replace: true });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    apiFetch("/api/client-profile").then((data) => setProfile(data.profile)).catch(() => setProfile(null));
    apiFetch("/api/projects").then((data) => setProjects(data.projects)).catch(() => setProjects([]));
  }, []);


  if (loading || !user) return null;

  const quickValue = profile === undefined ? "…" : profile ? `${profile.quickScore}/100` : "À faire";
  const deepValue =
    profile === undefined ? "…" : profile ? deepStatusMeta[profile.deepStatus].label : "—";
  const projectsValue = projects === undefined ? "…" : projects.length;

  return (
    <div className="bg-canvas">
      <section className="py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar user={user} className="h-14 w-14 shrink-0 text-lg" />
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
                  Espace client
                </span>
                <h1 className="mt-1 font-display text-3xl font-bold text-ink md:text-4xl">
                  Bonjour{user?.name ? `, ${user.name}` : ""} 
                </h1>
                {user?.email && <p className="mt-1 text-sm text-ink/50">{user.email}</p>}
              </div>
            </div>
          </div>

          {profile ? (
            <div className="mt-8 overflow-hidden rounded-2xl border border-lagune/30 bg-gradient-to-r from-lagune/10 via-lagune/5 to-transparent p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-lagune font-display text-lg font-bold text-white">
                    {profile.quickScore}
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
                      Votre diagnostic
                    </div>
                    <h2 className="mt-1 font-display text-xl font-bold text-ink">
                      Maturité digitale : {profile.quickLevel}
                    </h2>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${deepStatusMeta[profile.deepStatus].badge}`}
                >
                  {deepStatusMeta[profile.deepStatus].label}
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-sm text-ink/70">{profile.quickSummary[0]?.text}</p>
              <button
                type="button"
                onClick={() => setDetailOpen((v) => !v)}
                className="mt-4 text-sm font-semibold text-lagune-dark hover:underline"
              >
                {detailOpen ? "Réduire ↑" : "Voir le détail complet →"}
              </button>

              {detailOpen && (
                <div className="mt-6 border-t border-lagune/20 pt-6">
                  <DiagnosticResult
                    result={{
                      score: profile.quickScore,
                      level: profile.quickLevel,
                      axes: profile.quickAxes,
                      recommendations: profile.quickSummary,
                      companyName: profile.companyName,
                      sector: profile.sector,
                      mainChallenge: profile.mainChallenge,
                    }}
                  />
                  <DeepDiagnosticStatus profile={profile} onOpen={() => setDeepFormOpen(true)} />
                </div>
              )}
            </div>
          ) : profile === null ? (
            <div className="mt-8 overflow-hidden rounded-2xl border border-lagune/30 bg-gradient-to-r from-lagune/10 via-lagune/5 to-transparent p-6 sm:p-7">
              <div className="text-xs font-bold uppercase tracking-widest text-lagune-dark">Votre diagnostic</div>
              <h2 className="mt-1 font-display text-xl font-bold text-ink">
                Découvrez votre maturité digitale en 2 minutes
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-ink/70">
                Répondez à quelques questions sur votre activité pour recevoir un premier diagnostic
                immédiat, avec des recommandations concrètes.
              </p>
              <button
                type="button"
                onClick={() => setQuickOpen(true)}
                className="mt-4 rounded-full bg-lagune px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
              >
                Lancer mon diagnostic rapide
              </button>
            </div>
          ) : null}

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <IndicatorCard
              tone="bg-lagune/10 text-lagune-dark"
              value={quickValue}
              label="Diagnostic rapide"
              icon={
                <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 3.5v3M10 13.5v3M3.5 10h3M13.5 10h3" />
                  <circle cx="10" cy="10" r="3" />
                </svg>
              }
            />
            <IndicatorCard
              tone="bg-ambre/15 text-ambre-dark"
              value={deepValue}
              label="Diagnostic approfondi"
              icon={
                <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8.5" cy="8.5" r="5.5" />
                  <path d="M16.5 16.5l-3.6-3.6" />
                </svg>
              }
            />
            <IndicatorCard
              tone="bg-lagune/10 text-lagune-dark"
              value={projectsValue}
              label="Projets soumis"
              icon={
                <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="14" height="12.5" rx="2" />
                  <path d="M3 8h14" />
                </svg>
              }
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setQuickOpen(true)}
              className="rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
            >
              {profile ? "Modifier ma fiche" : "Diagnostic rapide"}
            </button>
            <Link
              to="/contact"
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
            >
              Soumettre un projet
            </Link>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-lg font-bold text-ink">Vos projets</h2>
            {projects === undefined ? (
              <p className="mt-4 text-sm text-ink/50">Chargement…</p>
            ) : projects.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-ink/15 p-6 text-sm text-ink/50">
                Aucun projet soumis pour l'instant.
              </div>
            ) : (
              <div className="mt-4 grid gap-4">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-col gap-2 rounded-2xl border border-ink/10 bg-surface p-6 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-base font-bold text-ink">{p.title}</h3>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${projectStatusStyles[p.status]}`}
                        >
                          {projectStatusLabels[p.status]}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-ink/60">{p.pillar || "Non catégorisé"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <QuickDiagnosticModal
        open={quickOpen}
        onClose={() => setQuickOpen(false)}
        profile={profile}
        onProfileChange={setProfile}
        forceForm
      />
      <DeepDiagnosticModal
        open={deepFormOpen}
        onClose={() => setDeepFormOpen(false)}
        profile={profile}
        onSubmitted={setProfile}
      />
    </div>
  );
}
