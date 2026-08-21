import { Link } from "react-router-dom";
import { contactInfo } from "../data/content";
import LegalPlaceholder from "../components/LegalPlaceholder";

export default function PolitiqueConfidentialite() {
  return (
    <section className="py-20">
      <div className="container-page max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
          Confidentialité
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink">
          Politique de confidentialité
        </h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          digyo attache une importance particulière à la protection de vos données à caractère
          personnel. Cette politique explique quelles données nous collectons sur digyo.pro (le
          « Site »), pourquoi, pendant combien de temps, et comment vous pouvez exercer vos
          droits — conformément à la loi ivoirienne n° 2013-450 du 19 juin 2013 relative à la
          protection des données à caractère personnel.
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-ink/80">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">1. Responsable du traitement</h2>
            <p className="mt-3">
              Le responsable du traitement des données collectées sur le Site est&nbsp;:
              <br />
              <LegalPlaceholder>[À COMPLÉTER — raison sociale]</LegalPlaceholder>, société de
              droit ivoirien immatriculée sous le n° RCCM{" "}
              <LegalPlaceholder>[À COMPLÉTER]</LegalPlaceholder>, dont le siège social est situé{" "}
              <LegalPlaceholder>[À COMPLÉTER — adresse du siège]</LegalPlaceholder>, {contactInfo.city}
              . Voir aussi nos{" "}
              <Link to="/mentions-legales" className="text-lagune-dark hover:underline">
                mentions légales
              </Link>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">2. Données que nous collectons</h2>
            <p className="mt-3">Selon votre usage du Site, nous collectons&nbsp;:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold text-ink">Formulaire de contact</span> — nom,
                email, service concerné, message.
              </li>
              <li>
                <span className="font-semibold text-ink">Espace client / création de compte</span>{" "}
                — email et informations de profil, y compris via une connexion Google (nom, email,
                photo de profil transmis par Google Sign-In si vous choisissez cette option).
              </li>
              <li>
                <span className="font-semibold text-ink">Abonnement à un produit SaaS (ex. s-school)</span>{" "}
                — nom, email, téléphone, et données de paiement traitées directement par notre
                prestataire de paiement KadevPay (digyo ne stocke aucune donnée de carte ou de
                mobile money).
              </li>
              <li>
                <span className="font-semibold text-ink">Données techniques de session</span> —
                cookie d'authentification nécessaire au fonctionnement de l'espace client (voir
                section 5, « Cookies »).
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              3. Finalités et bases légales du traitement
            </h2>
            <table className="mt-3 w-full border-collapse overflow-hidden rounded-xl border border-ink/10 text-left text-xs">
              <thead>
                <tr className="bg-surface">
                  <th className="border-b border-ink/10 px-3 py-2 font-semibold text-ink">Finalité</th>
                  <th className="border-b border-ink/10 px-3 py-2 font-semibold text-ink">Base légale</th>
                </tr>
              </thead>
              <tbody className="text-ink/75">
                <tr>
                  <td className="border-b border-ink/10 px-3 py-2">Répondre à une demande de contact</td>
                  <td className="border-b border-ink/10 px-3 py-2">Consentement</td>
                </tr>
                <tr>
                  <td className="border-b border-ink/10 px-3 py-2">Gérer votre compte / espace client</td>
                  <td className="border-b border-ink/10 px-3 py-2">Exécution du contrat</td>
                </tr>
                <tr>
                  <td className="border-b border-ink/10 px-3 py-2">Traiter un abonnement et son paiement</td>
                  <td className="border-b border-ink/10 px-3 py-2">Exécution du contrat</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Sécuriser le Site et prévenir la fraude</td>
                  <td className="px-3 py-2">Intérêt légitime</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">4. Destinataires de vos données</h2>
            <p className="mt-3">
              Vos données sont accessibles à l'équipe digyo habilitée, ainsi qu'à nos
              sous-traitants techniques, dans la stricte limite de leurs missions&nbsp;:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>
                notre hébergeur —{" "}
                <LegalPlaceholder>[À COMPLÉTER — nom de l'hébergeur]</LegalPlaceholder> ;
              </li>
              <li>Google LLC, pour l'authentification via Google Sign-In ;</li>
              <li>KadevPay, pour le traitement des paiements en ligne.</li>
            </ul>
            <p className="mt-3">
              Nous ne vendons ni ne louons vos données personnelles à des tiers à des fins
              commerciales ou publicitaires.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">5. Cookies</h2>
            <p className="mt-3">
              Le Site utilise uniquement des cookies strictement nécessaires à son
              fonctionnement, dispensés de consentement préalable&nbsp;:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              <li>
                <code className="rounded bg-surface px-1.5 py-0.5 text-xs">digyo_session</code> —
                cookie d'authentification permettant de vous maintenir connecté à votre espace
                client ;
              </li>
              <li>
                cookies déposés par Google lors d'une connexion via « Se connecter avec Google »,
                à votre initiative ;
              </li>
              <li>
                cookies déposés par KadevPay pendant le processus de paiement, à votre
                initiative.
              </li>
            </ul>
            <p className="mt-3">
              Le Site ne dépose aujourd'hui aucun cookie de mesure d'audience publicitaire ni de
              traçage à des fins de profilage. Si cela venait à changer (par exemple avec l'ajout
              d'un outil d'analyse d'audience), un bandeau de recueil de votre consentement serait
              mis en place avant tout dépôt de ces cookies non essentiels, et cette politique
              serait mise à jour en conséquence.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">6. Transferts hors de Côte d'Ivoire</h2>
            <p className="mt-3">
              Certains de nos prestataires (Google, KadevPay) peuvent traiter des données en
              dehors de la Côte d'Ivoire. Dans ce cas, nous nous assurons que ces transferts
              s'appuient sur des garanties appropriées (clauses contractuelles, certification du
              prestataire) offrant un niveau de protection adéquat à vos données.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">7. Durée de conservation</h2>
            <p className="mt-3">
              Vos données sont conservées pendant la durée nécessaire aux finalités décrites
              ci-dessus, et au maximum&nbsp;: 3 ans après le dernier contact pour les demandes
              commerciales, la durée du compte augmentée des délais légaux de conservation
              comptable et fiscale pour les données liées à un abonnement ou un paiement.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">8. Sécurité</h2>
            <p className="mt-3">
              Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables
              (chiffrement des mots de passe, cookie de session sécurisé, accès restreint aux
              données) pour protéger vos données contre l'accès non autorisé, la perte ou
              l'altération.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">9. Vos droits</h2>
            <p className="mt-3">
              Conformément à la loi n° 2013-450, vous disposez d'un droit d'accès, de
              rectification, d'effacement et d'opposition sur vos données personnelles. Pour
              exercer ces droits, contactez-nous à{" "}
              <a href={`mailto:${contactInfo.email}`} className="text-lagune-dark hover:underline">
                {contactInfo.email}
              </a>{" "}
              en précisant votre demande ; nous y répondons dans un délai maximal d'un mois.
            </p>
            <p className="mt-3">
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une
              réclamation auprès de l'autorité ivoirienne de régulation compétente en matière de
              protection des données personnelles, l'ARTCI (Autorité de Régulation des
              Télécommunications/TIC de Côte d'Ivoire) —{" "}
              <span className="text-ink/60">www.artci.ci</span>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">10. Mineurs</h2>
            <p className="mt-3">
              Le Site ne s'adresse pas aux personnes mineures. Nous ne collectons pas
              sciemment de données concernant des mineurs sans le consentement de leur
              représentant légal.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">11. Modifications</h2>
            <p className="mt-3">
              Cette politique peut être mise à jour pour refléter l'évolution du Site ou de la
              réglementation. La date de dernière mise à jour est indiquée en bas de page ; en
              cas de changement substantiel, nous vous en informerons par un moyen approprié.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">12. Nous contacter</h2>
            <p className="mt-3">
              Pour toute question relative à cette politique ou à vos données personnelles&nbsp;:{" "}
              <a href={`mailto:${contactInfo.email}`} className="text-lagune-dark hover:underline">
                {contactInfo.email}
              </a>
              {" "}— <LegalPlaceholder>[À COMPLÉTER — contact dédié DPO, si désigné]</LegalPlaceholder>.
            </p>
          </div>
        </div>

        <p className="mt-12 text-xs text-ink/40">Dernière mise à jour&nbsp;: 21 août 2026</p>
      </div>
    </section>
  );
}
