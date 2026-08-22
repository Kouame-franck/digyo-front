export const pillars = [
  {
    slug: "transformation",
    name: "Transformation et accompagnement digitale",
    tagline: "Un diagnostic clair, un plan qui se déploie réellement.",
    headline: "Arrêtez de deviner ce qui freine votre croissance.",
    paragraphs: [
      "Beaucoup d'organisations avancent à l'instinct : un outil ajouté ici, un tableur bricolé là, sans vision d'ensemble. Résultat, personne ne sait vraiment où se situent les vrais points de friction, ni ce qui mérite d'être digitalisé en priorité.",
      "Nous commençons toujours par un diagnostic factuel de votre existant — outils, process, flux d'information — avant de proposer quoi que ce soit. Le plan d'action qui en ressort est priorisé, chiffré, et pensé pour être exécuté à votre rythme, par vos équipes ou par nous.",
    ],
    audience: "Busness personnel, PME en croissance, institutions publiques, ONG, associations, organisations qui structurent leur transformation.",
    highlights: [
      "Audit sans complaisance de l'existant",
      "Plan d'action priorisé et chiffré",
      "Choix d'outils neutres, jamais dictés par une commission",
      "Accompagnement dans la mise en œuvre réelle",
      "Formation des équipes qui reprennent la main",
    ],
    description:
      "Audit de vos outils et process, plan d'action priorisé, accompagnement dans la mise en œuvre — pour les PME comme pour les grandes organisations.",
    packages: [
      {
        name: "Starter",
        price: "100 000 – 250 000 FCFA",
        period: "forfait",
        description: "Audit digital complet + plan d'action priorisé.",
        features: [
          "État des lieux des outils existants",
          "Plan d'action à 90 jours",
          "Restitution en atelier",
        ],
      },
      {
        name: "Business",
        price: "150 000 – 350 000 FCFA",
        period: "/ mois",
        description: "Accompagnement continu sur 3 à 6 mois.",
        features: [
          "Suivi de mise en œuvre mensuel",
          "Choix et déploiement des outils",
          "Point d'avancement avec la direction",
        ],
        featured: true,
      },
      {
        name: "Enterprise",
        price: "Sur devis",
        period: "à partir de 100 000 FCFA / jour",
        description: "Accompagnement long terme et formation des équipes.",
        features: [
          "Mission dédiée sur site ou à distance",
          "Formation des équipes internes",
          "Reporting à la gouvernance",
        ],
      },
    ],
  },
  {
    slug: "creation",
    name: "Création web & app",
    tagline: "Un site ou une application pensés pour votre activité réelle.",
    headline: "Un outil sorti du moul de votre busness",
    paragraphs: [
      "Un site vitrine sans stratégie ne convertit personne. Une application développée sans comprendre le métier finit par gêner plus qu'elle n'aide. Nous partons toujours de vos flux réels — comment vos clients vous trouvent, comment votre équipe travaille — avant de dessiner quoi que ce soit.",
      "Du site vitrine à l'application métier sur-mesure, chaque projet est conçu pour être trouvé, utilisé au quotidien, et maintenu dans la durée — pas abandonné après la mise en ligne.",
    ],
    audience: "Indépendants qui lancent leur présence en ligne, commerces qui vendent en ligne, organisations avec un besoin métier spécifique, PME...",
    highlights: [
      "Design responsive, pensé mobile d'abord",
      "Back-office simple à prendre en main",
      "Intégrations paiement, stock, outils existants",
      "Hébergement et mise en ligne accompagnés",
      "Code maintenable, documenté, sans dépendance cachée",
    ],
    description:
      "Sites vitrines, plateformes e-commerce, applications métier sur-mesure — conçus pour être trouvés, utilisés et maintenus.",
    packages: [
      {
        name: "Starter",
        price: "150 000 – 400 000 FCFA",
        period: "forfait",
        description: "Site vitrine professionnel, prêt à publier.",
        features: [
          "Jusqu'à 5 pages",
          "Design responsive",
          "Mise en ligne incluse",
        ],
      },
      {
        name: "Business",
        price: "800 000 – 2 500 000 FCFA",
        period: "forfait",
        description: "E-commerce ou application métier sur-mesure.",
        features: [
          "Back-office de gestion",
          "Intégration paiement / stock",
          "Formation à la prise en main",
        ],
        featured: true,
      },
      {
        name: "Enterprise",
        price: "Sur devis",
        period: "à partir de 3 000 000 FCFA",
        description: "Plateforme complexe, intégrations, maintenance continue.",
        features: [
          "Architecture sur-mesure",
          "Intégrations systèmes existants",
          "Maintenance et évolutions incluses",
        ],
      },
    ],
  },
  {
    slug: "saas",
    name: "Solutions SaaS",
    tagline: "Des logiciels prêts à l'emploi, facturés à l'usage.",
    headline: "Le logiciel existe déjà. Vous n'avez qu'à prendre votre abonnement.",
    paragraphs: [
      "Vous voulez un outils prêt à l'emplois, une solution existante ou encor eviter les frais de maintenances ?",
      "Nos produits SaaS sont des outils métier déjà construits et éprouvés, que vous mettez en service en quelques minutes. nous vous proposons des formules en fonction de votre taille et de votre budjet dans des secteurs varié. s-school, notre plateforme de gestion scolaire, tourne aujourd'hui en production pour la gestion de vos etablisements scolaire, universitaire ou centre de formation. ",
    ],
    audience: "Établissements et organisations avec des opérations répétitives — inscriptions, présences, facturation, suivi.",
    highlights: [
      "Mise en service en quelques minutes, sans développement",
      "Facturation à l'usage, pas de licence figée",
      "Mises à jour continues, sans intervention de votre part",
      "Support inclus, pas un forfait à part",
      "s-school, notre première plateforme, déjà en production",
    ],
    description:
      "Des outils métier déjà construits — gestion scolaire avec s-school, et d'autres à venir — que vous mettez en service en quelques minutes, sans développement sur-mesure.",
    // Pas de tarifs ici : chaque produit SaaS a ses propres formules, à jour en temps réel
    // sur sa fiche (voir data/saas.js et SaasDetail.jsx). Un prix figé ici pourrait diverger de
    // celui réellement facturé — la carte renvoie donc vers le catalogue plutôt que d'en
    // afficher une copie qui se périmerait.
    packages: null,
  },
  {
    slug: "materiel",
    name: "Fourniture de matériel",
    tagline: "Le matériel technologique, informatique, bureautique et divers.",
    headline: "Du materiel adapté a votre vision et vos besoins quotidiens",
    paragraphs: [
      "Un equipement mal dimensionné pour l'usage réel d'une structure est un veritable frein à une démarche evolutive . L'équipement fait partie du projet, pas une case à cocher après coup.",
      "Nous fournissons le matériel technologique, informatique, bureautique et divers nécessaire à vos projets — ordinateurs, réseau, périphériques, mobilier technique — dimensionné pour l'usage que vous en aurez.",
    ],
    audience: "Établissements qui s'équipent, PME qui renouvellent leur parc, projets qui démarrent de zéro.",
    highlights: [
      "Matériel dimensionné pour l'usage réel, pas surdimensionné",
      "Informatique, réseau et bureautique dans un seul interlocuteur",
      "Livraison et mise en service accompagnées",
      "Compatible avec les outils déjà en place",
      "Conseil neutre, sans marque imposée",
    ],
    description:
      "Fourniture de matériel technologique, informatique, bureautique et divers — pour équiper un poste, une salle ou tout un établissement.",
    // Pas de tarifs : le prix du matériel dépend trop de ce qui est réellement commandé (marque,
    // quantité, disponibilité) pour qu'une fourchette générique ait un sens — voir Services.jsx,
    // qui renvoie vers le contact plutôt que d'afficher un tableau de prix inventé.
    packages: null,
  },
  {
    slug: "formation",
    name: "Formation & coaching digital",
    tagline: "Des équipes autonomes sur leurs outils digitaux.",
    headline: "Des outils, ça ne sert à rien si personne ne sait s'en servir.",
    paragraphs: [
      "La première cause d'échec d'un projet digital n'est presque jamais l'outil — c'est l'adoption. Une équipe qui n'a pas été formée revient à ses vieilles habitudes en quelques semaines, quel que soit le budget investi.",
      "Nos formations sont pratiques, construites autour de vos outils réels et de vos cas d'usage — pas des slides génériques. Un indépendant repart avec des réflexes concrets ; une équipe, avec un mode d'emploi qu'elle a elle-même testé pendant l'atelier.",
    ],
    audience: "Indépendants qui montent en compétence, équipes PME, grandes structures qui déploient un programme continu.",
    highlights: [
      "Ateliers construits sur vos outils, pas des slides génériques",
      "Groupes restreints pour un vrai suivi individuel",
      "Cas pratiques tirés de situations réelles",
      "Support remis, réutilisable après la formation",
      "Suivi post-formation pour ancrer les nouveaux réflexes",
    ],
    description:
      "Ateliers pratiques pour indépendants, formations d'équipe pour PME, programmes continus pour grandes structures.",
    packages: [
      {
        name: "Starter",
        price: "15 000 – 40 000 FCFA",
        period: "/ personne",
        description: "Atelier pratique pour particuliers et freelances.",
        features: [
          "Demi-journée en petit groupe",
          "Support de formation remis",
          "Cas pratiques réels",
        ],
      },
      {
        name: "Business",
        price: "300 000 – 700 000 FCFA",
        period: "/ session",
        description: "Formation d'équipe sur-mesure pour PME.",
        features: [
          "Programme adapté au métier",
          "Jusqu'à 15 participants",
          "Support post-formation",
        ],
        featured: true,
      },
      {
        name: "Enterprise",
        price: "Sur devis",
        period: "abonnement mensuel",
        description: "Programme de formation continue pour grandes structures.",
        features: [
          "Parcours multi-niveaux",
          "Suivi de progression",
          "Intervenants dédiés",
        ],
      },
    ],
  },
];

