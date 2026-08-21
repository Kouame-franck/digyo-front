import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Button from "../components/Button";
import SaasCarousel from "../components/SaasCarousel";
import SaasDeviceShowcase from "../components/SaasDeviceShowcase";
import IntroCarousel from "../components/IntroCarousel";
import SubscribeModal from "../components/SubscribeModal";
import DemoAccessModal from "../components/DemoAccessModal";
import { getSaasBySlug, saasProducts } from "../data/saas";
import { ACCENTS } from "../data/pillarAccents";
import { apiFetch } from "../lib/api";

// Rotation des mêmes couleurs de marque que les puces de catégorie de la page Services, pour que
// les indicateurs de fonctionnalités d'une fiche produit se lisent avec le même langage visuel.
// Troisième couleur en `ink` plutôt que `ACCENTS.formation.puce` (basé sur `panel`) : `panel`
// devient quasi noir en dark mode et ces badges reposent sur le fond de page, pas sur un bloc
// panel — le texte y devenait illisible. `ink` s'inverse déjà correctement selon le thème.
const CYCLE_PUCES = [
  ACCENTS.transformation.puce,
  ACCENTS.creation.puce,
  "bg-ink/8 text-ink ring-1 ring-inset ring-ink/20 hover:bg-ink hover:text-canvas hover:ring-ink",
];

function formatFCFA(montant) {
  return `${Number(montant).toLocaleString("fr-FR")} FCFA`;
}

// La console expose une offre par couple (formule, cycle) : "starter" et "starter-annuel" sont
// deux lignes distinctes. s-school les regroupe par `name` pour n'afficher qu'une carte par
// formule (voir Abonnement.jsx) — on fait pareil ici, sinon le visiteur verrait six cartes
// dont trois doublons, puis trois seulement une fois connecté.
function offresToPlans(offres, catalogue) {
  const parNom = new Map();
  offres
    .filter((o) => o.active)
    .forEach((o) => {
      if (!parNom.has(o.name)) parNom.set(o.name, { name: o.name });
      parNom.get(o.name)[o.cycle] = o;
    });

  return [...parNom.values()]
    .map((formule) => {
      // Prix mis en avant : l'annuel (le plus avantageux), le mensuel servant d'alternative —
      // même règle que la carte s-school, le choix réel de période se fait dans le tunnel.
      const principale = formule.annuel || formule.mensuel;
      if (!principale) return null;

      return {
        id: formule.name,
        name: formule.name,
        description: principale.description,
        price: formatFCFA(principale.price),
        period: principale.cycle === "annuel" ? "par an" : "par mois",
        priceHint:
          formule.mensuel && principale.id !== formule.mensuel.id
            ? `ou dès ${formatFCFA(formule.mensuel.price)} / mois`
            : null,
        featured: formule.name === "Premium",
        features: principale.features?.length
          ? principale.features
          : ["Toutes les fonctionnalités s-school"],
        limits: (catalogue.limites ?? []).map((l) => ({
          ...l,
          value: principale[l.id] ?? "Illimité",
        })),
        modules: (catalogue.modules ?? []).map((m) => ({
          ...m,
          inclus: (principale.modules ?? []).includes(m.id),
        })),
        mensuel: formule.mensuel ?? null,
        annuel: formule.annuel ?? null,
      };
    })
    .filter(Boolean);
}

// Hiérarchie visuelle des paliers, calquée sur les cartes de s-school (Configuration > Mon école
// > Mon abonnement) mais avec la palette digyo : neutre, couleur d'accent, puis or pour le haut
// de gamme. Le visiteur doit reconnaître la même grille une fois connecté.
const STYLES_PALIER = {
  Starter: { degrade: "from-panel to-panel/80", icone: "eclair" },
  Standard: { degrade: "from-lagune to-lagune-dark", icone: "etoile" },
  Premium: { degrade: "from-ambre to-ambre-dark", icone: "couronne" },
};
const PALIER_DEFAUT = { degrade: "from-lagune to-lagune-dark", icone: "etoile" };

const TRACES_ICONES = {
  eclair: "M11 2L4 12h5l-1 8 7-10h-5l1-8z",
  etoile: "M10 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L10 14.4 5.2 16.9l.9-5.4L2.2 7.7l5.4-.8L10 2z",
  couronne: "M3 7l3.5 3L10 4l3.5 6L17 7l-1.5 8h-11L3 7z",
};

