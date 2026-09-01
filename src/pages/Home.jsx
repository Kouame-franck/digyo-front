import Button from "../components/Button";
import PillarCard from "../components/PillarCard";
import Reveal from "../components/Reveal";
import HeroIllustration from "../components/HeroIllustration";
import ValeurIcon from "../components/ValeurIcon";
import { pillars, values, process, partners, reperesTransformation } from "../data/content";
import ReperesCarousel from "../components/ReperesCarousel";
import { useDiagnosticModal } from "../context/DiagnosticModalContext";

export default function Home() {
  const { openDiagnosticModal } = useDiagnosticModal();

  return (
    <>
      {/* Hero */}
      {/* -mt-16 + pt-40/48 (au lieu de py-24/32) : la photo remonte sous le header, qui est
          transparent tant qu'on n'a pas scrollé sur cette page (voir Header.jsx) -- le contenu,
          lui, garde le même espacement visuel qu'avant grâce au padding-top compensé. */}
      <section className="relative -mt-16 overflow-hidden border-b border-ink/10 pb-24 pt-40 md:pb-32 md:pt-48">
        <img
          src="/home/hero-tech.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-panel/90 via-panel/75 to-panel/45" />
        <div className="container-page relative grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-on-panel md:mt-0 md:text-5xl">
              Le monde est passé au digital. Et vous ?
            </h1>
            <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-full bg-lagune-panel" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-panel/80">
              digyo accompagne PME, institutions et indépendants dans leur
              transformation digitale : conseil, création de sites &amp;
              applications, formation des équipes.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button type="button" variant="accent" onClick={openDiagnosticModal}>
                Diagnostiquer mon activité
              </Button>
              <Button to="/services" variant="ghostLight">
                Voir nos offres
              </Button>
            </div>
          </div>
          <HeroIllustration />
        </div>
      </section>

      {/* Pillars */}
      <section className="py-8">
        <div className="container-page">
          {/* Titre et visuel côte à côte. Le paragraphe reste en pleine largeur en dessous :
              placé dans la colonne de gauche, sa longueur aurait écrasé l'image. */}
          <div className="grid items-center gap-6 md:grid-cols-[1.5fr_1fr] md:gap-10">
            <Reveal className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
                Ce que nous faisons
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
                Mettre à votre disposition des outils et méthodes adaptés à
                votre environnement pour augmenter votre productivité.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <img
                src="/tech2.png"
                alt=""
                width="612"
                height="408"
                loading="lazy"
                decoding="async"
                draggable="false"
                className="mx-auto block w-full max-w-[220px] md:max-w-xs"
              />
            </Reveal>
          </div>
          <Reveal className="mt-6 max-w-3xl md:mt-8">
            <p className="text-sm leading-relaxed text-ink/70 md:text-base">
              La transformation digitale intègre les technologies numériques dans toutes les
              activités d'une entreprise : des outils aux méthodes de travail, elle change la
              façon dont une organisation fonctionne pour suivre son marché.
            </p>
          </Reveal>

          {/* Repères de lecture. Volontairement sans cartes ni bordures : les cartes juste en
              dessous portent l'offre, ce bloc-ci n'est qu'un rappel de vocabulaire et ne doit
              pas leur disputer l'attention. Voir ReperesCarousel pour le pourquoi du carrousel
              mobile (9 définitions empilées faisaient un très long défilement) et ses indices
              visuels de défilement (fondu de bord, puces cliquables). */}
          <ReperesCarousel groupes={reperesTransformation} />

          {/* 5 piliers : 3 colonnes se répartissent en 3+2 plutôt que 4+1, qui laissait une
              carte esseulée en bout de grille. */}
          <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.slug} delay={i * 100}>
                <PillarCard pillar={pillar} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="bg-panel py-24 text-on-panel">
        <div className="container-page grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-lagune-panel">
              Pourquoi digyo
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Au-delà de fournir juste un rapport, nous allons jusqu'à la mise en œuvre.
            </h2>
            <p className="mt-5 text-on-panel/70 leading-relaxed">
              La recommandation n'est que le commencement.
              Chez digyo, l'équipe pose le diagnostic, construit l'outil,
              forme vos équipes à s'en servir et assure, pour nos propres produits SaaS,
              une assistance 7j/7. Une chaîne continue, du premier
              atelier jusqu'au logiciel qui tourne en production.
            </p>
            <Button to="/a-propos" variant="ghostLight" className="mt-8">
              Notre histoire
            </Button>
          </Reveal>
          <div className="grid gap-4">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 100}
                className="rounded-2xl border border-on-panel/15 bg-on-panel/5 p-6"
              >
                <ValeurIcon nom={v.icone} className="h-10 w-10 text-lagune-panel md:h-12 md:w-12" />
                <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-panel/65">
                  {v.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="border-t border-ink/10 py-20">
        <div className="container-page">
          <Reveal className="max-w-2xl text-center md:mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
              Ils nous font confiance
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
              Nos partenaires
            </h2>
          </Reveal>
          <div className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-6 hover:[animation-play-state:paused]">
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={`${partner.name}-${i}`}
                  className="flex h-24 w-40 shrink-0 items-center justify-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/10"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    title={partner.name}
                    className="max-h-14 w-auto max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
              Notre méthode
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
              Une approche en quatre étapes, du cadrage au suivi.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 100} className="relative">
                <span className="font-display text-4xl font-bold text-lagune/15">
                  {p.step}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {p.description}
                </p>
                {i < process.length - 1 && (
                  <span className="absolute right-[-1rem] top-3 hidden h-px w-8 bg-ink/15 md:block" />
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="pb-24">
        <div className="container-page">
          <Reveal className="flex flex-col items-start gap-6 rounded-3xl bg-lagune px-8 py-12 text-white md:flex-row md:items-center md:justify-between md:px-14">
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Prêt à structurer votre transformation digitale ?
              </h2>
              <p className="mt-2 max-w-lg text-white/85">
                Parlons de votre projet — premier échange sans engagement.
              </p>
            </div>
            <Button
              to="/contact"
              variant="primary"
              className="!bg-surface !text-lagune-dark hover:!bg-canvas shrink-0"
            >
              Prendre contact
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
