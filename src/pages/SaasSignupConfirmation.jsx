import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { apiFetch } from "../lib/api";
import { getSaasBySlug } from "../data/saas";

const MAX_TENTATIVES = 8;

export default function SaasSignupConfirmation() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const product = getSaasBySlug(slug);

  // chargement | paye | attente | echec | inconnu
  const [statut, setStatut] = useState("chargement");
  const [resultat, setResultat] = useState(null);
  const [copie, setCopie] = useState("");

  useEffect(() => {
    if (!token) {
      setStatut("inconnu");
      return;
    }

    let annule = false;
    let tentatives = 0;

    function verifier() {
      apiFetch(`/api/sschool-signup/statut/${token}`)
        .then((data) => {
          if (annule) return;
          setResultat(data);
          if (data.statut === "paye") {
            setStatut("paye");
          } else if (data.statut === "echoue") {
            setStatut("echec");
          } else if (tentatives < MAX_TENTATIVES) {
            tentatives += 1;
            setTimeout(verifier, 3000);
          } else {
            setStatut("attente");
          }
        })
        .catch(() => {
          if (!annule) setStatut("inconnu");
        });
    }
    verifier();

    return () => {
      annule = true;
    };
  }, [token]);

  function copier(valeur, champ) {
    navigator.clipboard?.writeText(valeur).then(() => {
      setCopie(champ);
      setTimeout(() => setCopie(""), 1500);
    });
  }

  return (
    <section className="py-20">
      <div className="container-page max-w-lg">
        <div className="rounded-3xl border border-ink/10 bg-surface p-8 text-center">
          {statut === "chargement" && (
            <>
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-lagune/30 border-t-lagune" />
              <h1 className="mt-5 font-display text-xl font-bold text-ink">Vérification du paiement…</h1>
              <p className="mt-2 text-sm text-ink/60">
                Merci de patienter, nous confirmons votre paiement électronique.
              </p>
            </>
          )}

          {statut === "paye" && (
            <>
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lagune/10 text-lagune-dark">
                <svg viewBox="0 0 20 20" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h1 className="mt-5 font-display text-xl font-bold text-ink">
                Votre établissement est prêt
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {product?.name || "s-school"} a été activé pour{" "}
                <strong>{resultat?.etablissement?.name}</strong>. Voici les identifiants de connexion
                du compte administrateur — ils viennent aussi de vous être envoyés par email.
              </p>

              {resultat?.admin && (
                <div className="mt-6 space-y-2 rounded-2xl border border-ink/10 bg-canvas p-5 text-left">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                        Identifiant
                      </div>
                      <div className="mt-0.5 text-sm font-medium text-ink">{resultat.admin.login}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copier(resultat.admin.login, "login")}
                      className="shrink-0 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink/70 hover:border-ink/30"
                    >
                      {copie === "login" ? "Copié" : "Copier"}
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-ink/10 pt-2">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide text-ink/40">
                        Mot de passe
                      </div>
                      <div className="mt-0.5 text-sm font-medium text-ink">{resultat.admin.password}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copier(resultat.admin.password, "password")}
                      className="shrink-0 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold text-ink/70 hover:border-ink/30"
                    >
                      {copie === "password" ? "Copié" : "Copier"}
                    </button>
                  </div>
                </div>
              )}

              <p className="mt-4 text-xs text-ink/50">
                Pour votre sécurité, changez ce mot de passe dès votre première connexion.
              </p>

              <a
                href="https://sschool.digyo.pro"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
              >
                Me connecter à s-school
              </a>
            </>
          )}

          {statut === "attente" && (
            <>
              <h1 className="mt-2 font-display text-xl font-bold text-ink">Paiement en attente</h1>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                La confirmation prend plus de temps que prévu. Votre établissement sera créé
                automatiquement dès réception du paiement — actualisez cette page dans quelques instants.
              </p>
            </>
          )}

          {statut === "echec" && (
            <>
              <h1 className="mt-2 font-display text-xl font-bold text-ink">Paiement non abouti</h1>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Le paiement n'a pas pu être confirmé. Aucun établissement n'a été créé. Vous pouvez
                réessayer votre abonnement.
              </p>
              {product && (
                <Link
                  to={`/saas/${product.slug}#tarifs`}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
                >
                  Réessayer
                </Link>
              )}
            </>
          )}

          {statut === "inconnu" && (
            <>
              <h1 className="mt-2 font-display text-xl font-bold text-ink">Statut indisponible</h1>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Nous n'avons pas pu vérifier automatiquement ce paiement. Contactez-nous si le
                prélèvement a bien eu lieu de votre côté.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
              >
                Nous contacter
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