// Une photo par pilier, choisie pour illustrer concrètement chaque service plutôt qu'un
// pictogramme générique — libres de droits (Pexels), utilisées sur l'accueil et sur /services.
export const pillarPhotos = {
  transformation: {
    src: "/services/transformation.jpg",
    alt: "Équipe en réunion de travail devant un tableau blanc, discutant d'une stratégie",
  },
  creation: {
    src: "/services/creation.jpg",
    alt: "Développeur concentré sur plusieurs écrans dans un espace de travail moderne",
  },
  saas: {
    src: "/services/saas.jpg",
    alt: "Tableau de bord analytique affiché sur un ordinateur portable",
  },
  materiel: {
    src: "/services/materiel.jpg",
    alt: "Salle équipée de plusieurs ordinateurs de bureau prêts à l'emploi",
  },
  formation: {
    src: "/services/formation.jpg",
    alt: "Formatrice animant un atelier devant un tableau blanc face à des participants",
  },
};

// Repères sur la transformation digitale, affichés sous le titre « Ce que nous faisons ».
// Trois groupes de trois : ce que les mots veulent dire, sur quoi ça repose, ce que ça rapporte.
export const reperesTransformation = [
  {
    titre: "Des notions impotates à distinguer",
    entrees: [
      { terme: "Numérisation", definition: "Convertir des documents physiques en fichiers exploitables.", icone: "numerisation" },
      { terme: "Digitalisation", definition: "Automatiser une tâche ou un processus à l'aide d'un outil numérique.", icone: "digitalisation" },
      { terme: "Transformation digitale", definition: "Revoir la stratégie, l'organisation et les façons de travailler.", icone: "transformation" },
    ],
  },
  {
    titre: "Sur quoi elle repose",
    entrees: [
      { terme: "Technologie", definition: "Cloud, données, intelligence artificielle, objets connectés.", icone: "technologie" },
      { terme: "Processus", definition: "Des flux de travail simplifiés, donc plus rapides à faire évoluer.", icone: "processus" },
      { terme: "Culture et humain", definition: "Accompagnement du changement et montée en compétences des équipes.", icone: "humain" },
    ],
  },
  {
    titre: "Ce qu'elle rapporte",
    entrees: [
      { terme: "Expérience client", definition: "Des réponses plus rapides et des services personnalisés.", icone: "client" },
      { terme: "Efficacité", definition: "Moins de coûts et moins de charge administrative.", icone: "efficacite" },
      { terme: "Innovation", definition: "De nouveaux modèles économiques : abonnement, plateformes en ligne.", icone: "innovation" },
    ],
  },
];

