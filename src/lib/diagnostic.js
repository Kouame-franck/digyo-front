export const sectorOptions = [
  "Commerce / e-commerce",
  "Restauration / hôtellerie",
  "Santé / bien-être",
  "Éducation / formation",
  "Services professionnels",
  "Artisanat / BTP",
  "Association / ONG",
  "Autre",
];

export const teamSizeOptions = [
  { value: "seul", label: "Seul(e)" },
  { value: "2-5", label: "2 à 5 personnes" },
  { value: "6-20", label: "6 à 20 personnes" },
  { value: "21-50", label: "21 à 50 personnes" },
  { value: "50+", label: "Plus de 50 personnes" },
];

export const yearsActiveOptions = [
  { value: "moins_1", label: "Moins d'1 an" },
  { value: "1_3", label: "1 à 3 ans" },
  { value: "3_10", label: "3 à 10 ans" },
  { value: "plus_10", label: "Plus de 10 ans" },
];

export const socialMediaOptions = ["Facebook", "Instagram", "LinkedIn", "TikTok", "YouTube"];

export const toolsOptions = [
  "Tableur (Excel, Google Sheets)",
  "Logiciel de gestion / ERP",
  "CRM",
  "Comptabilité",
  "Aucun outil digital",
];

export const timelineOptions = [
  { value: "immediat", label: "Immédiatement" },
  { value: "3_mois", label: "Dans les 3 mois" },
  { value: "6_mois", label: "Dans les 6 mois" },
  { value: "pas_defini", label: "Pas encore défini" },
];

export const digitalComfortOptions = [
  { value: "a_l_aise", label: "À l'aise avec les outils digitaux" },
  { value: "quelques_difficultes", label: "Quelques difficultés" },
  { value: "peu_a_l_aise", label: "Peu à l'aise" },
];

export const pillarOptions = [
  "Création web & app",
  "Transformation digitale",
  "Formation & coaching digital",
  "Autre",
];

export const clienteleOptions = [
  { value: "moins_50", label: "Moins de 50" },
  { value: "50_200", label: "50 à 200" },
  { value: "200_1000", label: "200 à 1000" },
  { value: "plus_1000", label: "Plus de 1000" },
  { value: "ne_sait_pas", label: "Je ne sais pas" },
];

export const annualRevenueOptions = [
  { value: "moins_5m", label: "Moins de 5M FCFA" },
  { value: "5_20m", label: "5 à 20M FCFA" },
  { value: "20_50m", label: "20 à 50M FCFA" },
  { value: "50_100m", label: "50 à 100M FCFA" },
  { value: "plus_100m", label: "Plus de 100M FCFA" },
  { value: "non_precise", label: "Je préfère ne pas préciser" },
];

export const contactMethodOptions = [
  { value: "ecrit", label: "Formulaire écrit uniquement" },
  { value: "appel", label: "Appel téléphonique" },
  { value: "visio", label: "Visioconférence" },
  { value: "presentiel", label: "Rendez-vous sur place" },
];

export const availabilityOptions = [
  "Matin (8h–12h)",
  "Après-midi (12h–16h)",
  "Fin de journée (16h–19h)",
  "Week-end",
];

// Au-delà de ces options, voir DIGYO_Fiche_Audit_Diagnostic_Digital.pdf (public/) : la grille
// d'audit complète de l'agence, dont ce formulaire reprend les questions les plus pertinentes
// pour un client qui se décrit lui-même en ligne -- pas les grilles de notation interne
// (score, SWOT, feuille de route...), remplies par l'auditeur après coup, pas par le client.
export const businessGoalsOptions = [
  "Augmenter le chiffre d'affaires",
  "Acquérir davantage de clients",
  "Fidéliser les clients",
  "Développer une nouvelle activité",
  "Ouvrir de nouveaux marchés",
  "Améliorer la notoriété",
  "Améliorer l'organisation interne",
  "Réduire les coûts",
  "Automatiser des tâches",
  "Digitaliser les opérations",
  "Développer les ventes en ligne",
];

export const lostProspectsOptions = [
  { value: "aucun", label: "Aucun / très peu" },
  { value: "1_5", label: "1 à 5" },
  { value: "6_10", label: "6 à 10" },
  { value: "11_20", label: "11 à 20" },
  { value: "plus_20", label: "Plus de 20" },
  { value: "inconnu", label: "Je ne sais pas" },
];

export const interestAreasOptions = [
  "Stratégie digitale",
  "Identité de marque",
  "Site web / refonte",
  "E-commerce",
  "Réseaux sociaux",
  "Création de contenu",
  "Publicité digitale",
  "CRM / gestion commerciale",
  "Automatisation",
  "WhatsApp Business / API",
  "Intelligence artificielle",
  "Tableaux de bord / data",
  "SEO / référencement local",
  "Cybersécurité",
  "Formation des équipes",
];

export const investmentBudgetOptions = [
  { value: "moins_50k", label: "Moins de 50 000 FCFA" },
  { value: "50_100k", label: "50 000 – 100 000 FCFA" },
  { value: "100_250k", label: "100 000 – 250 000 FCFA" },
  { value: "250_500k", label: "250 000 – 500 000 FCFA" },
  { value: "500k_1m", label: "500 000 – 1 000 000 FCFA" },
  { value: "plus_1m", label: "Plus de 1 000 000 FCFA" },
  { value: "a_determiner", label: "À déterminer" },
];

// not_requested n'a volontairement pas de badge : rien n'a encore été demandé, un statut ne
// ferait qu'ajouter du bruit avant le bouton d'action.
export const deepStatusMeta = {
  not_requested: {
    label: null,
    badge: null,
  },
  requested: {
    label: "En attente du résultat du diagnostic complet",
    badge: "bg-ambre/15 text-ambre-dark",
    description: "Votre demande est bien reçue, notre équipe va l'examiner sous peu.",
  },
  in_progress: {
    label: "Diagnostic en cours",
    badge: "bg-ambre/15 text-ambre-dark",
    description: "Notre équipe analyse votre activité en profondeur.",
  },
  completed: {
    label: "Diagnostic terminé",
    badge: "bg-lagune/10 text-lagune-dark",
    description: "Votre diagnostic approfondi est disponible ci-dessous.",
  },
  onsite_required: {
    label: "Visite terrain nécessaire",
    badge: "bg-ambre/15 text-ambre-dark",
    description:
      "Une visite et un diagnostic en présentiel sont nécessaires pour aller plus loin. Nous vous contacterons pour planifier un rendez-vous.",
  },
};