// Icône par type de limite : une limite se lit alors comme les autres avantages de la formule,
// avec le même repère visuel à gauche, au lieu d'une simple ligne de texte.
const TRACES_LIMITES = {
  studentLimit: "M10 3.5L2.5 7l7.5 3.5L17.5 7 10 3.5z M5 9v3.5c0 1.2 2.2 2 5 2s5-.8 5-2V9",
  cursusLimit: "M10 3l7 3.5-7 3.5-7-3.5L10 3z M3 10.5l7 3.5 7-3.5",
  teacherLimit: "M10 4.5a2.2 2.2 0 100 4.4 2.2 2.2 0 000-4.4z M4.5 16c0-2.8 2.5-4.6 5.5-4.6s5.5 1.8 5.5 4.6",
  staffLimit: "M4 7.5h12v8.5H4z M7.5 7.5V5.5h5v2",
  roleLimit: "M10 3l6 2v4.6c0 3.3-2.5 5.9-6 6.6-3.5-.7-6-3.3-6-6.6V5l6-2z",
};
// Repli si la console ajoute un jour une limite que ce front ne connaît pas encore : un point
// neutre plutôt qu'une pastille vide.
const TRACE_LIMITE_DEFAUT = "M10 7a3 3 0 100 6 3 3 0 000-6z";

function IconeLimite({ id, className }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={TRACES_LIMITES[id] ?? TRACE_LIMITE_DEFAUT} />
    </svg>
  );
}

// Icône par fonctionnalité principale (bloc "Ce que fait {produit}") — même langage graphique
// (traits, viewBox 20x20) que les icônes de limites et de palier ci-dessus.
const TRACES_FEATURES = {
  dossier: "M3 6a1 1 0 011-1h4l1.5 2H16a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1V6z",
  bulletin: "M6 3h8l3 3v11a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z M8 9h4 M8 12h4 M8 15h2",
  planning: "M4 4h12v13H4z M4 8h12 M7 3v3 M13 3v3",
  message: "M4 5h12a1 1 0 011 1v7a1 1 0 01-1 1H9l-3 3v-3H4a1 1 0 01-1-1V6a1 1 0 011-1z",
  facture: "M6 3h8v14l-2-1.2L10 17l-2-1.2L6 17V3z M8 6h4 M8 9h4",
  dashboard: "M4 16V9 M9 16V5 M14 16v-7 M3 16h14",
  suivi: "M3 14l4-4 3 3 6-7 M3 16h14",
  sms: "M4 5h12a1 1 0 011 1v6a1 1 0 01-1 1H9l-3 3v-3H4a1 1 0 01-1-1V6a1 1 0 011-1z M7 9h.01 M10 9h.01 M13 9h.01",
  carte: "M3 6a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V6z M3 9h16 M6 13h3",
};
const TRACE_FEATURE_DEFAUT = "M10 7a3 3 0 100 6 3 3 0 000-6z";

function IconeFeature({ id, className }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={TRACES_FEATURES[id] ?? TRACE_FEATURE_DEFAUT} />
    </svg>
  );
}

