// Petits dessins à main levée, un par pilier — tracés volontairement irréguliers (courbes
// légèrement bancales, angles pas tout à fait droits) plutôt que des pictogrammes géométriques
// parfaits : c'est ce qui leur donne un air esquissé plutôt qu'un rendu d'icône générique.
// Chaque illustration est une composition unique, pas une variation d'un même gabarit.
const ILLUSTRATIONS = {
  // Transformation digitale : une courbe de progression qui monte en dents de scie, un éclat
  // en haut (le déclic), une petite cible en bas (le point de départ mesuré).
  transformation: (
    <>
      <circle cx="16" cy="66" r="4" />
      <path d="M20 68c8 3 12-8 20-6 7 1.5 10-9 17-8 6 1 9-7 15-9" strokeLinecap="round" />
      <path d="M69 43l4 4-8 3 4-7z" strokeLinejoin="round" />
      <path d="M82 20v9M77.5 24.5h9M79 21.5l6 6M85 21.5l-6 6" strokeLinecap="round" />
    </>
  ),
  // Création web & app : une fenêtre légèrement de travers, trois pastilles, deux lignes de
  // contenu ondulées, un curseur qui dépasse du cadre en bas à droite.
  creation: (
    <>
      <path
        d="M16 21c0-3 2-5 5-5l58 1c3 0 5 2 5 5l-1 40c0 3-2 5-5 5l-56-1c-3 0-5-2-5-5z"
        strokeLinejoin="round"
      />
      <path d="M15 30c19-1 45-1 68 0" strokeLinecap="round" />
      <circle cx="24" cy="25.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="30" cy="25.5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="36" cy="25.5" r="1.6" fill="currentColor" stroke="none" />
      <path d="M23 41c14-2 26 1 40-1" strokeLinecap="round" />
      <path d="M23 49c10 2 20-2 30 1" strokeLinecap="round" />
      <path d="M70 55l14 13-7 1-2 7-9-13z" strokeLinejoin="round" />
    </>
  ),
  // Solutions SaaS : un nuage bancal avec une boucle de synchronisation à l'intérieur (l'outil
  // se met à jour tout seul) et une petite pastille de notification qui dépasse.
  saas: (
    <>
      <path
        d="M28 56c-8 0-15-6-15-14 0-6 4-12 11-14-1-9 6-16 15-16 6 0 12 3 14 9 2-2 5-3 8-3 8 0 14 6 14 14 0 1 0 2-1 3 6 2 9 7 9 12 0 8-7 13-14 13z"
        strokeLinejoin="round"
      />
      <path d="M40 33a9 9 0 0114-3" />
      <path d="M54 27l3 4-5 1" strokeLinejoin="round" />
      <path d="M60 43a9 9 0 01-14 3" />
      <path d="M46 49l-3-4 5-1" strokeLinejoin="round" />
      <circle cx="78" cy="16" r="3.2" fill="currentColor" stroke="none" />
    </>
  ),
  // Formation & coaching : un livre ouvert un peu cabossé, des lignes de texte esquissées,
  // une petite étoile au-dessus de la reliure — le déclic d'avoir compris.
  formation: (
    <>
      <path d="M50 30c-9-6-21-9-33-8-2 0-3 1-3 3l1 34c0 2 2 3 4 3 11-1 22 2 31 8z" strokeLinejoin="round" />
      <path d="M50 30c9-6 21-9 33-8 2 0 3 1 3 3l-1 34c0 2-2 3-4 3-11-1-22 2-31 8z" strokeLinejoin="round" />
      <path d="M50 30v40" />
      <path d="M22 34c8-1 15 1 21 4M22 43c7 2 13-1 19 1" strokeLinecap="round" />
      <path d="M60 34c8-3 15-1 21 4M60 43c7-1 13 2 19 0" strokeLinecap="round" />
      <path d="M50 12v9M45.5 16.5h9M47 13.5l6 6M53 13.5l-6 6" strokeLinecap="round" />
    </>
  ),
  // Fourniture de matériel : un écran d'ordinateur un peu de travers sur son pied, et un carton
  // de livraison empilé à côté — le matériel qui arrive, pas seulement le logiciel qui tourne.
  materiel: (
    <>
      <path
        d="M18 18c0-2 1-3 3-3l34 1c2 0 3 1 3 3l-1 24c0 2-1 3-3 3l-32-1c-2 0-3-1-3-3z"
        strokeLinejoin="round"
      />
      <path d="M24 25c10-1 20 0 28-1M24 32c8 1 16-1 24 0" strokeLinecap="round" />
      <path d="M34 45c1 3 1 5 0 8M44 45c-1 3-1 5 0 8M30 53h18" strokeLinecap="round" />
      <path d="M62 40h20v18h-20z" strokeLinejoin="round" />
      <path d="M62 40l10-6 10 6" strokeLinejoin="round" />
      <path d="M66 46l8 6M82 46l-8 6" strokeLinecap="round" />
      <circle cx="90" cy="18" r="3" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function PillarIllustration({ slug, className }) {
  return (
    <svg
      viewBox="0 0 100 80"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {ILLUSTRATIONS[slug] ?? ILLUSTRATIONS.transformation}
    </svg>
  );
}
