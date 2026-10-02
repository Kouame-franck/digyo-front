import { useState } from "react";
import Button from "../Button";
import Reveal from "../Reveal";
import SaasDeviceShowcase from "../SaasDeviceShowcase";
import {
  hero,
  problemes,
  profils,
  phares,
  categories,
  securite,
  appelFinal,
} from "../../data/sschoolLanding";

// Landing page de s-school (/saas/s-school) : une seule action principale, « Tester gratuitement »
// (compte de démonstration), et aucune sortie vers le reste du site avant la fin de la page.
// Les tarifs et la FAQ restent ceux de SaasDetail (offres en direct de la console), passés ici
// en `tarifs` et `faq` pour ne pas dupliquer leur logique. Textes : data/sschoolLanding.js.

function Coche({ className = "" }) {
  return (
    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lagune/15 ${className}`}>
      <svg viewBox="0 0 20 20" className="h-3 w-3 text-lagune-dark" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Surtitre({ children }) {
  return <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">{children}</span>;
}

// Capture d'écran dans un cadre de navigateur. Si l'image manque, un cadre neutre plutôt qu'une
// icône d'image cassée.
function Capture({ src, alt, className = "" }) {
  const [erreur, setErreur] = useState(false);
  return (
    <div className={`overflow-hidden rounded-xl bg-surface shadow-2xl shadow-ink/15 ring-1 ring-ink/10 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-ink/10 bg-ink/[0.03] px-3 py-2" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-creation/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-ambre/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-lagune/50" />
        <span className="ml-3 truncate rounded-md bg-ink/5 px-3 py-0.5 text-[10px] text-ink/40">sschool.digyo.pro</span>
      </div>
      {erreur ? (
        <div className="flex aspect-[16/10] items-center justify-center text-sm text-ink/30">{alt}</div>
      ) : (
        <img src={src} alt={alt} loading="lazy" className="block w-full" onError={() => setErreur(true)} />
      )}
    </div>
  );
}

const ICONES_PROBLEMES = [
  "M5 4h10v13H5z M8 8h4 M8 11h4 M8 14h2",
  "M10 3v14 M14 6.5c0-1.4-1.8-2.5-4-2.5s-4 1.1-4 2.5S7.8 9 10 9.5s4 1.1 4 2.5-1.8 2.5-4 2.5-4-1.1-4-2.5",
  "M4 16V9 M9 16V5 M14 16v-7 M3 16h14",
  "M6 3h3l1.5 4-2 1.2a8 8 0 003.3 3.3l1.2-2 4 1.5v3a1.5 1.5 0 01-1.5 1.5C9 15.5 4.5 11 4.5 4.5A1.5 1.5 0 016 3z",
];

const ICONES_SECURITE = [
  "M4 9h12v8H4z M7 9V6.5a3 3 0 016 0V9",
  "M10 4.5a2.2 2.2 0 100 4.4 2.2 2.2 0 000-4.4z M4.5 16c0-2.8 2.5-4.6 5.5-4.6s5.5 1.8 5.5 4.6",
  "M3 6a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V6z M3 9h14",
  "M10 3v9 M6.5 8.5L10 12l3.5-3.5 M4 15h12",
];

