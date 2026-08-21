import { useEffect, useRef, useState } from "react";

// Répartit le texte en `nCartes` groupes équilibrés en longueur (pas en nombre de phrases —
// un découpage par nombre de phrases produisait des blocs très inégaux dès qu'une phrase était
// beaucoup plus longue que les autres, avec en général le premier bloc le plus court). On
// découpe en unités fines (phrases ET virgules, jamais en plein milieu d'un mot) puis on les
// regroupe glouton par seuil cumulé — ça répartit l'écart sur tous les groupes plutôt que de le
// concentrer sur le premier ou le dernier, et laisse spontanément le dernier bloc le plus court
// quand un équilibre parfait n'est pas possible (jamais le premier).
function decouperEnCartes(texte, nCartes) {
  const chunks = texte.match(/[^.,!?]+[.,!?]+(\s+|$)/g)?.map((s) => s.trim()).filter(Boolean);
  if (!chunks || chunks.length <= 1) return [texte];
  if (chunks.length <= nCartes) return chunks;

  const longueurs = chunks.map((c) => c.length);
  const total = longueurs.reduce((a, b) => a + b, 0);
  const cible = total / nCartes;

  const groupes = [];
  let courant = [];
  let cum = 0;
  let groupIndex = 0;
  for (let i = 0; i < chunks.length; i++) {
    courant.push(chunks[i]);
    cum += longueurs[i];
    const seuil = cible * (groupIndex + 1);
    const groupesRestants = nCartes - groupIndex - 1;
    const chunksRestants = chunks.length - i - 1;
    // Ne clôt un groupe que s'il reste assez de morceaux pour remplir les groupes suivants —
    // sinon un dernier bloc pourrait se retrouver vide.
    if (groupIndex < nCartes - 1 && cum >= seuil && chunksRestants >= groupesRestants) {
      groupes.push(courant.join(" "));
      courant = [];
      groupIndex++;
    }
  }
  if (courant.length) groupes.push(courant.join(" "));
  return groupes;
}

const FONDU = {
  canvas: "from-canvas",
  surface: "from-surface",
};

// Paragraphe d'intro un peu long : sur mobile, découpé en cartes qui défilent horizontalement
// (fondu de bord + puces de position cliquables), même traitement que ReperesCarousel sur
// l'accueil et pour la même raison — un long bloc de texte empilé verticalement pousse tout le
// reste très bas sur un petit écran. À partir de md, la place ne manque plus : le paragraphe
// complet s'affiche normalement, en un seul bloc.
export default function IntroCarousel({ texte, className = "", wrapperClassName = "", cartes = 3, fadeFrom = "canvas" }) {
  const groupes = decouperEnCartes(texte, cartes);
  const carteRefs = useRef([]);
  const [actif, setActif] = useState(0);

  useEffect(() => {
    if (groupes.length <= 1) return;
    const observer = new IntersectionObserver(
      (entrees) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupes.length]);

  function allerA(index) {
    carteRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  if (groupes.length <= 1) {
    return <p className={`${wrapperClassName} ${className}`}>{texte}</p>;
  }

  return (
    <div className={wrapperClassName}>
      {/* Desktop : le paragraphe complet, normal. */}
      <p className={`hidden md:block ${className}`}>{texte}</p>

      {/* Mobile : les mêmes phrases, découpées en cartes glissables. */}
      <div className="md:hidden">
        <div className="relative -mx-6 px-6 sm:mx-0 sm:px-0">
          <div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1
                       [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {groupes.map((groupe, i) => (
              <p
                key={i}
                ref={(el) => (carteRefs.current[i] = el)}
                className={`w-[85%] shrink-0 snap-start sm:w-[70%] ${className}`}
              >
                {groupe}
              </p>
            ))}
          </div>
          {/* Fondu de bord : signale qu'il y a plus à voir, sans texte. La couleur doit
              correspondre au fond réel de la section (voir usages) sinon le dégradé se voit. */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l ${FONDU[fadeFrom] ?? FONDU.canvas} to-transparent`}
          />
        </div>

        <div className="mt-3 flex justify-center gap-1.5">
          {groupes.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => allerA(i)}
              aria-label={`Aller au passage ${i + 1}`}
              aria-current={i === actif}
              className={`h-1.5 rounded-full transition-all ${
                i === actif ? "w-5 bg-lagune-dark" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
