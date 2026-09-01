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
