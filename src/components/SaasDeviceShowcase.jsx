import { useEffect, useRef, useState } from "react";
import SaasCover from "./SaasCover";

// Vitrine produit : les captures défilent dans un ordinateur portable, avec un téléphone posé
// à côté. Remplace le carrousel plat sur la fiche produit — le cadre donne l'échelle et montre
// tout de suite que l'outil se consulte aussi bien au bureau qu'en mobilité.
//
// `images` sont les captures bureau (larges), `mobileImages` d'éventuelles captures PORTRAIT.
// À défaut de ces dernières, le téléphone reprend les captures bureau recadrées en haut à
// gauche — voir `cadrageTelephone` plus bas pour le pourquoi de ce cadrage.
export default function SaasDeviceShowcase({
  images = [],
  mobileImages = [],
  icon,
  accent = "lagune",
  interval = 4500,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const debutToucheX = useRef(null);

  const total = images.length;

  useEffect(() => {
    if (total <= 1 || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), interval);
    return () => clearInterval(id);
  }, [total, paused, interval]);

  if (total === 0) {
    return <SaasCover icon={icon} accent={accent} className={className} />;
  }

  const precedent = () => setIndex((i) => (i - 1 + total) % total);
  const suivant = () => setIndex((i) => (i + 1) % total);

  function debutToucher(e) {
    debutToucheX.current = e.touches[0].clientX;
  }
  function finToucher(e) {
    if (debutToucheX.current === null) return;
    const delta = e.changedTouches[0].clientX - debutToucheX.current;
    if (delta > 40) precedent();
    else if (delta < -40) suivant();
    debutToucheX.current = null;
  }

  // À défaut de captures portrait, le téléphone fait défiler les mêmes captures que le portable.
  const imagesTelephone = mobileImages.length > 0 ? mobileImages : images;
  // Une capture bureau (~2,1:1) dans un écran 9:19,5 est forcément recadrée : on la cale en haut
  // à gauche, là où se trouvent le logo, la barre latérale et les premières colonnes — la seule
  // portion qui reste lisible à cette taille. Une vraie capture portrait, elle, se cale en haut.
  const cadrageTelephone = mobileImages.length > 0 ? "object-top" : "object-left-top";
  // Un cran de décalage sur le portable : les deux écrans ne montrent jamais la même chose au
  // même instant, ce qui rend la scène plus vivante.
  const indexTelephone = (index + 1) % imagesTelephone.length;

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={debutToucher}
      onTouchEnd={finToucher}
    >
      {/* Halo d'ambiance derrière les appareils */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 top-6 bottom-10 rounded-[3rem] bg-gradient-to-br from-lagune/20 via-transparent to-ambre/15 blur-2xl"
      />

      {/* Les deux appareils côte à côte, posés sur la même ligne (items-end) : le socle du
          portable et le bas du téléphone s'alignent, comme sur un bureau. */}
      <div className="relative flex items-end justify-center gap-6 px-2 pb-4 sm:gap-10 sm:px-6">
        {/* ---------- Ordinateur portable ---------- */}
        {/* max-w réduit sur grand écran (lg+) : le portable paraissait trop imposant sur desktop. */}
        <div className="relative w-full min-w-0 max-w-3xl lg:max-w-2xl">
          <div className="rounded-t-2xl bg-panel p-2 shadow-2xl shadow-panel/30 ring-1 ring-ink/10 sm:p-2.5">
            <div className="relative aspect-[21/10] overflow-hidden rounded-lg bg-black">
              {images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Aperçu ${i + 1}`}
                  draggable="false"
                  className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-out ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Charnière et socle : légèrement plus larges que l'écran, comme un vrai portable */}
          <div className="relative mx-auto -ml-[4%] h-3 w-[108%] rounded-b-xl bg-gradient-to-b from-panel to-panel/75 shadow-lg">
            <div className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-full bg-on-panel/20" />
          </div>
        </div>

        {/* ---------- Téléphone ----------
            Châssis à ratio fixe : tous les détails (haut-parleur, capteur, bouton principal,
            touches latérales) sont positionnés en pourcentage de ce châssis, donc ils restent
            proportionnés du petit écran au grand. */}
        <div className="w-[17%] min-w-[64px] max-w-[150px] shrink-0">
          <div className="relative aspect-[9/19.5] rounded-[14%/6.5%] bg-panel shadow-2xl shadow-panel/40 ring-1 ring-ink/10">
            {/* Touches latérales */}
            <span className="absolute -left-[1.4%] top-[16%] h-[4.5%] w-[1.4%] rounded-l-sm bg-panel" />
            <span className="absolute -left-[1.4%] top-[23%] h-[7%] w-[1.4%] rounded-l-sm bg-panel" />
            <span className="absolute -right-[1.4%] top-[21%] h-[7%] w-[1.4%] rounded-r-sm bg-panel" />

            {/* Haut-parleur et capteur */}
            <span className="absolute left-1/2 top-[3.3%] h-[0.55%] w-[18%] -translate-x-1/2 rounded-full bg-on-panel/30" />
            <span className="absolute left-[63%] top-[3%] h-[1.15%] w-[2.5%] rounded-full bg-lagune/50 ring-1 ring-on-panel/20" />

            {/* Écran */}
            <div className="absolute inset-x-[4%] top-[6.5%] bottom-[8.5%] overflow-hidden rounded-[3%/1.4%] bg-black">
              {imagesTelephone.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  draggable="false"
                  className={`absolute inset-0 h-full w-full object-cover ${cadrageTelephone} transition-opacity duration-700 ease-out ${
                    i === indexTelephone ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Reflet vitré, très discret */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-transparent"
              />
            </div>

            {/* Bouton principal */}
            <span className="absolute bottom-[2.2%] left-1/2 h-[2.6%] w-[5.6%] -translate-x-1/2 rounded-full ring-1 ring-on-panel/30" />
          </div>
        </div>
      </div>

      {/* ---------- Contrôles, sous les appareils plutôt que par-dessus les écrans ---------- */}
      {total > 1 && (
        <div className="relative mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={precedent}
            aria-label="Image précédente"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Aller à l'image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-lagune" : "w-1.5 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={suivant}
            aria-label="Image suivante"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
