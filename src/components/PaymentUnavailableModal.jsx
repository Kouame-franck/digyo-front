import Modal from "./Modal";

// Le paiement en ligne (CinetPay / Money Fusion) est en attente de validation côté prestataire --
// plutôt que de laisser un visiteur cliquer sur "Payer" et tomber sur une erreur technique ou,
// pire, un paiement qui échoue silencieusement, on l'arrête ici avec une explication claire et
// on le redirige vers un contact humain pour finaliser à la main. Retirer ce blocage une fois le
// paiement en ligne validé (voir PAYMENT_LIVE dans SubscribeModal.jsx).
// `onClose` referme uniquement cet avertissement (bouton "Retour", reste sur l'étape paiement) ;
// `onContact` est distinct pour que le parent puisse aussi fermer SubscribeModal et naviguer.
export default function PaymentUnavailableModal({ open, onClose, onContact }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="payment-unavailable-title" size="md">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ambre/15 text-ambre-dark">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path
              d="M12 8v5M12 16h.01M10.29 3.86 1.82 18a1.5 1.5 0 0 0 1.29 2.25h17.78A1.5 1.5 0 0 0 22.18 18L13.71 3.86a1.5 1.5 0 0 0-2.42 0Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <h2 id="payment-unavailable-title" className="mt-4 font-display text-lg font-bold text-ink">
          Paiement en ligne momentanément indisponible
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">
          Il s'agit d'une interruption temporaire, déjà en cours de résolution. En attendant,
          contactez-nous directement : nous finalisons votre abonnement ensemble, sans aucune
          démarche supplémentaire de votre part une fois le paiement confirmé.
        </p>

        <button
          type="button"
          onClick={onContact}
          className="mt-6 w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
        >
          Contacter l'équipe digyo
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 text-sm font-medium text-ink/50 transition-colors hover:text-ink/80"
        >
          Retour
        </button>
      </div>
    </Modal>
  );
}
