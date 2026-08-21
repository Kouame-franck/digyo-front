import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

// Une icône trait par notion, en guise de puce — plus lisible qu'un simple point pour neuf
// termes techniques d'affilée. Tracés simples à dessein : à 14px ils doivent rester
// reconnaissables comme pictogrammes, pas comme illustrations détaillées.
const TRACES_REPERES = {
  numerisation: "M4 7V4h3 M13 4h3v3 M16 13v3h-3 M7 16H4v-3 M5 10h10",
  digitalisation:
    "M10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z M10 2.5v2 M10 15.5v2 M2.5 10h2 M15.5 10h2 " +
    "M4.8 4.8l1.4 1.4 M13.8 13.8l1.4 1.4 M4.8 15.2l1.4-1.4 M13.8 6.2l1.4-1.4",
  transformation: "M5 9a5 5 0 018.5-3.5 M15 4v3h-3 M15 11a5 5 0 01-8.5 3.5 M5 16v-3h3",
  technologie:
    "M6 6h8v8H6z M8.5 2.5v3 M11.5 2.5v3 M8.5 14.5v3 M11.5 14.5v3 " +
    "M2.5 8.5h3 M2.5 11.5h3 M14.5 8.5h3 M14.5 11.5h3",
  processus: "M3 10h3 M8 10h3 M13 6.5l3.5 3.5-3.5 3.5",
  humain:
    "M7.5 7a2 2 0 10-.001-3.999A2 2 0 007.5 7z M3 16c0-2.2 2-4 4.5-4S12 13.8 12 16 " +
    "M13.5 9.2a1.7 1.7 0 100-3.4 1.7 1.7 0 000 3.4z M11.5 16c.2-1.8 1.5-3.2 3.2-3.2s3 1.4 3.2 3.2",
  client: "M3 4.5h14v9H8.5L5 17v-3.5H3v-9z M6.5 9h.01 M10 9h.01 M13.5 9h.01",
  efficacite: "M11 2L4.5 11.5H9L8 18l7.5-9.5H11l1-6.5z",
  innovation: "M10 3a5 5 0 00-2.8 9.1c.5.4.8 1 .8 1.7v.2h4v-.2c0-.7.3-1.3.8-1.7A5 5 0 0010 3z M8.3 16.5h3.4 M9 18h2",
};

function IconeRepere({ nom, className }) {
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
      <path d={TRACES_REPERES[nom]} />
    </svg>
  );
}

// Bande de repères qui devient un carrousel glissable sur mobile (voir Home.jsx pour le
// pourquoi : 9 définitions empilées faisaient un très long défilement de texte). Sans indice
// visuel, rien ne distingue une bande glissable d'un contenu simplement coupé — ce composant
// ajoute donc les trois signaux qu'un pouce reconnaît : une carte suivante qui dépasse déjà du
// cadre, un fondu qui suggère la suite, et des puces de position cliquables.
export default function ReperesCarousel({ groupes }) {
  const carteRefs = useRef([]);
  const [actif, setActif] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entrees) => {
        // Ne retient que la carte la plus visible à l'instant T, pour ne pas sauter entre
        // deux puces pendant un défilement rapide où plusieurs cartes se chevauchent.
        const plusVisible = entrees.reduce(
          (meilleure, e) => (e.intersectionRatio > (meilleure?.intersectionRatio ?? 0) ? e : meilleure),
          null
        );
        if (plusVisible?.isIntersecting) {
          const index = carteRefs.current.indexOf(plusVisible.target);
          if (index !== -1) setActif(index);
        }
      },
      { threshold: [0.5, 0.75] }
    );
    carteRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [groupes.length]);

  function allerA(index) {
    carteRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  return (
    <div className="mt-6 md:mt-10">
      {/* -mx-6/px-6 doivent correspondre EXACTEMENT au padding-inline de .container-page
          (1.5rem, voir index.css) : c'est ce qui annule le padding du conteneur pour que ce
          bloc — lui, et lui seul — touche le vrai bord de l'écran. Un écart entre les deux
          (comme le -mx-4 utilisé au premier essai) laisse une bande non déteinte entre la fin
          du fondu et le bord réel, ce qui se voit. */}
      <div className="relative -mx-6 px-6 sm:mx-0 sm:px-0">
        <div
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-1
                     [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                     md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:border-t md:border-ink/10 md:pt-8"
        >
          {groupes.map((groupe, i) => (
            <div
              key={groupe.titre}
              ref={(el) => (carteRefs.current[i] = el)}
              className="w-[78%] shrink-0 snap-start sm:w-[60%] md:w-auto md:shrink"
            >
              <Reveal delay={i * 100}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
                  {groupe.titre}
                </h3>
                <dl className="mt-3 space-y-3 md:mt-4 md:space-y-4">
                  {groupe.entrees.map((entree) => (
                    <div key={entree.terme} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lagune/10">
                        <IconeRepere nom={entree.icone} className="h-3.5 w-3.5 text-lagune-dark" />
                      </span>
                      <div>
                        <dt className="text-sm font-semibold text-ink">{entree.terme}</dt>
                        <dd className="mt-0.5 text-sm leading-snug text-ink/60">
                          {entree.definition}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Fondu de bord : la carte suivante y est visiblement tronquée, ce qui se lit comme
            « il y a plus à voir » sans qu'aucun texte ne soit nécessaire. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-canvas to-transparent md:hidden"
        />
      </div>

      {/* Puces de position — le seul indice qui reste après la première carte, une fois le
          fondu de droite sorti du cadre. */}
      <div className="mt-3 flex justify-center gap-1.5 md:hidden">
        {groupes.map((groupe, i) => (
          <button
            key={groupe.titre}
            type="button"
            onClick={() => allerA(i)}
            aria-label={`Aller à « ${groupe.titre} »`}
            aria-current={i === actif}
            className={`h-1.5 rounded-full transition-all ${
              i === actif ? "w-5 bg-lagune-dark" : "w-1.5 bg-ink/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
