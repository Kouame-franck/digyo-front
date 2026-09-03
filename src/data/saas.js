export const saasProducts = [
  {
    slug: "s-school",
    name: "s-school",
    tagline:
      "Vous dirigez un établissement préscolaire, scolaire, un collège ou un centre de formation ? Vivez une expérience inédite de gestion centralisée avec s-school, un logiciel moderne, intuitif et facile à prendre en main. Il automatise vos tâches répétitives, affine la maîtrise de vos chiffres et l'exploitation de vos données, et optimise vos prises de décision ainsi que la gestion de vos apprenants. Entièrement personnalisable pour s'intégrer à votre mode de fonctionnement, il vous accompagne dans la gestion de toutes les tâches principales de l'établissement.",
    // Sélection courte des fonctionnalités les plus différenciantes, affichée dans le hero —
    // la liste complète (`highlights`) est trop longue pour y tenir sans noyer les CTA, elle est
    // reléguée plus bas sur la page, sous "Voir toutes les fonctionnalités" (voir SaasDetail.jsx).
    heroHighlights: [
      "Gestion multi-cycles",
      "Inscriptions en ligne",
      "Gestion des admissions & suivi des élèves",
      "Statistiques & chiffres clés de l'établissement",
      "Détection du risque de décrochage",
      "Paiement électronique sécurisé",
      "Espace parents",
      "Confidentialité des données",
    ],
    // Fonctionnalités détaillées affichées sous forme d'indicateurs colorés sur la fiche produit
    // (voir SaasDetail.jsx) — reprend la liste qui accompagnait auparavant le tagline en texte brut.
    highlights: [
      "Gestion multi-cycles",
      "Enchaînement automatique des données année par année",
      "Inscriptions en ligne",
      "Importation intelligente des anciens apprenants",
      "Exports PDF & Excel",
      "Photos élèves & enseignants",
      "Cartes d'accès",
      "Gestion des matières",
      "Devoirs & coefficients par note, matière, section et niveau",
      "Activités scolaires & extrascolaires",
      "Cahier de texte avec pièces jointes",
      "Personnalisation du mode de notation",
      "Personnalisation des modalités de paiement",
      "Gestion des admissions & suivi des élèves",
      "Parcours apprenant",
      "Taux horaire",
      "Gestion des salles",
      "Statistiques & chiffres clés de l'établissement",
      "Détection du risque de décrochage",
      "Rapports financiers",
      "Gestion & contrôle des accès utilisateurs",
      "Espace parents",
      "Espace enseignants",
      "Espace apprenants",
      "Actualités, avis & communiqués",
      "Système de notation par appréciation",
      "Paiement électronique sécurisé",
      "SMS de rappel",
      "Confidentialité des données",
    ],
    description:
      "Une plateforme qui centralise inscriptions, suivi pédagogique, facturation et communication avec les familles dans un seul outil.",
    longDescription:
      "s-school est une plateforme de gestion pensée pour les établissements scolaires et les centres de formation. Elle remplace les tableurs et les registres papier par un outil unique, pour que direction, enseignants et familles disposent enfin d'une information à jour et partagée.",
    category: "Éducation & formation",
    status: "Disponible",
    icon: "graduation",
    accent: "lagune",
    url: "#",
    // Aucun tarif en dur ici : les offres viennent exclusivement de la console projects-admin
    // via /api/sschool-signup/offres (voir SaasDetail.jsx). Un repli statique afficherait des
    // prix inventés dès que la console est injoignable — on préfère annoncer l'indisponibilité.
    liveOffers: true,
    // Un seul compte s-school partagé sert de démo à tous les visiteurs (voir
    // DemoAccessModal.jsx) — le formulaire ne fait que capturer le lead avant de le révéler.
    demoAccess: true,
    images: ["/sschool1.png", "/sschool2.png", "/school3.png"],
    audience: "Écoles préscolaires, primaires et secondaires, centres de formation professionnelle, instituts privés, universités.",
    features: [
      {
        title: "Inscriptions & dossiers élèves",
        description: "Centralisez les dossiers, pièces administratives et historiques scolaires.",
        icon: "dossier",
      },
      {
        title: "Notes & bulletins",
        description: "Saisie des notes, génération automatique des bulletins par période.",
        icon: "bulletin",
      },
      {
        title: "Emploi du temps & présence",
        description: "Planning des cours et suivi de présence en temps réel.",
        icon: "planning",
      },
      {
        title: "Communication avec les familles",
        description: "Notifications et messages envoyés directement aux parents.",
        icon: "message",
      },
      {
        title: "Facturation & paiements",
        description: "Suivi des frais de scolarité et des paiements, échéance par échéance.",
        icon: "facture",
      },
      {
        title: "Tableaux de bord direction",
        description: "Vue d'ensemble des effectifs, résultats et impayés pour piloter l'établissement.",
        icon: "dashboard",
      },
      {
        title: "Suivi des états de scolarité",
        description: "Visualisez en un coup d'œil la situation de chaque élève : à jour, en retard ou en risque de décrochage.",
        icon: "suivi",
      },
      {
        title: "Rappels SMS",
        description: "Envoi automatique de SMS aux familles pour les échéances, absences et annonces importantes.",
        icon: "sms",
      },
      {
        title: "Paiement électronique",
        description: "Les familles règlent la scolarité en ligne, en toute sécurité, sans passer par le secrétariat.",
        icon: "carte",
      },
    ],
    howItWorks: [
      {
        title: "Vous choisissez votre formule",
        description: "Selon la taille de votre établissement, avec la possibilité d'en changer à tout moment.",
      },
      {
        title: "Configuration de votre espace",
        description: "Import des classes et des élèves, paramétrage des périodes et des frais de scolarité.",
      },
      {
        title: "Prise en main de l'équipe",
        description: "Un accompagnement dédié pour former direction, enseignants et personnel administratif.",
      },
      {
        title: "Mise en service",
        description: "Votre établissement bascule sur s-school, avec un suivi rapproché les premières semaines.",
      },
    ],
    faq: [
      {
        question: "Combien de temps prend la mise en place ?",
        answer:
          "Comptez généralement 1 à 3 semaines entre la souscription et la mise en service, selon la taille de l'établissement et la qualité des données à importer (élèves, classes, historiques).",
      },
      {
        question: "Mes données sont-elles en sécurité ?",
        answer:
          "Oui. Les données de votre établissement sont hébergées de façon sécurisée et ne sont ni partagées ni utilisées à d'autres fins que le fonctionnement de votre espace s-school.",
      },
      {
        question: "Puis-je changer de formule plus tard ?",
        answer:
          "Oui, vous pouvez passer à une formule supérieure (ou inférieure) à tout moment en fonction de l'évolution de vos effectifs, sans perte de données.",
      },
      {
        question: "Y a-t-il un engagement de durée ?",
        answer:
          "Non, l'abonnement est sans engagement et se règle mensuellement. Vous pouvez y mettre fin à tout moment.",
      },
      {
        question: "Proposez-vous une période d'essai ?",
        answer:
          "Nous organisons une démonstration personnalisée avant souscription, et un accompagnement renforcé durant le premier mois pour valider que l'outil correspond bien à votre fonctionnement.",
      },
    ],
  },
  // {
  //   slug: "saas-2",
  //   name: "Nom du SaaS 2",
  //   tagline: "Une phrase courte qui résume ce que fait le produit.",
  //   description:
  //     "Description à compléter : le problème résolu, pour qui, et ce qui le rend différent.",
  //   longDescription:
  //     "Description détaillée à compléter — présentez ici le problème résolu, votre approche, et ce qui différencie ce produit sur son marché.",
  //   category: "Catégorie à préciser",
  //   status: "À compléter",
  //   icon: "grid",
  //   accent: "ambre",
  //   url: "#",
  //   audience: "À préciser.",
  //   features: [
  //     { title: "Fonctionnalité 1", description: "Description à compléter." },
  //     { title: "Fonctionnalité 2", description: "Description à compléter." },
  //     { title: "Fonctionnalité 3", description: "Description à compléter." },
  //   ],
  // },
];

export function getSaasBySlug(slug) {
  return saasProducts.find((p) => p.slug === slug);
}