function Icone({ d, className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function SSchoolLanding({ product, onDemo, tarifs, faq }) {
  const [profilActif, setProfilActif] = useState(profils[0].id);
  const [categorieOuverte, setCategorieOuverte] = useState(null);
  const profil = profils.find((p) => p.id === profilActif) ?? profils[0];

  const boutonDemo = (classe = "") => (
    <button
      type="button"
      onClick={onDemo}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-lagune/25 transition-colors hover:bg-lagune-dark ${classe}`}
    >
      Tester gratuitement
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-surface">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-lagune/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-page relative pb-16 pt-12 md:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            {/* Accroche manuscrite, un peu de travers et soulignée au feutre, comme notée à la main. */}
            <p className="relative inline-block -rotate-2 px-2 font-hand text-3xl font-bold leading-tight text-lagune-dark md:text-4xl">
              {hero.badge}
              <svg
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-ambre"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M3 8c40-5 85-6 130-3s95 3 164-4" />
              </svg>
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-ink md:text-6xl">
              {hero.titre}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink/70">{hero.sousTitre}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {boutonDemo("w-full sm:w-auto")}
              <Button href="#tarifs" variant="ghost" className="w-full sm:w-auto">
                Voir les tarifs
              </Button>
            </div>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink/60">
              {hero.rassurance.map((r) => (
                <li key={r} className="flex items-center gap-2">
                  <Coche className="mt-0 h-4 w-4" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <SaasDeviceShowcase
            images={product.images}
            mobileImages={product.mobileImages}
            icon={product.icon}
            accent={product.accent}
            className="mx-auto mt-14 w-full max-w-5xl"
          />
        </div>
      </section>

      {/* ── Problèmes ──────────────────────────────────────────────────── */}
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
            s‑school réunit tout cela dans un seul outil, partagé par toute l'école.
          </p>
        </div>
      </section>

      {/* ── Un espace par profil ───────────────────────────────────────── */}
      <section className="border-y border-ink/10 bg-surface py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <Surtitre>Pour toute l'équipe</Surtitre>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-4xl">
              Un outil, un espace pour chacun
            </h2>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-1" role="tablist">
            {profils.map((p) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={p.id === profilActif}
                onClick={() => setProfilActif(p.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  p.id === profilActif ? "bg-lagune text-white" : "bg-ink/5 text-ink/60 hover:bg-ink/10 hover:text-ink"
                }`}
              >
                {p.onglet}
              </button>
            ))}
          </div>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]" role="tabpanel">
            <div>
              <h3 className="font-display text-xl font-bold text-ink md:text-2xl">{profil.titre}</h3>
              <ul className="mt-6 space-y-4">
                {profil.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-ink/75">
                    <Coche />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Capture key={profil.id} src={profil.image} alt={`s-school — espace ${profil.onglet}`} />
          </div>
        </div>
      </section>

      {/* ── Fonctionnalités phares ─────────────────────────────────────── */}
      <section className="py-20">
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
                <Capture src={f.image} alt={f.titre} className={i % 2 ? "lg:order-1" : ""} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Toutes les fonctionnalités ─────────────────────────────────── */}
      <section id="fonctionnalites" className="scroll-mt-20 border-y border-ink/10 bg-surface py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <Surtitre>Fonctionnalités</Surtitre>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-4xl">Tout ce qu'il faut, sans module à assembler</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => {
              // Sur mobile, chaque catégorie se replie pour éviter un mur de listes ; dépliées d'office à partir de md.
              const ouverte = categorieOuverte === i;
              return (
                <div key={c.titre} className="rounded-2xl border border-ink/10 p-5">
                  <button
                    type="button"
                    onClick={() => setCategorieOuverte(ouverte ? null : i)}
                    className="flex w-full items-center justify-between gap-3 text-left md:pointer-events-none"
                    aria-expanded={ouverte}
                  >
                    <h3 className="font-display text-base font-bold text-ink">
                      {c.titre} <span className="ml-1 text-sm font-semibold text-ink/40">{c.items.length}</span>
                    </h3>
                    <svg viewBox="0 0 20 20" className={`h-4 w-4 text-ink/40 transition-transform md:hidden ${ouverte ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <ul className={`mt-4 space-y-2.5 ${ouverte ? "" : "hidden md:block"}`}>
                    {c.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm text-ink/70">
                        <Coche className="h-4 w-4" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mise en route ──────────────────────────────────────────────── */}
      {product.howItWorks?.length > 0 && (
        <section className="py-20">
          <div className="container-page">
            <Surtitre>Mise en route</Surtitre>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-4xl">Opérationnel en 1 à 3 semaines</h2>
            <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {product.howItWorks.map((step, i) => (
                <li key={step.title} className="relative rounded-2xl border border-ink/10 bg-surface p-6">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lagune font-display text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── Tarifs (logique dans SaasDetail) ───────────────────────────── */}
      <div className="border-t border-ink/10 bg-surface">{tarifs}</div>

      {/* ── Sécurité ───────────────────────────────────────────────────── */}
      <section className="bg-panel py-20 text-on-panel">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-lagune-panel-dark">Sécurité</span>
            <h2 className="mt-3 font-display text-2xl font-bold md:text-4xl">Vos données entre de bonnes mains</h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {securite.map((s, i) => (
              <div key={s.titre}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-on-panel/10">
                  <Icone d={ICONES_SECURITE[i]} />
                </span>
                <h3 className="mt-4 font-display text-base font-bold">{s.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-70">{s.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (SaasDetail) ───────────────────────────────────────────── */}
      {faq}

      {/* ── Dernier appel ──────────────────────────────────────────────── */}
      <section className="pb-28 pt-4 md:pb-20">
        <div className="container-page">
          {/* Bleus de marque fixes : lagune s'éclaircit en thème sombre et rendrait le texte blanc illisible. */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0C4A6E] to-[#093853] px-6 py-14 text-center text-white md:px-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
            <h2 className="relative font-display text-2xl font-bold md:text-4xl">{appelFinal.titre}</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/80">{appelFinal.texte}</p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onDemo}
                className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0C4A6E] transition-colors hover:bg-white/90 sm:w-auto"
              >
                Tester gratuitement
              </button>
              <Button to="/contact" variant="ghostLight" className="w-full border-white/40 text-white hover:border-white sm:w-auto">
                Demander une démonstration
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Barre d'action fixe (mobile) ───────────────────────────────── */}
      {/* pr-24 : laisse la place à la bulle d'assistance (SupportWidget, fixée en bas à droite). */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-surface/95 py-3 pl-3 pr-24 backdrop-blur md:hidden">
        {boutonDemo("w-full")}
      </div>
    </>
  );
}