export const values = [
  {
    title: "Une connaissance fine du terrain",
    description:
      "Contraintes de connectivité, réalités du Mobile Money, spécificités réglementaires locales : notre équipe travaille sur ce terrain au quotidien — pas depuis un cabinet distant qui plaque les mêmes solutions d'un marché à l'autre.",
    icone: "terrain",
  },
  {
    title: "La securité de Vos données",
    description:
      "La confidentialité dans la gestion et le traitement de vos données represente un parametre assez import dans notre mode d'action. Nous mettons a coeur la protection de vos données dans toute notre demarche collaborative.",
    icone: "securite",
  },
  {
    title: "Des systèmes construits pour durer",
    description:
      "Sécurité, sauvegardes, code maintenable : chaque outil est pensé pour tourner en production dans cinq ans, pas pour tenir jusqu'à la démonstration.",
    icone: "durabilite",
  },
  {
    title: "Prix adaptés à votre taille",
    description:
      "Des formules pensées pour l'indépendant qui démarre comme pour l'institution qui structure sa transformation — le même sérieux d'exécution, sans le tarif d'une multinationale.",
    icone: "prix",
  },
];

// Principes propres à la page « À propos » — comment l'équipe travaille au quotidien, pas
// pourquoi un client choisirait digyo (ça, c'est `values`, utilisé sur l'accueil). Volontairement
// distincts pour que les deux pages ne se répètent pas mot pour mot.
export const principes = [
  {
    title: "On construit ce qu'on recommande",
    description:
      "Pas de plan qui reste sur papier : la même équipe qui pose le diagnostic met la main à l'exécution, jusqu'à ce que l'outil tourne réellement.",
  },
  {
    title: "La simplicité avant la sophistication",
    description:
      "Le bon outil est celui que vos équipes utilisent encore dans six mois — pas le plus impressionnant sur le papier. On évite la complexité qui ne sert que la démonstration.",
  },
  {
    title: "Un accompagnement qui ne s'arrête pas à la facture",
    description:
      "Une question après la livraison ne devrait jamais rester sans réponse. Nous restons joignables, et nous le prouvons en continuant d'exploiter nos propres produits.",
  },
];

