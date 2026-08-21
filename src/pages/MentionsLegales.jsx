import { Link } from "react-router-dom";
import { contactInfo } from "../data/content";
import LegalPlaceholder from "../components/LegalPlaceholder";

export default function MentionsLegales() {
  return (
    <section className="py-20">
      <div className="container-page max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
          Informations légales
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink">
          Mentions légales
        </h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          Conformément à la loi n° 2013-546 du 30 juillet 2013 relative aux transactions
          électroniques en Côte d'Ivoire, les présentes mentions légales informent les
          utilisateurs du site digyo.pro (le « Site ») de l'identité des différents
          intervenants dans le cadre de sa réalisation et de son suivi.
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-ink/80">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">1. Éditeur du site</h2>
            <p className="mt-3">Le Site est édité par&nbsp;:</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                Raison sociale&nbsp;:{" "}
                <LegalPlaceholder>[À COMPLÉTER — dénomination sociale complète, ex. « DIGYO SARL »]</LegalPlaceholder>
              </li>
              <li>Forme juridique&nbsp;: Société à responsabilité limitée (SARL / SUARL)</li>
              <li>
                Capital social&nbsp;:{" "}
                <LegalPlaceholder>[À COMPLÉTER — montant en FCFA]</LegalPlaceholder>
              </li>
              <li>
                Numéro RCCM&nbsp;:{" "}
                <LegalPlaceholder>[À COMPLÉTER — n° RCCM, ex. CI-ABJ-2024-B-XXXXX]</LegalPlaceholder>
              </li>
              <li>
                Numéro de Compte Contribuable (NCC)&nbsp;:{" "}
                <LegalPlaceholder>[À COMPLÉTER — n° NCC]</LegalPlaceholder>
              </li>
              <li>
                Siège social&nbsp;:{" "}
                <LegalPlaceholder>[À COMPLÉTER — adresse complète du siège]</LegalPlaceholder>, {contactInfo.city}
              </li>
              <li>
                Gérant / Directeur de la publication&nbsp;:{" "}
                <LegalPlaceholder>[À COMPLÉTER — nom et prénoms du gérant]</LegalPlaceholder>
              </li>
              <li>
                Téléphone&nbsp;:{" "}
                <LegalPlaceholder>[À COMPLÉTER — numéro de contact public]</LegalPlaceholder>
              </li>
              <li>
                Email&nbsp;:{" "}
                <a href={`mailto:${contactInfo.email}`} className="text-lagune-dark hover:underline">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">2. Hébergement</h2>
            <p className="mt-3">Le Site est hébergé par&nbsp;:</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                Raison sociale&nbsp;:{" "}
                <LegalPlaceholder>[À COMPLÉTER — nom de l'hébergeur, ex. OVH, Contabo, Hostinger]</LegalPlaceholder>
              </li>
              <li>
                Adresse&nbsp;:{" "}
                <LegalPlaceholder>[À COMPLÉTER — adresse de l'hébergeur]</LegalPlaceholder>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">3. Propriété intellectuelle</h2>
            <p className="mt-3">
              L'ensemble des éléments constituant le Site — textes, graphismes, logos, icônes,
              images, mises en page, marques (dont « digyo » et « s-school ») — est la propriété
              exclusive de {" "}
              <LegalPlaceholder>[À COMPLÉTER — raison sociale]</LegalPlaceholder>, sauf mention
              contraire, et est protégé par les dispositions du droit ivoirien et des conventions
              internationales relatives à la propriété intellectuelle applicables en Côte
              d'Ivoire (dont l'Accord de Bangui révisé, instituant l'Organisation Africaine de la
              Propriété Intellectuelle). Toute reproduction, représentation, modification ou
              exploitation, totale ou partielle, sans autorisation écrite préalable, est interdite
              et constitutive de contrefaçon.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">4. Liens hypertextes</h2>
            <p className="mt-3">
              Le Site peut contenir des liens vers des sites tiers (réseaux sociaux, partenaires,
              prestataires de paiement). digyo n'exerce aucun contrôle sur ces sites et décline
              toute responsabilité quant à leur contenu ou à leurs pratiques en matière de
              protection des données.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">5. Données personnelles</h2>
            <p className="mt-3">
              Le traitement des données à caractère personnel collectées via le Site est décrit
              dans notre{" "}
              <Link to="/politique-de-confidentialite" className="text-lagune-dark hover:underline">
                politique de confidentialité
              </Link>
              , conforme à la loi n° 2013-450 du 19 juin 2013 relative à la protection des
              données à caractère personnel en Côte d'Ivoire.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-ink">6. Droit applicable et litiges</h2>
            <p className="mt-3">
              Les présentes mentions légales sont soumises au droit ivoirien. En cas de litige et
              à défaut de résolution amiable, les tribunaux compétents d'Abidjan (Côte d'Ivoire)
              seront seuls compétents.
            </p>
          </div>
        </div>

        <p className="mt-12 text-xs text-ink/40">Dernière mise à jour&nbsp;: 21 août 2026</p>
      </div>
    </section>
  );
}