function IconePalier({ nom, className }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden="true">
      <path d={TRACES_ICONES[nom] ?? TRACES_ICONES.etoile} />
    </svg>
  );
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-ink/10 py-5">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base font-bold text-ink">{item.question}</span>
        <svg
          viewBox="0 0 20 20"
          className={`h-4 w-4 shrink-0 text-ink/50 transition-transform ${open ? "rotate-45" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M10 4v12M4 10h12" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">{item.answer}</p>
      )}
    </div>
  );
}

export default function SaasDetail() {
  const { slug } = useParams();
  const product = getSaasBySlug(slug);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [livePlans, setLivePlans] = useState(null);
  const [offresEnErreur, setOffresEnErreur] = useState(false);

  useEffect(() => {
    if (!product?.liveOffers) return;
    let cancelled = false;
    setOffresEnErreur(false);

    // Offres et libellés viennent tous deux de la console : rien n'est recopié côté digyo, donc
    // un module ajouté dans la console apparaît ici sans redéploiement du site.
    // Les offres sont indispensables ; le catalogue de libellés est un enrichissement — s'il
    // manque, on affiche quand même les formules et leurs prix, sans le détail modules/limites.
    Promise.all([
      apiFetch("/api/sschool-signup/offres"),
      apiFetch("/api/sschool-signup/catalogue").catch((err) => {
        console.warn("Catalogue des modules indisponible :", err.message);
        return {};
      }),
    ])
      .then(([offres, catalogue]) => {
        if (cancelled) return;
        if (!Array.isArray(offres) || offres.length === 0) {
          setOffresEnErreur(true);
          return;
        }
        setLivePlans(offresToPlans(offres, catalogue ?? {}));
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Erreur chargement des offres s-school :", err);
        setOffresEnErreur(true);
      });

    return () => {
      cancelled = true;
    };
  }, [product?.liveOffers]);

  if (!product) {
    return <Navigate to="/saas" replace />;
  }

  const otherProducts = saasProducts.filter((p) => p.slug !== product.slug);
  // Sélection courte dans le hero, liste complète plus bas — voir data/saas.js pour le pourquoi.
  const heroHighlights = product.heroHighlights?.length ? product.heroHighlights : product.highlights ?? [];
  const plans = product.liveOffers ? livePlans : product.plans;
  const hasPlans = Boolean(plans?.length);
  // La section tarifs reste visible pendant le chargement et en cas de panne : mieux vaut
  // annoncer l'indisponibilité que masquer les tarifs sans explication.
  const afficherTarifs = hasPlans || Boolean(product.liveOffers);

  function openSubscribe(planId) {
    setSelectedPlanId(planId);
    setSubscribeOpen(true);
  }

  return (
    <>
      <section className="border-b border-ink/10 bg-surface">
        <div className="container-page py-8">
          <Link
            to="/saas"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 transition-colors hover:text-ink"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M13 4l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Tous les produits
          </Link>
        </div>

        <div className="container-page pb-16">
          <div className="max-w-2xl">

            <h1 className="mt-3 font-display text-4xl font-bold text-ink md:text-5xl">
              {product.name}
            </h1>
          </div>

          {/* Tagline et indicateurs de fonctionnalités : volontairement hors du `max-w-2xl` du
              titre, car s-school en a beaucoup à montrer et un texte étroit sur ~27 badges
              obligerait à un mur de pilules sur 6-7 lignes au lieu de s'étaler naturellement. */}
          <IntroCarousel
            texte={product.tagline}
            wrapperClassName="mt-4"
            className="max-w-4xl text-lg leading-relaxed text-ink/70"
            fadeFrom="surface"
          />

          {heroHighlights.length > 0 && (
            <>
              <div className="mt-5 flex flex-wrap gap-2">
                {heroHighlights.map((item, i) => (
                  <span
                    key={item}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors ${CYCLE_PUCES[i % CYCLE_PUCES.length]}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
              {product.highlights?.length > heroHighlights.length && (
                <a
                  href="#fonctionnalites"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-lagune-dark transition-colors hover:text-lagune"
                >
                  Voir toutes les fonctionnalités
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
              {hasPlans ? (
                <button
                  type="button"
                  onClick={() => openSubscribe(null)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
                >
                  S'abonner à {product.name}
                </button>
              ) : (
                <Button href={product.url} variant="accent">
                  Visiter {product.name}
                </Button>
              )}
              {/* CTA secondaire, plus neutre que "S'abonner" : pour le visiteur qui veut d'abord
                  comparer les formules sans se sentir engagé à souscrire. Même destination. */}
              {afficherTarifs && (
                <Button href="#tarifs" variant="ghost">
                  Voir les offres
                </Button>
              )}
              {/* Retiré spécifiquement pour s-school : avec l'abonnement et l'essai gratuit
                  déjà proposés, "nous contacter à ce sujet" devenait redondant sur cette fiche.
                  Les autres produits SaaS le gardent tant qu'ils n'ont pas leur propre CTA. */}
              {product.slug !== "s-school" && (
                <Button to="/contact" variant="ghost">
                  Nous contacter à ce sujet
                </Button>
              )}
              {product.demoAccess && (
                <button
                  type="button"
                  onClick={() => setDemoOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
                >
                  Tester gratuitement
                </button>
              )}
          </div>

          {/* Vitrine en situation : le carrousel plat est conservé pour les vignettes des autres
              produits plus bas, mais la fiche elle-même montre le produit dans ses appareils. */}
          <SaasDeviceShowcase
            images={product.images}
            mobileImages={product.mobileImages}
            icon={product.icon}
            accent={product.accent}
            className="mt-12 w-full"
          />
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
                Présentation
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-3xl">
                Ce que fait {product.name}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink/70">
                {product.longDescription}
              </p>

              <h3 className="mt-12 font-display text-xl font-bold text-ink">
                Fonctionnalités principales
              </h3>
              {/* Le dernier item, seul dans sa rangée quand le total est impair, s'étale sur les
                  deux colonnes plutôt que de rester collé à gauche avec un grand vide à droite. */}
              <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:[&>*:last-child:nth-child(odd)]:col-span-2">
                {product.features.map((f) => (
                  <div key={f.title} className="rounded-2xl border border-ink/10 p-5">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-lagune/10 text-lagune-dark">
                      <IconeFeature id={f.icon} className="h-4.5 w-4.5" />
                    </span>
                    <h4 className="mt-3 font-display text-sm font-bold text-ink">{f.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky : la colonne de gauche (présentation + fonctionnalités) est bien plus haute
                que cet encart, qui sinon se retrouve tout seul en haut avec un grand vide en
                dessous — en le fixant, il reste visible pendant tout le défilement de la section. */}
            <aside className="sticky top-24 h-fit rounded-2xl border border-ink/10 bg-surface p-7">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink/40">
                Pour qui ?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{product.audience}</p>

              <div className="mt-8 border-t border-ink/10 pt-6">
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink/40">
                  Un projet similaire ?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  digyo peut adapter ou intégrer {product.name} à votre organisation,
                  ou construire l'outil qui correspond à votre besoin spécifique.
                </p>
                <Button to="/contact" variant="accent" className="mt-5 w-full">
                  Démarrer un échange
                </Button>
              </div>
            </aside>
          </div>

          {/* Hors de la grille 2 colonnes : sur toute la largeur du conteneur, la longue liste de
              fonctionnalités s'étale au lieu de se tasser dans la seule colonne de gauche. */}
          {product.highlights?.length > 0 && (
            <div id="fonctionnalites" className="mt-16 scroll-mt-20">
              <h3 className="font-display text-xl font-bold text-ink">
                Toutes les fonctionnalités
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.highlights.map((item, i) => (
                  <span
                    key={item}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors ${CYCLE_PUCES[i % CYCLE_PUCES.length]}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {product.howItWorks?.length > 0 && (
        <section className="border-t border-ink/10 bg-surface py-20">
          <div className="container-page">
            <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
              Mise en route
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-3xl">
              Comment ça marche
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {product.howItWorks.map((step, i) => (
                <div key={step.title}>
                  <span className="font-display text-2xl font-bold text-lagune-dark">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-base font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {afficherTarifs && (
        <section id="tarifs" className="scroll-mt-20 py-20">
          <div className="container-page">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
                Tarifs
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-3xl">
                Une formule pour chaque taille d'établissement
              </h2>
              <p className="mt-3 text-ink/70">
                Sans engagement, résiliable à tout moment. Changez de formule quand vos
                effectifs évoluent.
              </p>
            </div>

            {!hasPlans && (
              <div className="mt-10 rounded-2xl bg-surface p-8 text-center ring-1 ring-ink/10">
                {offresEnErreur ? (
                  <>
                    <p className="text-sm font-semibold text-ink">
                      Tarifs momentanément indisponibles
                    </p>
                    <p className="mx-auto mt-2 max-w-md text-sm text-ink/60">
                      Nous n'arrivons pas à joindre notre service d'abonnement. Contactez-nous, nous
                      vous communiquons les formules et vous accompagnons dans la souscription.
                    </p>
                    <Link
                      to="/contact"
                      className="mt-6 inline-flex items-center justify-center rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
                    >
                      Nous contacter
                    </Link>
                  </>
                ) : (
                  <p className="text-sm text-ink/60">Chargement des formules…</p>
                )}
              </div>
            )}

            {hasPlans && (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {plans.map((plan) => {
                const palier = STYLES_PALIER[plan.name] ?? PALIER_DEFAUT;
                return (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col overflow-hidden rounded-2xl bg-surface ${
                      plan.featured
                        ? "shadow-xl shadow-ambre/20 ring-1 ring-ambre md:-translate-y-3"
                        : "shadow-md ring-1 ring-ink/10"
                    }`}
                  >
                    {plan.featured && (
                      <div className="bg-ambre py-1.5 text-center text-xs font-bold uppercase tracking-widest text-panel">
                        Recommandé
                      </div>
                    )}

                    <div className={`bg-gradient-to-br ${palier.degrade} p-5 text-white`}>
                      <span className="inline-flex rounded-lg bg-white/20 p-2">
                        <IconePalier nom={palier.icone} className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 font-display text-xl font-bold">{plan.name}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed opacity-75">{plan.description}</p>
                      <div className="mt-4 flex items-baseline gap-1.5">
                        <span className="font-display text-2xl font-extrabold">{plan.price}</span>
                        <span className="text-xs font-medium opacity-70">{plan.period}</span>
                      </div>
                      {plan.priceHint && (
                        <p className="mt-0.5 text-[11px] opacity-70">{plan.priceHint}</p>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <ul className={`space-y-3 ${plan.modules?.length ? "" : "flex-1"}`}>
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lagune/15">
                              <svg viewBox="0 0 20 20" className="h-3 w-3 text-lagune-dark" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <span className="text-ink/75">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Limites — une par ligne, libellé à gauche et valeur à droite, exactement
                          comme dans s-school (cartes et fenêtre de détails). */}
                      {plan.limits?.length > 0 && (
                        <ul className="mt-4 space-y-1.5 border-t border-ink/10 pt-4">
                          {plan.limits.map((limite) => (
                            <li key={limite.id} className="flex items-center justify-between gap-3 text-xs">
                              <span className="flex items-center gap-2 text-ink/55">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/5">
                                  <IconeLimite id={limite.id} className="h-3 w-3 text-ink/45" />
                                </span>
                                {limite.name}
                              </span>
                              <span className="font-semibold text-ink/80">{limite.value}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Modules — tous listés, barrés quand ils ne sont pas inclus. */}
                      {plan.modules?.length > 0 && (
                        <ul className="mt-4 flex-1 space-y-2 border-t border-ink/10 pt-4">
                          {plan.modules.map((module) => (
                            <li key={module.id} className="flex items-start gap-3 text-xs">
                              <span
                                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                                  module.inclus ? "bg-lagune/15" : "bg-ink/5"
                                }`}
                              >
                                {module.inclus ? (
                                  <svg viewBox="0 0 20 20" className="h-2.5 w-2.5 text-lagune-dark" fill="none" stroke="currentColor" strokeWidth="3.5">
                                    <path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                ) : (
                                  <svg viewBox="0 0 20 20" className="h-2.5 w-2.5 text-ink/30" fill="none" stroke="currentColor" strokeWidth="3.5">
                                    <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                                  </svg>
                                )}
                              </span>
                              <span className={module.inclus ? "text-ink/75" : "text-ink/30 line-through"}>
                                {module.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <button
                        type="button"
                        onClick={() => openSubscribe(plan.id)}
                        className={`mt-6 w-full rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                          plan.featured
                            ? "bg-ambre text-panel hover:bg-ambre-dark"
                            : "bg-lagune text-white hover:bg-lagune-dark"
                        }`}
                      >
                        S'abonner
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            )}
          </div>
        </section>
      )}

      {product.faq?.length > 0 && (
        <section className="border-t border-ink/10 bg-surface py-20">
          <div className="container-page max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
              Questions fréquentes
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-3xl">
              Tout savoir avant de s'abonner
            </h2>

            <div className="mt-8">
              {product.faq.map((item, i) => (
                <FaqItem
                  key={item.question}
                  item={item}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq((cur) => (cur === i ? null : i))}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {otherProducts.length > 0 && (
        <section className="border-t border-ink/10 py-20">
          <div className="container-page">
            <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
              À découvrir aussi
            </span>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {otherProducts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/saas/${p.slug}`}
                  className="group flex items-center gap-5 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-5 transition-shadow hover:shadow-lg hover:shadow-ink/10"
                >
                  <SaasCarousel
                    images={p.images}
                    icon={p.icon}
                    accent={p.accent}
                    interval={3000}
                    controls={false}
                    className="h-16 w-16 shrink-0 rounded-xl"
                  />
                  <div>
                    <h4 className="font-display text-base font-bold text-ink">{p.name}</h4>
                    <p className="mt-1 text-sm text-ink/60">{p.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {hasPlans && (
        <SubscribeModal
          open={subscribeOpen}
          onClose={() => setSubscribeOpen(false)}
          product={product}
          plans={plans}
          initialPlanId={selectedPlanId}
        />
      )}

      {product.demoAccess && (
        <DemoAccessModal
          open={demoOpen}
          onClose={() => setDemoOpen(false)}
          productName={product.name}
        />
      )}
    </>
  );
}