export const process = [
  {
    step: "01",
    title: "Écoute",
    description: "On cadre vos objectifs réels, vos contraintes et votre budget avant de proposer quoi que ce soit.",
  },
  {
    step: "02",
    title: "Diagnostic",
    description: "Audit de l'existant — outils, process, présence en ligne — pour identifier ce qui compte vraiment.",
  },
  {
    step: "03",
    title: "Exécution",
    description: "Mise en œuvre concrète : conception, développement, formation — avec des points d'étape réguliers.",
  },
  {
    step: "04",
    title: "Suivi",
    description: "Un accompagnement qui continue après la livraison, pour que les résultats tiennent dans la durée.",
  },
];

export const partners = [
  { name: "Polygone", logo: "/partenaires/logo_polygone_sans_bg.png" },
  { name: "Homeduc", logo: "/partenaires/logo_homeduc.png" },
  { name: "Aboya", logo: "/partenaires/logo_aboya2.jpg" },
  { name: "AGID", logo: "/partenaires/logo-agid.jpeg" },
  { name: "S-School", logo: "/partenaires/logo2.png" },
  { name: "Partenaire", logo: "/partenaires/logo.jpg" },
];

export const contactInfo = {
  email: "contact@digyo.pro",
  city: "Abidjan, Côte d'Ivoire",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
  ],
};
