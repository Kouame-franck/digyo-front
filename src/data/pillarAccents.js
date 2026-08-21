// Couleur d'accent par pilier, partagée entre les cartes (Home) et la page Services : c'est ce
// qui permet de reconnaître un service à sa couleur avant même d'avoir lu le titre. Les paires
// bg/texte reprennent les conventions déjà utilisées ailleurs sur le site (cartes tarifs, badges).
export const ACCENTS = {
  transformation: {
    fond: "bg-lagune/8",
    trait: "text-lagune-dark",
    badge: "bg-lagune text-white",
    survol: "group-hover:bg-lagune group-hover:text-white",
    rotation: "-rotate-2 group-hover:rotate-0",
    // Pastille autonome (hors carte, donc hors `group`) : couleur visible au repos ET au
    // survol direct, pas seulement quand un parent porte `.group`. Voir Services.jsx.
    puce: "bg-lagune/10 text-lagune-dark ring-1 ring-inset ring-lagune/25 hover:bg-lagune hover:text-white hover:ring-lagune",
  },
  creation: {
    fond: "bg-ambre/10",
    trait: "text-ambre-dark",
    badge: "bg-ambre text-panel",
    survol: "group-hover:bg-ambre group-hover:text-panel",
    rotation: "rotate-2 group-hover:rotate-0",
    puce: "bg-ambre/12 text-ambre-dark ring-1 ring-inset ring-ambre/30 hover:bg-ambre hover:text-panel hover:ring-ambre",
  },
  formation: {
    fond: "bg-panel/8",
    trait: "text-panel",
    badge: "bg-panel text-on-panel",
    survol: "group-hover:bg-panel group-hover:text-on-panel",
    rotation: "-rotate-1 group-hover:rotate-0",
    puce: "bg-panel/8 text-panel ring-1 ring-inset ring-panel/20 hover:bg-panel hover:text-on-panel hover:ring-panel",
  },
  // Même couleur que « Transformation digitale » — la palette de marque ne compte que deux
  // teintes vives (lagune, ambre) plus le bleu marine du panel, déjà pris par « Formation ».
  // C'est aussi la couleur déjà associée à s-school dans data/saas.js — cohérente d'un bout à
  // l'autre du site. Les grilles en 4 colonnes (Home) ou alternées (Services) ne les placent
  // jamais l'un contre l'autre.
  saas: {
    fond: "bg-lagune/8",
    trait: "text-lagune-dark",
    badge: "bg-lagune text-white",
    survol: "group-hover:bg-lagune group-hover:text-white",
    rotation: "rotate-3 group-hover:rotate-0",
    puce: "bg-lagune/10 text-lagune-dark ring-1 ring-inset ring-lagune/25 hover:bg-lagune hover:text-white hover:ring-lagune",
  },
  // Repose sur lagune comme "transformation" et "saas" — troisième couleur de marque déjà
  // épuisée par "creation" (ambre) et "formation" (panel). En grille 3 colonnes (voir Home.jsx),
  // "matériel" tombe sous "creation" (ambre) : pas de deux couleurs identiques empilées.
  materiel: {
    fond: "bg-lagune/8",
    trait: "text-lagune-dark",
    badge: "bg-lagune text-white",
    survol: "group-hover:bg-lagune group-hover:text-white",
    rotation: "rotate-1 group-hover:rotate-0",
    puce: "bg-lagune/10 text-lagune-dark ring-1 ring-inset ring-lagune/25 hover:bg-lagune hover:text-white hover:ring-lagune",
  },
};

export const ACCENT_DEFAUT = ACCENTS.transformation;
