// Textes de la landing digyo-pos (/saas/digyo-pos) — mise en page : components/digyopos/DigyoPosLanding.jsx.
// Tout ce qui est annoncé ici existe dans digyo-pos au 01/11/2026 (voir le dossier technique).

export const hero = {
  badge: "Caisse & stock",
  titre: "Encaissez plus vite, gardez la main sur votre stock",
  sousTitre:
    "digyo-pos encaisse vite, suit chaque article de la réception à la vente et vous donne vos chiffres en temps réel, boutique par boutique.",
  rassurance: ["Caisse hors ligne", "Mobile Money intégré", "Plusieurs boutiques", "Installation et formation sur place"],
};

export const problemes = {
  titre: "Le cahier, la calculette et les écarts de stock, c'est fini",
  intro: "Les mêmes soucis reviennent dans la plupart des commerces que nous accompagnons.",
  items: [
    { titre: "Des écarts de stock inexpliqués", texte: "Pertes, casse, erreurs de saisie : sans suivi, on découvre les trous à l'inventaire, trop tard." },
    { titre: "Une caisse qui s'arrête avec internet", texte: "Quand le réseau coupe, la file d'attente s'allonge et les ventes se notent à la main." },
    { titre: "Des chiffres qui arrivent en fin de mois", texte: "Combien a-t-on vendu aujourd'hui, avec quelle marge ? Personne ne le sait sans tout recompter." },
    { titre: "Des remises sans contrôle", texte: "Une remise accordée ici, un prix arrangé là : impossible de savoir qui a fait quoi." },
  ],
};

export const phares = [
  {
    surtitre: "Caisse",
    titre: "Encaisser en quelques secondes",
    texte:
      "Scannez, touchez une tuile ou cherchez un article : le ticket se remplit, les promotions s'appliquent seules et le rendu monnaie se calcule. En mode tactile, tout se fait au doigt.",
    points: [
      "Lecteur de codes-barres, écran tactile et pavé numérique",
      "Espèces, Wave, Orange Money, MTN MoMo, Moov Money, carte, et plusieurs moyens sur un ticket",
      "Ticket 58 ou 80 mm avec code-barres, ouverture du tiroir-caisse",
      "Remises plafonnées par rôle, validées par le code PIN d'un responsable au-delà",
    ],
    image: "/digyo-pos/caisse-tactile.webp",
    alt: "Écran de caisse tactile de digyo-pos",
  },
  {
    surtitre: "Hors ligne",
    titre: "Internet coupe ? La caisse continue",
    texte:
      "L'appli de caisse garde une copie du catalogue sur le poste. Sans réseau, les caissiers se connectent avec leur code PIN et vendent normalement ; les ventes partent seules dès que la connexion revient.",
    points: [
      "Connexion rapide du caissier par code PIN",
      "Ventes, promotions, remises et clients disponibles sans internet",
      "Envoi automatique au retour du réseau, jusqu'à 72 h de coupure",
      "Chaque poste numérote ses tickets : aucun doublon, aucun trou",
    ],
    image: "/digyo-pos/connexion-pin.webp",
    alt: "Connexion du caissier par code PIN dans l'appli digyo-pos",
  },
  {
    surtitre: "Pilotage",
    titre: "Vos chiffres du jour, sans rien recompter",
    texte:
      "Le tableau de bord montre les ventes du jour, la valeur du stock, les meilleures ventes et les articles à réapprovisionner. L'écran Ventes compare chaque période à la précédente.",
    points: [
      "Chiffre d'affaires, panier moyen, articles vendus, par caissier et par moyen de paiement",
      "Alertes de rupture et de stock bas",
      "13 rapports : ventes, marges, stock, achats, caisse",
      "Exports Excel et PDF en un clic",
    ],
    image: "/digyo-pos/tableau-de-bord.webp",
    alt: "Tableau de bord de digyo-pos",
  },
];

export const categories = [
  {
    titre: "Caisse & ventes",
    items: [
      "Vente au scan, à la tuile ou par recherche",
      "Paiements multiples et rendu monnaie",
      "Clôture de caisse avec écart de fond",
      "Annulation et avoir (retour partiel, remboursement)",
      "Promotions automatiques par article, rayon ou période",
      "Clients facultatifs et historique d'achats",
    ],
  },
  {
    titre: "Stock",
    items: [
      "Journal de tous les mouvements",
      "Entrées, sorties, pertes et casse avec motif",
      "Inventaires par comptage, écarts calculés",
      "Seuils d'alerte et réapprovisionnement",
      "Produits périssables : lots, dates, vente du plus ancien d'abord",
      "Emplacements en rayon",
    ],
  },
  {
    titre: "Achats",
    items: [
      "Fiches fournisseurs",
      "Bons de commande en PDF",
      "Réceptions totales ou partielles",
      "Coût moyen pondéré recalculé à chaque réception",
    ],
  },
  {
    titre: "Catalogue",
    items: [
      "Import Excel ou CSV",
      "Codes-barres EAN, ISBN et codes internes",
      "Étiquettes en planche A4 ou sur rouleau",
      "Photos, catégories et champs propres à votre métier",
    ],
  },
  {
    titre: "Plusieurs boutiques",
    items: [
      "Stock et caisses par boutique",
      "Transferts entre boutiques avec bon de transfert",
      "Chiffres boutique par boutique",
      "Accès des employés limité à leurs boutiques",
    ],
  },
  {
    titre: "Équipe & contrôle",
    items: [
      "Rôles et droits personnalisables",
      "Code PIN personnel pour la caisse",
      "Journal d'activité : qui a fait quoi, quand",
      "Accès à la gestion depuis n'importe quel navigateur",
    ],
  },
];

export const materiel = [
  { titre: "Ordinateur Windows", texte: "Windows 10 ou 11, 64 bits. Un par caisse." },
  { titre: "Lecteur de codes-barres", texte: "Tout lecteur USB ou sans fil qui saisit le code puis « Entrée »." },
  { titre: "Imprimante de tickets", texte: "Thermique 58 ou 80 mm, installée dans Windows." },
  { titre: "Tiroir-caisse", texte: "Relié à l'imprimante de tickets ou au réseau." },
];

export const appelFinal = {
  titre: "Voyons digyo-pos sur votre commerce",
  texte: "Une démonstration sur un catalogue proche du vôtre, puis un devis adapté à vos boutiques et à vos caisses.",
};
