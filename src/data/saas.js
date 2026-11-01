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
    // Captures de l'école de démonstration (02/10/2026) : accueil, encaissements, liste des élèves.
    images: ["/sschool/accueil.jpg", "/sschool/paiements.jpg", "/sschool/secretariat.jpg"],
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
          "Non. L'abonnement est sans engagement, au mois ou à l'année (l'annuel offre 2 mois). Vous pouvez y mettre fin à tout moment.",
      },
      {
        question: "Peut-on essayer avant de s'abonner ?",
        answer:
          "Oui. Le bouton « Tester gratuitement » vous donne accès à une école de démonstration complète, à explorer librement. Nous pouvons aussi vous faire une démonstration personnalisée, puis vous accompagner de près durant le premier mois.",
      },
      {
        question: "Puis-je reprendre mes élèves existants ?",
        answer:
          "Oui. Vos listes d'élèves s'importent depuis un fichier Excel, et les données suivent ensuite automatiquement d'une année scolaire à l'autre.",
      },
      {
        question: "Les parents peuvent-ils payer en ligne ?",
        answer:
          "Oui, avec le module de paiement électronique : depuis leur espace, les familles règlent la scolarité par Mobile Money via Money Fusion. Le paiement est enregistré automatiquement et le reçu disponible tout de suite.",
      },
      {
        question: "Faut-il installer quelque chose ?",
        answer:
          "Non. s-school s'utilise dans le navigateur, sur ordinateur, tablette ou téléphone. Il suffit d'une connexion internet.",
      },
    ],
  },
  {
    slug: "digyo-pos",
    name: "digyo-pos",
    tagline:
      "La caisse et le stock de vos boutiques, même quand internet coupe. digyo-pos encaisse vite (lecteur de codes-barres, écran tactile, Mobile Money), suit chaque article de la réception à la vente et vous donne vos chiffres en temps réel, boutique par boutique.",
    description:
      "Logiciel de caisse et de gestion de stock pour commerces : vente rapide, caisse hors ligne, inventaires, achats, multi-boutiques et rapports.",
    longDescription:
      "digyo-pos réunit la caisse, le stock, les achats et les rapports de vos boutiques dans un seul outil : une appli de caisse Windows qui continue de vendre sans internet, et un espace de gestion en ligne pour piloter votre activité de partout.",
    category: "Commerce & distribution",
    status: "Disponible",
    icon: "caisse",
    accent: "lagune",
    url: "https://pos.digyo.pro",
    operatingSystem: "Windows, Web",
    // Captures d'une supérette fictive (base vitrine locale, 01/11/2026).
    // Illustration du poste complet (écran, douchette, imprimante, tiroir) puis captures réelles.
    images: [{ src: "/digyo-pos/poste-caisse.webp", contain: true }, "/digyo-pos/caisse-tactile.webp", "/digyo-pos/tableau-de-bord.webp", "/digyo-pos/ventes.webp"],
    audience: "Supérettes, librairies-papeteries, quincailleries, boutiques de cosmétiques, pharmacies et parapharmacies, magasins multi-sites.",
    features: [
      { title: "Caisse rapide", description: "Lecteur de codes-barres, écran tactile, paiements multiples et ticket imprimé." },
      { title: "Caisse hors ligne", description: "Les ventes continuent sans internet et partent seules au retour du réseau." },
      { title: "Stock en temps réel", description: "Chaque vente, réception, perte ou inventaire met le stock à jour." },
      { title: "Achats & fournisseurs", description: "Bons de commande, réceptions et coût moyen d'achat calculé automatiquement." },
      { title: "Plusieurs boutiques", description: "Stock par boutique, transferts entre boutiques, chiffres par point de vente." },
      { title: "Rapports & exports", description: "Ventes, marges, stock, caisse : exports Excel et PDF en un clic." },
    ],
    howItWorks: [
      { title: "Démonstration", description: "Nous vous montrons digyo-pos sur un cas proche du vôtre et établissons votre devis." },
      { title: "Votre catalogue", description: "Import de vos articles depuis Excel, codes-barres et étiquettes, stock de départ." },
      { title: "Installation des caisses", description: "Appli installée sur vos postes, imprimante et tiroir testés, caisses appairées." },
      { title: "Formation & suivi", description: "Caissiers et gérants formés sur place, suivi rapproché les premières semaines." },
    ],
    faq: [
      {
        question: "Que se passe-t-il si internet coupe ?",
        answer:
          "La caisse continue de fonctionner : les caissiers se connectent avec leur code PIN, vendent, appliquent les promotions et encaissent normalement. Les ventes sont gardées sur le poste et envoyées automatiquement au retour du réseau, jusqu'à 72 heures sans connexion.",
      },
      {
        question: "Quel matériel faut-il ?",
        answer:
          "Un ordinateur sous Windows 10 ou 11 (64 bits) par caisse. Lecteur de codes-barres USB, imprimante de tickets 58 ou 80 mm, tiroir-caisse et écran tactile sont pris en charge, mais aucun n'est obligatoire. La gestion se fait depuis n'importe quel navigateur.",
      },
      {
        question: "Mes articles n'ont pas de code-barres, est-ce un problème ?",
        answer:
          "Non. digyo-pos génère des codes internes et imprime les étiquettes (planches A4 ou rouleau). Les articles sans étiquette se vendent aussi en un geste depuis les tuiles de la caisse tactile.",
      },
      {
        question: "Puis-je reprendre mon catalogue existant ?",
        answer:
          "Oui. Vos articles s'importent depuis un fichier Excel ou CSV : désignation, prix, codes-barres, catégories et stock de départ.",
      },
      {
        question: "Quels moyens de paiement sont gérés ?",
        answer:
          "Espèces avec calcul du rendu, Wave, Orange Money, MTN MoMo, Moov Money et carte bancaire, y compris plusieurs moyens sur un même ticket.",
      },
      {
        question: "Combien coûte digyo-pos ?",
        answer:
          "Le prix dépend du nombre de boutiques, de caisses et des modules dont vous avez besoin. Demandez une démonstration : nous établissons un devis adapté à votre commerce.",
      },
      {
        question: "L'appli de caisse est-elle gratuite à télécharger ?",
        answer:
          "Oui, le téléchargement est libre. Pour l'utiliser, il faut un compte digyo-pos : chaque poste est relié à votre entreprise par un code d'appairage créé dans votre espace de gestion.",
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
