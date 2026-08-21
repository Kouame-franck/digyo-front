import { Link } from "react-router-dom";
import Logo from "./Logo";
import { contactInfo } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-panel text-on-panel">
      <div className="container-page grid gap-10 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-on-panel/70">
            Cabinet d'accompagnement digital — transformation, création web
            &amp; app, formation. Une exécution locale, une ambition
            internationale.
          </p>
        </div>

        <div>
          <h5 className="font-display text-sm font-bold uppercase tracking-wide text-on-panel/50">
            Navigation
          </h5>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/" className="text-on-panel/80 hover:text-lagune">Accueil</Link></li>
            <li><Link to="/services" className="text-on-panel/80 hover:text-lagune">Services</Link></li>
            <li><Link to="/saas" className="text-on-panel/80 hover:text-lagune">SaaS</Link></li>
            <li><Link to="/blog" className="text-on-panel/80 hover:text-lagune">Blog</Link></li>
            <li><Link to="/a-propos" className="text-on-panel/80 hover:text-lagune">À propos</Link></li>
            <li><Link to="/espace-client" className="text-on-panel/80 hover:text-lagune">Espace client</Link></li>
            <li><Link to="/contact" className="text-on-panel/80 hover:text-lagune">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-display text-sm font-bold uppercase tracking-wide text-on-panel/50">
            Contact
          </h5>
          <ul className="mt-4 space-y-2.5 text-sm text-on-panel/80">
            <li>{contactInfo.city}</li>
            <li>
              <a href={`mailto:${contactInfo.email}`} className="hover:text-lagune">
                {contactInfo.email}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex gap-4">
            {contactInfo.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs font-semibold text-on-panel/60 hover:text-lagune"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-on-panel/10 py-6">
        <div className="container-page flex flex-col gap-3 text-xs text-on-panel/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} digyo. Tous droits réservés.</span>
          <div className="flex gap-5">
            <Link to="/mentions-legales" className="hover:text-lagune">Mentions légales</Link>
            <Link to="/politique-de-confidentialite" className="hover:text-lagune">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
