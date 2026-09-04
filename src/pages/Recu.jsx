import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../lib/api";

function formatFCFA(montant) {
  return montant != null ? `${Number(montant).toLocaleString("fr-FR")} FCFA` : "—";
}

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

const MODE_LABELS = {
  mobile_money: "Mobile Money",
  virement: "Virement",
  cheque: "Chèque",
  especes: "Espèces",
  carte: "Carte bancaire",
};

// Reçu de paiement, ouvert depuis le lien envoyé par email (inscription) ou depuis l'écran de
// confirmation -- accessible sans connexion, le recuToken (aléatoire, non énumérable) suffit.
export default function Recu() {
  const { recuToken } = useParams();
  const [recu, setRecu] = useState(null);
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    let annule = false;
    apiFetch(`/api/sschool-signup/recu/${encodeURIComponent(recuToken)}`)
      .then((data) => !annule && setRecu(data))
      .catch((err) => !annule && setErreur(err.message))
      .finally(() => !annule && setChargement(false));
    return () => {
      annule = true;
    };
  }, [recuToken]);

  return (
    <section className="py-20 print:py-6">
      <div className="container-page max-w-lg">
        {chargement && (
          <div className="rounded-3xl border border-ink/10 bg-surface p-8 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-lagune/30 border-t-lagune" />
          </div>
        )}

        {!chargement && erreur && (
          <div className="rounded-3xl border border-ink/10 bg-surface p-8 text-center">
            <h1 className="font-display text-lg font-bold text-ink">Reçu introuvable</h1>
            <p className="mt-2 text-sm text-ink/60">{erreur}</p>
          </div>
        )}

        {!chargement && recu && (
          <div className="rounded-3xl border border-ink/10 bg-surface p-8 print:border-0 print:p-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-lagune-dark">digyo</div>
                <h1 className="mt-1 font-display text-xl font-bold text-ink">Reçu de paiement</h1>
              </div>
              <span className="shrink-0 rounded-full bg-lagune/10 px-3 py-1 text-xs font-semibold text-lagune-dark">
                Payé
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between border-y border-ink/10 py-3 text-sm">
              <span className="text-ink/50">Référence</span>
              <span className="font-mono font-semibold text-ink">{recu.id}</span>
            </div>

            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink/50">Date</dt>
                <dd className="font-medium text-ink">{formatDate(recu.date)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink/50">Établissement</dt>
                <dd className="font-medium text-ink">{recu.etablissement}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink/50">Formule</dt>
                <dd className="font-medium text-ink">{recu.formule}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink/50">Mode de paiement</dt>
                <dd className="font-medium text-ink">{MODE_LABELS[recu.modePaiement] || recu.modePaiement}</dd>
              </div>
              {recu.transactionId && (
                <div className="flex items-center justify-between">
                  <dt className="text-ink/50">Transaction</dt>
                  <dd className="font-mono text-xs text-ink/70">{recu.transactionId}</dd>
                </div>
              )}
            </dl>

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-canvas p-4">
              <span className="text-sm font-semibold text-ink">Montant réglé</span>
              <span className="font-display text-lg font-bold text-lagune-dark">
                {formatFCFA(recu.montantVerse)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="mt-6 w-full rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/30 print:hidden"
            >
              Imprimer / enregistrer en PDF
            </button>

            <p className="mt-6 text-center text-xs text-ink/40">
              digyo — transformation digitale, Abidjan, Côte d'Ivoire.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
