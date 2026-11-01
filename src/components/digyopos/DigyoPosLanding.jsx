import { useState } from "react";
import Button from "../Button";
import Reveal from "../Reveal";
import TelechargementCaisse from "./TelechargementCaisse";
import DemandeDemoModal from "./DemandeDemoModal";
import { hero, problemes, phares, categories, materiel, appelFinal } from "../../data/digyoPosLanding";

// Landing page de digyo-pos (/saas/digyo-pos) : action principale « Demander une démo » (rappel
// commercial, tarifs sur devis), téléchargement libre de l'appli de caisse Windows. La FAQ reste
// celle de SaasDetail, passée en `faq`. Textes : data/digyoPosLanding.js.

function Coche({ className = "" }) {
  return (
    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-lagune/15 ${className}`}>
      <svg viewBox="0 0 20 20" className="h-3 w-3 text-lagune-dark" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Surtitre({ children }) {
  return <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">{children}</span>;
}

function Icone({ d, className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

// Capture dans un cadre d'appli (barre de titre neutre). Image absente : cadre vide plutôt qu'une icône cassée.
function Capture({ src, alt, legende, className = "" }) {
  const [erreur, setErreur] = useState(false);
  return (
    <figure className={`overflow-hidden rounded-xl bg-surface shadow-2xl shadow-ink/15 ring-1 ring-ink/10 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-ink/10 bg-ink/[0.03] px-3 py-2" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-creation/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-ambre/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-lagune/50" />
        {legende && <span className="ml-3 truncate rounded-md bg-ink/5 px-3 py-0.5 text-[10px] text-ink/40">{legende}</span>}
      </div>
      {erreur ? (
        <div className="flex aspect-[16/10] items-center justify-center text-sm text-ink/30">{alt}</div>
      ) : (
        <img src={src} alt={alt} loading="lazy" width="1440" height="900" className="block h-auto w-full" onError={() => setErreur(true)} />
      )}
    </figure>
  );
}

const ICONES_PROBLEMES = [
  "M4 6h12v10H4z M4 9h12 M8 12h4",
  "M3 8a10 10 0 0114 0 M6 11a6 6 0 018 0 M9 14h2 M3 3l14 14",
  "M4 16V9 M9 16V5 M14 16v-7 M3 16h14",
  "M6 6l8 8 M7 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z M16 13.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
];

const ICONES_MATERIEL = [
  "M3 4h14v9H3z M7 16h6 M10 13v3",
  "M4 5v10 M6.5 5v10 M9 5v10 M12 5v10 M14 5v10 M16.5 5v10",
  "M6 3h8v5H6z M4 8h12v6H4z M6 14h8v3H6z",
  "M3 7h14v8H3z M3 11h14 M9 13h2",
];

