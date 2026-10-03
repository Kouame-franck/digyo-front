// Contenu de la landing page s-school (/saas/s-school, voir components/sschool/SSchoolLanding.jsx).
// Tout ce qui est annoncé ici existe dans s-school — vérifié dans son code au 02/10/2026 (ex. la
// « zone rouge » = page Statistiques, élèves sous la moitié de l'échelle de notation). Pas de
// chiffres d'usage ni de témoignages : s-school est en lancement, rien n'est inventé.
// « s‑school » avec un trait d'union insécable dans les phrases longues, pour ne jamais couper
// le nom en fin de ligne.
// Les captures (public/sschool/) ont été faites sur l'école de démonstration.

export const hero = {
  badge: "Solution de gestion centralisée d'établissement scolaire",
  titre: "Toute la vie de votre école, au même endroit.",
  sousTitre:
    "Inscriptions, notes et bulletins, scolarité et paiements, échanges avec les familles : s‑school remplace les registres et les tableurs par un seul outil, sur ordinateur comme sur téléphone.",
  rassurance: ["Sans engagement", "Mensuel ou annuel", "Accompagnement à la mise en place"],
};

export const problemes = {
  titre: "Ça vous parle ?",
  intro: "Ce que vivent la plupart des écoles qui gèrent encore tout à la main.",
  items: [
    {
      titre: "Des registres partout",
      texte: "Les mêmes informations recopiées dans plusieurs cahiers et fichiers, qui se perdent d'une année à l'autre.",
    },
    {
      titre: "Les impayés découverts trop tard",
      texte: "Savoir qui est à jour demande de refaire les comptes à la main, souvent en fin de trimestre.",
    },
    {
      titre: "Les bulletins, une semaine de calculs",
      texte: "Moyennes, coefficients, rangs : chaque fin de période mobilise toute l'équipe.",
    },
    {
      titre: "Le secrétariat au téléphone",
      texte: "Les parents appellent pour une note, un solde ou une absence, faute de pouvoir le voir eux-mêmes.",
    },
  ],
};

// Un espace par profil : ce que chacun y gagne. `image` : capture de l'école démo.
export const profils = [
  {
    id: "direction",
    onglet: "Direction",
    titre: "Pilotez l'établissement avec des chiffres à jour",
    points: [
      "Tableau de bord : effectifs, résultats, absences et taux de recouvrement",
      "Zone rouge : les élèves en difficulté, leurs points forts et faibles par matière",
      "Rapports financiers : entrées, sorties et reste à collecter",
      "Droits d'accès définis pour chaque membre du personnel",
    ],
    image: "/sschool/direction.jpg",
  },
  {
    id: "secretariat",
    onglet: "Secrétariat & caisse",
    titre: "Inscriptions et encaissements sans ressaisie",
    points: [
      "Inscriptions et réinscriptions au guichet ou payées en ligne",
      "Versements enregistrés, reçus imprimables à tout moment",
      "Statut de paiement de chaque élève : à jour ou en retard",
      "Import des anciens élèves depuis Excel, exports PDF et Excel",
    ],
    image: "/sschool/secretariat.jpg",
  },
  {
    id: "enseignants",
    onglet: "Enseignants",
    titre: "Moins de paperasse, plus de temps pour la classe",
    points: [
      "Saisie des notes ou des appréciations, avec les coefficients de l'école",
      "Cahier de texte avec pièces jointes",
      "Devoirs, emploi du temps et progression du programme",
      "Un espace à part, limité à leurs classes et leurs matières",
    ],
    image: "/sschool/enseignants.jpg",
  },
  {
    id: "familles",
    onglet: "Parents & élèves",
    titre: "Les familles informées, sans appeler l'école",
    points: [
      "Notes, bulletins, absences et emploi du temps en ligne",
      "Paiement de la scolarité par Mobile Money, depuis le téléphone",
      "Historique des versements et reçus téléchargeables",
      "Actualités et communiqués de l'établissement",
    ],
    image: "/sschool/familles.jpg",
  },
];

