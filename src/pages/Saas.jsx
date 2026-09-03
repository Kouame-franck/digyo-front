import { Link } from "react-router-dom";
import Button from "../components/Button";
import SaasCarousel from "../components/SaasCarousel";
import IntroCarousel from "../components/IntroCarousel";
import Seo from "../components/Seo";
import { saasProducts } from "../data/saas";

const INTRO_TEXTE =
  "Digyo conçoit et développe ses propres outils numériques. " +
  "Chaque produit part d'un besoin observé sur le terrain, chez des organisations que nous " +
  "accompagnons au quotidien, et se construit pour rester simple à prendre en main, fiable " +
  "dans la durée et adapté aux réalités de ceux qui l'utilisent.";

export default function Saas() {
  return (
    <>
      <Seo
        title="Solutions SaaS — Logiciels métier prêts à l'emploi | digyo"
        description="s-school et les autres solutions SaaS de digyo : des outils métier déjà construits et éprouvés, facturés à l'usage, que vous mettez en service en quelques minutes."
        path="/saas"
      />
      <section className="border-b border-ink/10 bg-surface py-20">
        <div className="container-page max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
            Nos produits
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink md:text-5xl">
            Des solutions SaaS pour faciliter votre quotidien.
          </h1>
          <IntroCarousel
            texte={INTRO_TEXTE}
            wrapperClassName="mt-5"
            className="text-lg leading-relaxed text-ink/70"
            fadeFrom="surface"
          />
        </div>
      </section>

      <section className="py-20">
        <div className="container-page space-y-8">
          {saasProducts.map((p) => (
            <Link
              key={p.slug}
              to={`/saas/${p.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-sm shadow-ink/5 transition-shadow hover:shadow-lg hover:shadow-ink/10 md:grid-cols-2"
            >
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                      {p.category}
                    </span>
                    <h3 className="mt-1 font-display text-2xl font-bold text-ink md:text-3xl">
                      {p.name}
                    </h3>
                  </div>
                  <span className="inline-flex shrink-0 items-center rounded-full bg-ambre/15 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-ambre-dark">
                    {p.status}
                  </span>
                </div>
                <p className="mt-4 text-base leading-relaxed text-ink/70">
                  {p.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-lagune-dark">
                  Découvrir
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <SaasCarousel
                images={p.images}
                icon={p.icon}
                accent={p.accent}
                interval={3000}
                controls={false}
                className="h-64 w-full md:h-full"
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page">
          <div className="flex flex-col items-start gap-6 rounded-3xl bg-panel px-8 py-12 text-on-panel md:flex-row md:items-center md:justify-between md:px-14">
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Un besoin qui ressemble à un produit plutôt qu'à un projet ?
              </h2>
              <p className="mt-2 max-w-lg text-on-panel/70">
                Parlons-en — on a peut-être déjà commencé à le construire.
              </p>
            </div>
            <Button to="/contact" variant="accent" className="shrink-0">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