export default function DigyoPosLanding({ faq }) {
  const [demo, setDemo] = useState(null); // emplacement du bouton cliqué (statistiques)

  const boutonDemo = (classe = "", emplacement) => (
    <button
      type="button"
      onClick={() => setDemo(emplacement)}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-lagune px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-lagune/25 transition-colors hover:bg-lagune-hover ${classe}`}
    >
      Demander une démo
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-surface">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-md bg-lagune/10 blur-3xl" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-12 pb-16 pt-12 md:pt-20 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/digyo-pos/digyo-pos-symbole-moyen-couleur.svg" alt="" className="h-10 w-10 rounded-lg bg-white p-1.5 ring-1 ring-ink/10" />
              <span className="font-display text-lg font-semibold text-ink">
                digyo-pos
              </span>
              <span className="rounded-md bg-lagune/10 px-2 py-0.5 text-xs font-semibold text-lagune-dark">{hero.badge}</span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-ink md:text-5xl">{hero.titre}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">{hero.sousTitre}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {boutonDemo("w-full sm:w-auto", "landing_haut")}
              <Button href="#telecharger" variant="ghost" className="w-full sm:w-auto">
                Télécharger l'appli de caisse
              </Button>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/60">
              {hero.rassurance.map((r) => (
                <li key={r} className="flex items-center gap-2">
                  <Coche className="mt-0 h-4 w-4" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          {/* Poste complet : écran tactile (vraie capture « Vente enregistrée » avec l'aperçu du ticket),
              douchette, imprimante thermique en train d'imprimer, tiroir-caisse. Fond transparent. */}
          <img
            src="/digyo-pos/poste-caisse.webp"
            alt="Poste de caisse digyo-pos : écran tactile affichant une vente enregistrée et son ticket, lecteur de codes-barres, imprimante de tickets et tiroir-caisse"
            width="1560"
            height="1000"
            className="block h-auto w-full"
          />
        </div>
      </section>

      {/* ── Le constat ─────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <Surtitre>Le constat</Surtitre>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-4xl">{problemes.titre}</h2>
            <p className="mt-3 text-ink/70">{problemes.intro}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {problemes.items.map((p, i) => (
              <Reveal key={p.titre} delay={i * 80}>
                <div className="h-full rounded-2xl border border-ink/10 bg-surface p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-creation/15 text-creation-dark">
                    <Icone d={ICONES_PROBLEMES[i]} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{p.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center font-display text-lg font-bold text-ink md:text-xl">
            digyo-pos tient la caisse, le stock et les chiffres à jour, à chaque vente.
          </p>
        </div>
      </section>

      {/* ── Fonctionnalités phares ─────────────────────────────────────── */}
      <section className="border-y border-ink/10 bg-surface py-20">
        <div className="container-page space-y-24">
          {phares.map((f, i) => (
            <Reveal key={f.titre}>
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div className={i % 2 ? "lg:order-2" : ""}>
                  <Surtitre>{f.surtitre}</Surtitre>
                  <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-3xl">{f.titre}</h2>
                  <p className="mt-4 leading-relaxed text-ink/70">{f.texte}</p>
                  <ul className="mt-6 space-y-3">
                    {f.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-sm text-ink/75">
                        <Coche />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Capture src={f.image} alt={f.alt} className={i % 2 ? "lg:order-1" : ""} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Toutes les fonctionnalités ─────────────────────────────────── */}
      <section id="fonctionnalites" className="scroll-mt-20 py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <Surtitre>Fonctionnalités</Surtitre>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-4xl">De la réception à la vente, tout est suivi</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <div key={c.titre} className="rounded-2xl border border-ink/10 bg-surface p-5">
                <h3 className="font-display text-base font-bold text-ink">{c.titre}</h3>
                <ul className="mt-4 space-y-2.5">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-sm text-ink/70">
                      <Coche className="h-4 w-4" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Téléchargement de l'appli ──────────────────────────────────── */}
      <TelechargementCaisse />

      {/* ── Matériel ───────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <Surtitre>Matériel</Surtitre>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-4xl">Avec le matériel du commerce</h2>
            <p className="mt-3 text-ink/70">Aucun équipement propriétaire : digyo-pos fonctionne avec du matériel courant, et rien n'est obligatoire à part l'ordinateur.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {materiel.map((m, i) => (
              <div key={m.titre} className="rounded-2xl border border-ink/10 bg-surface p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lagune/15 text-lagune-dark">
                  <Icone d={ICONES_MATERIEL[i]} />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-ink">{m.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{m.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tarifs : sur devis ─────────────────────────────────────────── */}
      <section id="tarifs" className="scroll-mt-20 border-y border-ink/10 bg-surface py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Surtitre>Tarifs</Surtitre>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-4xl">Un devis à la taille de votre commerce</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-ink/70">
              Le prix dépend du nombre de boutiques, de caisses et des modules utiles à votre activité (achats, promotions, produits
              périssables, caisse hors ligne…). Nous l'établissons après la démonstration.
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-canvas p-6 md:p-8">
            <p className="text-sm font-semibold text-ink">Votre devis précise :</p>
            <ul className="mt-4 space-y-3">
              {["Le nombre de boutiques et de caisses", "Les modules retenus", "L'installation et la formation sur place", "L'abonnement et la maintenance"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-ink/75">
                  <Coche />
                  {t}
                </li>
              ))}
            </ul>
            {boutonDemo("mt-6 w-full", "tarifs")}
          </div>
        </div>
      </section>

      {/* ── FAQ (SaasDetail) ───────────────────────────────────────────── */}
      {faq}

      {/* ── Dernier appel ──────────────────────────────────────────────── */}
      <section className="pb-28 pt-16 md:pb-20">
        <div className="container-page">
          {/* Bleus de marque fixes : lagune s'éclaircit en thème sombre et rendrait le texte blanc illisible. */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#123247] to-[#0b2233] px-6 py-14 text-center text-white md:px-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-md bg-[#0FB0C4]/20 blur-3xl" aria-hidden="true" />
            <h2 className="relative font-display text-2xl font-bold md:text-4xl">{appelFinal.titre}</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/80">{appelFinal.texte}</p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setDemo("landing_bas")}
                className="w-full rounded-md bg-white px-6 py-3 text-sm font-semibold text-[#123247] transition-colors hover:bg-white/90 sm:w-auto"
              >
                Demander une démo
              </button>
              <a
                href="#telecharger"
                className="inline-flex w-full items-center justify-center rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white sm:w-auto"
              >
                Télécharger l'appli de caisse
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Barre d'action fixe (mobile) ───────────────────────────────── */}
      {/* pr-24 : laisse la place à la bulle d'assistance (SupportWidget, fixée en bas à droite). */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-surface/95 py-3 pl-3 pr-24 backdrop-blur md:hidden">
        {boutonDemo("w-full", "barre_mobile")}
      </div>

      <DemandeDemoModal open={demo !== null} emplacement={demo} onClose={() => setDemo(null)} />
    </>
  );
}
