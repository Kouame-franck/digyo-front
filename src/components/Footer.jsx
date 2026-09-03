import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa6";
import Logo from "./Logo";
import { contactInfo } from "../data/content";

const SOCIAL_ICONS = {
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  TikTok: FaTiktok,
};

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
            <li><Link to="/" className="text-on-panel/80 hover:text-lagune-panel">Accueil</Link></li>
            <li><Link to="/services" className="text-on-panel/80 hover:text-lagune-panel">Services</Link></li>
            <li><Link to="/saas" className="text-on-panel/80 hover:text-lagune-panel">SaaS</Link></li>
            <li><Link to="/blog" className="text-on-panel/80 hover:text-lagune-panel">Blog</Link></li>
            <li><Link to="/a-propos" className="text-on-panel/80 hover:text-lagune-panel">À propos</Link></li>
            <li><Link to="/espace-client" className="text-on-panel/80 hover:text-lagune-panel">Espace client</Link></li>
            <li><Link to="/contact" className="text-on-panel/80 hover:text-lagune-panel">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-display text-sm font-bold uppercase tracking-wide text-on-panel/50">
            Contact
          </h5>
          <ul className="mt-4 space-y-2.5 text-sm text-on-panel/80">
            <li>{contactInfo.city}</li>
            <li>
              <a href={`mailto:${contactInfo.email}`} className="hover:text-lagune-panel">
                {contactInfo.email}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            {contactInfo.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.label];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-on-panel/10 text-on-panel/70 transition-colors hover:bg-lagune-panel hover:text-panel"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-on-panel/10 py-6">
        <div className="container-page flex flex-col gap-3 text-xs text-on-panel/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} digyo. Tous droits réservés.</span>
          <div className="flex gap-5">
            <Link to="/mentions-legales" className="hover:text-lagune-panel">Mentions légales</Link>
            <Link to="/politique-de-confidentialite" className="hover:text-lagune-panel">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
