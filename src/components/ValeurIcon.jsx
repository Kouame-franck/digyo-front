// Une icône trait par argument, en grand format, pour la section « Pourquoi digyo » de
// l'accueil — même esprit graphique que IconeRepere (traits simples, currentColor) mais
// dimensionnée pour porter une carte à elle seule plutôt que servir de puce.
const TRACES_VALEURS = {
  // Connaissance du terrain : une boussole, aiguille pointée — l'ancrage local plutôt qu'une
  // vision plaquée depuis l'extérieur.
  terrain: "M16 4a12 12 0 100 24 12 12 0 000-24z M20 12l-3 7-7 3 3-7z",
  // Sécurité des données : un bouclier avec une coche — la protection, confirmée.
  securite: "M16 4l10 4v8c0 7-4.5 11.5-10 12-5.5-.5-10-5-10-12V8z M11.5 16.5l3 3L21 12.5",
  // Systèmes construits pour durer : trois strates empilées, solides — l'infrastructure qui
  // tient dans le temps plutôt qu'un empilement fragile.
  durabilite: "M6 8h20v6H6z M6 15h20v6H6z M6 22h20v3H6z",
  // Prix adaptés à votre taille : une balance à l'équilibre — un tarif juste, ni trop ni pas
  // assez, quelle que soit la taille de la structure en face.
  prix: "M16 5v22 M9 27h14 M6 9h20 M6 9l-4 8a4 4 0 008 0z M26 9l-4 8a4 4 0 008 0z",
  // On construit ce qu'on recommande : un document (le diagnostic) validé par une coche —
  // la recommandation, vérifiée en pratique plutôt que restée sur papier.
  execution: "M9 4h10l6 6v18H9z M19 4v6h6 M12 19l3 3 7-8",
  // La simplicité avant la sophistication : deux cercles concentriques — l'essentiel, débarrassé
  // du superflu qui l'entoure.
  simplicite: "M16 6a10 10 0 100 20 10 10 0 000-20z M16 12a4 4 0 100 8 4 4 0 000-8z",
  // Un accompagnement qui ne s'arrête pas à la facture : une bulle de discussion — la ligne qui
  // reste ouverte après la livraison.
  accompagnement: "M6 8h20a2 2 0 012 2v10a2 2 0 01-2 2H14l-6 5v-5H6a2 2 0 01-2-2V10a2 2 0 012-2z",
  // Écoute : une oreille stylisée — cadrer les objectifs et contraintes avant toute proposition.
  ecoute: "M13 16a7 7 0 1114 0c0 5-4 5-4 10a3 3 0 01-6 0 M13 17c0-2 1-3 3-3",
  // Diagnostic : une loupe — auditer l'existant pour identifier ce qui compte vraiment.
  diagnostic: "M13 20a7 7 0 100-14 7 7 0 000 14z M22 25l-6.5-6.5",
};

export default function ValeurIcon({ nom, className }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={TRACES_VALEURS[nom]} />
    </svg>
  );
}