// Fonctionnalités mises en avant (sections alternées texte / capture).
export const phares = [
  {
    surtitre: "Scolarité & paiements",
    titre: "La scolarité encaissée et suivie, élève par élève",
    texte:
      "Les familles paient en ligne par Mobile Money ; chaque paiement est vérifié auprès de l'opérateur et enregistré automatiquement. Le secrétariat voit qui est à jour et qui est en retard, et réimprime n'importe quel reçu.",
    points: ["Paiement électronique sécurisé (Money Fusion)", "Échéancier propre à chaque niveau", "Reçus numérotés, à la date du versement"],
    image: "/sschool/paiements.jpg",
  },
  {
    surtitre: "Notes & bulletins",
    titre: "Des bulletins calculés, pas recalculés",
    texte:
      "Les enseignants saisissent leurs notes, s-school calcule moyennes et rangs avec vos coefficients. Notation chiffrée ou par appréciation : c'est vous qui choisissez, et vous décidez quand les familles voient les bulletins.",
    points: ["Coefficients par note, matière et niveau", "Notation chiffrée ou par appréciation", "Bulletins ouverts aux familles par l'administration"],
    image: "/sschool/bulletins.jpg?v=2",
  },
  {
    surtitre: "Suivi des élèves",
    titre: "Repérez les élèves en difficulté avant la fin de l'année",
    texte:
      "Chaque élève a sa fiche : scolarité, absences et retards, notes, parcours. La zone rouge liste ceux qui sont sous la moyenne, avec leurs matières fortes et faibles et une piste d'accompagnement ou d'orientation.",
    points: ["Fiche élève complète, d'une année sur l'autre", "Élèves en zone rouge, par cycle", "Admissions et passage en classe supérieure"],
    image: "/sschool/suivi.jpg",
  },
];

// Toutes les fonctionnalités, rangées par thème (mêmes libellés que data/saas.js `highlights`).
export const categories = [
  {
    titre: "Inscriptions & élèves",
    items: [
      "Gestion multi-cycles",
      "Inscriptions en ligne",
      "Importation intelligente des anciens apprenants",
      "Enchaînement automatique des données année par année",
      "Gestion des admissions & suivi des élèves",
      "Parcours apprenant",
      "Photos élèves & enseignants",
      "Cartes d'accès",
    ],
  },
  {
    titre: "Pédagogie",
    items: [
      "Gestion des matières",
      "Devoirs & coefficients par note, matière, section et niveau",
      "Personnalisation du mode de notation",
      "Système de notation par appréciation",
      "Cahier de texte avec pièces jointes",
      "Activités scolaires & extrascolaires",
      "Gestion des salles",
      "Taux horaire",
    ],
  },
  {
    titre: "Finances",
    items: [
      "Personnalisation des modalités de paiement",
      "Paiement électronique sécurisé",
      "Rapports financiers",
      "SMS de rappel",
    ],
  },
  {
    titre: "Pilotage",
    items: [
      "Statistiques & chiffres clés de l'établissement",
      "Zone rouge : élèves en difficulté et pistes d'orientation",
      "Gestion & contrôle des accès utilisateurs",
      "Exports PDF & Excel",
    ],
  },
  {
    titre: "Communication",
    items: ["Espace parents", "Espace enseignants", "Espace apprenants", "Actualités, avis & communiqués"],
  },
];

export const securite = [
  {
    titre: "Chaque école dans son espace",
    texte: "Les données de votre établissement sont cloisonnées : aucune autre école ne peut y accéder.",
  },
  {
    titre: "Chacun voit ce qui le concerne",
    texte: "Direction, personnel, enseignants, parents et élèves ont chacun leur espace et leurs droits.",
  },
  {
    titre: "Paiements par un opérateur agréé",
    texte: "Les paiements passent par Money Fusion : s-school ne stocke aucune donnée bancaire.",
  },
  {
    titre: "Vos données restent les vôtres",
    texte: "Connexion chiffrée, et exports PDF ou Excel de vos listes à tout moment.",
  },
];

export const appelFinal = {
  titre: "Voyez s-school sur une vraie école",
  texte:
    "Le compte de démonstration ouvre une école complète : classes, élèves, notes, paiements. Explorez-la librement, sans engagement.",
};
