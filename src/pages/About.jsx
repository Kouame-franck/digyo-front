import Button from "../components/Button";
import { principes } from "../data/content";

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink/10 bg-surface py-20">
        <div className="container-page max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
            Qui sommes-nous?
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink md:text-5xl">
            Une agence de professionels passionés aux services des metiers du numerique.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            digyo est née d'un constat simple, observé en Côte d'Ivoire comme ailleurs&nbsp;: la
            transformation digitale ne manque pas d'ambition, elle manque d'accompagnement
            concret, accessible et adapté aux réalités du terrain. Nous existons pour combler
            cet écart — pas avec des présentations, mais avec des outils qui tournent réellement.
          </p>
        </div>
      </section>

      {/* Notre mission */}
      <section className="py-20">
        <div className="container-page max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
            Notre mission
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
            Aligner votre fonctionnement aux changements constant de la société moderne
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/70">
            <p>
              Trop de projets digitaux s'arrêtent à l'apparence&nbsp;: un site qui plaît en
              démonstration mais que personne ne met à jour, un plan stratégique qui reste dans
              un tiroir, une formation suivie une fois et jamais réappliquée. Nous ne mesurons
              pas notre travail à ce qu'il donne en réunion, mais à ce qu'il devient six mois
              plus tard.
            </p>
            <p>
              Concrètement, cela veut dire choisir la solution la plus simple qui résout
              vraiment le problème, documenter ce que nous construisons pour que vous n'en
              dépendiez jamais entièrement, et rester joignables après la facture — pas
              seulement avant.
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi digyo */}
      <section className="border-t border-ink/10 bg-surface py-20">
        <div className="container-page grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
              Notre nom
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink">
              Pourquoi « digyo » ?
            </h2>
            <p className="mt-5 leading-relaxed text-ink/70">
              Un nom court, construit pour être facile à dire, à écrire et à retenir — en
              français comme à l'international. Notre cyan signature, lui, n'est pas choisi au
              hasard&nbsp;: il est ancré dans la lagune Ébrié qui borde Abidjan, où l'agence a vu
              le jour, associé à un bleu profond qui inspire la confiance et à des touches
              d'ambre qui rappellent la chaleur de l'accueil local.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl bg-panel p-12">
            <svg viewBox="0 0 100 100" className="mx-auto h-40 w-40">
              <path
                d="M52,14 A36,36 0 1 1 18,58"
                fill="none"
                stroke="#F4F9FA"
                strokeWidth="11"
                strokeLinecap="round"
              />
              <circle cx="52" cy="14" r="10" fill="#0EAFC2" />
            </svg>
          </div>
        </div>
      </section>

      {/* Notre façon de faire */}
      <section className="py-20">
        <div className="container-page max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
            Notre façon de faire
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
            Construire d'abord, présenter ensuite.
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-ink/70">
            <p>
              Nous ne vendons pas de jargon. Si un mot compliqué peut se dire simplement, on le
              dit simplement — à vous comme entre nous. Un projet mal compris par celui qui le
              finance est un projet qui finit par échouer, quelle que soit la qualité de
              l'exécution.
            </p>
            <p>
              Nous préférons construire une version qui fonctionne plutôt que présenter une
              maquette qui impressionne. s-school, notre propre plateforme de gestion scolaire,
              est née de cette conviction&nbsp;: nous l'utilisons et l'améliorons en continu,
              pour un établissement réel — pas comme vitrine, comme outil de travail.
            </p>
            <p>
              Et parce qu'un outil livré n'est utile que s'il est repris, nous ne considérons
              jamais une mission terminée à la remise du livrable. Le vrai test commence après,
              quand vos équipes s'en servent sans nous.
            </p>
          </div>
        </div>
      </section>

      {/* Ce qui compte pour nous */}
      <section className="border-t border-ink/10 bg-surface py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
              Ce qui compte pour nous
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink">
              Trois principes, non négociables.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {principes.map((p, i) => (
              <div key={p.title} className="rounded-2xl border border-ink/10 bg-canvas p-7">
                <span className="font-display text-sm font-bold text-lagune-dark">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container-page">
          <div className="flex flex-col items-start gap-6 rounded-3xl bg-lagune px-8 py-12 text-white md:flex-row md:items-center md:justify-between md:px-14">
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Envie d'en discuter ?
              </h2>
              <p className="mt-2 max-w-lg text-white/85">
                On échange sur votre projet, sans engagement de votre part.
              </p>
            </div>
            <Button
              to="/contact"
              variant="primary"
              className="!bg-surface !text-lagune-dark hover:!bg-canvas shrink-0"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
