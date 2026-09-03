import Button from "../components/Button";
import ValeurIcon from "../components/ValeurIcon";
import Seo from "../components/Seo";
import { principes, process, values } from "../data/content";

export default function About() {
  return (
    <>
      <Seo
        title="À propos — digyo, agence de transformation digitale à Abidjan"
        description="digyo est une agence de transformation digitale basée à Abidjan, en Côte d'Ivoire. Découvrez notre mission, notre méthode en quatre étapes et les principes qui guident chaque projet."
        path="/a-propos"
      />

      {/* Hero */}
      {/* -mt-16 + pt-40/48 (au lieu de py-24/32) : la photo remonte sous le header, transparent
          tant qu'on n'a pas scrollé sur cette page (voir Header.jsx) -- le padding-top compensé
          garde le même espacement visuel pour le contenu. */}
      <section className="relative -mt-16 overflow-hidden border-b border-ink/10 pb-24 pt-40 md:pb-32 md:pt-48">
        <img
          src="/about/hero-equipe.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-panel/95 via-panel/80 to-panel/50" />
        <div className="container-page relative max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-lagune-panel">
            Qui sommes-nous?
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-on-panel md:text-5xl">
            Une agence de professionnels passionnés au service des métiers du numérique.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-on-panel/80">
            Chez digyo, une équipe passionnée vous accompagne à chaque étape de votre
            transformation digitale&nbsp;: stratégie produit, construction et méthodes éprouvées
            sur le terrain. Ensemble, nous identifions, construisons et faisons évoluer des
            produits sur mesure, taillés pour vos ambitions.
          </p>
        </div>
      </section>

      {/* Contexte */}
      <section className="border-t border-ink/10 bg-surface py-20">
        <div className="container-page max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
            Contexte
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
            Le numérique n'est plus une option, c'est un mode de vie.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/70">
            <p>
              Le numérique a profondément changé la façon dont on vit, dont on achète, dont on
              décide. Il façonne désormais les habitudes des consommateurs et la relation entre
              une entreprise et ses clients&nbsp;: être absent en ligne, ou y être mal préparé,
              revient à se couper d'une part croissante de son marché. En Côte d'Ivoire comme
              ailleurs, la stratégie digitale n'est plus réservée aux grandes structures — elle
              est devenue une condition pour se développer et durer.
            </p>
            <p>
              digyo accompagne cette transformation à chaque étape, de la conception à la mise
              en œuvre, pour que votre présence en ligne ne soit pas une vitrine de plus, mais un
              véritable levier au service de vos objectifs business.
            </p>
          </div>
        </div>
      </section>

      {/* Notre mission */}
      <section className="py-20">
        <div className="container-page max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
            Notre mission
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
            Aligner votre fonctionnement aux changements constants de la société moderne
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/70">
            <p>
              Le rythme du changement ne ralentit pas&nbsp;: nouveaux usages, nouveaux outils,
              nouvelles attentes côté clients. Notre mission n'est pas d'aider les entreprises à
              courir après ce mouvement, mais à s'y ajuster durablement — comprendre où va votre
              marché, structurer votre présence numérique en conséquence, et donner à vos équipes
              les moyens d'avancer seules, sans dépendre de nous indéfiniment.
            </p>
            <p>
              Nous ne vendons pas le digital comme une fin en soi. Une stratégie, un outil, une
              formation n'ont de valeur que s'ils tiennent dans la durée et continuent de
              s'adapter à mesure que votre activité et votre marché évoluent.
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi digyo */}
      <section className="border-t border-ink/10 bg-surface py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
              Pourquoi digyo
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
              Trois principes, non négociables.
            </h2>
          </div>
          <div className="mt-12 grid gap-10 divide-y divide-ink/10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-y-0">
            {principes.map((p) => (
              <div key={p.title} className="pt-8 first:pt-0 md:px-8 md:pt-0 md:first:pl-0 md:last:pr-0">
                <ValeurIcon nom={p.icone} className="h-10 w-10 text-lagune-dark" />
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-ink/10 pt-12">
            <h3 className="font-display text-lg font-bold text-ink">
              Ce qui nous distingue sur le terrain.
            </h3>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
              {values.map((v) => (
                <div key={v.title}>
                  <ValeurIcon nom={v.icone} className="h-9 w-9 text-lagune-dark" />
                  <h4 className="mt-3 font-display text-base font-bold text-ink">{v.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{v.description}</p>
                </div>
              ))}
            </div>
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
            Une méthode en quatre étapes, du cadrage au suivi.
          </h2>
          <div className="mt-12">
            {process.map((p, i) => (
              <div key={p.step} className="relative flex gap-6 pb-10 last:pb-0">
                {i < process.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-5 top-10 h-full w-px -translate-x-1/2 bg-ink/15"
                  />
                )}
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-lagune-dark/30 bg-canvas font-display text-sm font-bold text-lagune-dark">
                  {p.step}
                </span>
                <div className="pt-1">
                  <ValeurIcon nom={p.icone} className="h-8 w-8 text-lagune-dark" />
                  <h3 className="mt-3 font-display text-lg font-bold text-ink">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">{p.description}</p>
                </div>
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
