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
