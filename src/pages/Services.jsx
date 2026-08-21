import Button from "../components/Button";
import PillarIllustration from "../components/PillarIllustration";
import Reveal from "../components/Reveal";
import { pillars } from "../data/content";
import { ACCENTS, ACCENT_DEFAUT } from "../data/pillarAccents";

function Coche({ className }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink/10 bg-surface py-20 md:py-28">
        <div className="container-page max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
            Nos services
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink md:text-5xl">
            Avancer sous plusieurs angles vers votre transformation digitale.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">

            Une gamme variée d'outils et de leviers mis à votre disposition pour repondre le mieux a vos besions .
            Qu’il s’agisse du déploiement de nouveaux logiciels internes, d’un changement des processus métiers ou encore d’un changement d’organisation, digyo assure  et cadre la mutation de votre structure pour mieux gerer l'adaptation au sain de votre équipe.
          </p>

          {/* Navigation rapide vers chaque service : sur une page volontairement longue et
              descriptive, un visiteur qui sait déjà ce qu'il cherche doit pouvoir y sauter sans
              tout parcourir. */}
          <div className="mt-8 flex flex-wrap gap-2">
            {pillars.map((pillar) => {
              const accent = ACCENTS[pillar.slug] ?? ACCENT_DEFAUT;
              return (
                <a
                  key={pillar.slug}
                  href={`#${pillar.slug}`}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${accent.puce}`}
                >
                  {pillar.name}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {pillars.map((pillar, index) => {
        const accent = ACCENTS[pillar.slug] ?? ACCENT_DEFAUT;
        const impair = index % 2 === 1;

        return (
          <section
            key={pillar.slug}
            id={pillar.slug}
            className={`scroll-mt-20 py-20 md:py-28 ${impair ? "bg-surface" : ""}`}
          >
            <div className="container-page">
              <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
                {/* Illustration : la même identité dessinée à la main que sur l'accueil, reprise
                    en grand format — un visuel de marque cohérent plutôt qu'une photo de stock
                    qui ne dirait rien de spécifique à digyo. */}
                <Reveal className={impair ? "md:order-2" : ""}>
                  <div className={`flex h-64 items-center justify-center rounded-[2.5rem] md:h-96 ${accent.fond}`}>
                    <PillarIllustration
                      slug={pillar.slug}
                      className={`h-32 w-44 md:h-44 md:w-60 ${accent.trait} ${accent.rotation.replace("group-hover:rotate-0", "")}`}
                    />
                  </div>
                </Reveal>

                <Reveal delay={100} className={impair ? "md:order-1" : ""}>
                  <span className={`font-display text-sm font-bold ${accent.trait}`}>
                    0{index + 1} — {pillar.name}
                  </span>
                  <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
                    {pillar.headline}
                  </h2>

                  <div className="mt-5 space-y-4 text-ink/70">
                    {pillar.paragraphs.map((paragraphe) => (
                      <p key={paragraphe} className="leading-relaxed">
                        {paragraphe}
                      </p>
                    ))}
                  </div>

                  <p className="mt-6 text-xs font-bold uppercase tracking-widest text-ink/40">
                    Pour qui
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{pillar.audience}</p>

                  <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {pillar.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm">
                        <Coche className={`mt-0.5 h-4 w-4 shrink-0 ${accent.trait}`} />
                        <span className="text-ink/75">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button to="/contact" variant="accent">
                      Discuter de mon projet
                    </Button>
                    {/* Ce lien n'a de sens que pour le pilier SaaS : "matériel" n'a pas non
                        plus de `packages`, mais renvoyer vers /saas y serait hors sujet. */}
                    {pillar.slug === "saas" && (
                      <Button to="/saas" variant="ghost">
                        Voir le catalogue SaaS
                      </Button>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA de fin */}
      <section className="pb-24">
        <div className="container-page">
          <div className="flex flex-col items-start gap-6 rounded-3xl bg-panel px-8 py-12 text-on-panel md:flex-row md:items-center md:justify-between md:px-14">
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Un besoin qui ne rentre dans aucune case ?
              </h2>
              <p className="mt-2 max-w-lg text-on-panel/70">
                Décrivez-nous votre projet, on vous propose une formule sur-mesure — quitte à
                combiner plusieurs services si c'est ce qu'il vous faut.
              </p>
            </div>
            <Button to="/contact" variant="accent" className="shrink-0">
              Discuter de mon projet
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
