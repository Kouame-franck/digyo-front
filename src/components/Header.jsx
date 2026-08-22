import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";
import UserDrawer from "./UserDrawer";
import SideDrawer from "./SideDrawer";
import Avatar from "./Avatar";
import { useAuthModal } from "../context/AuthModalContext";
import { useSession } from "../context/SessionContext";
import { ServicesMegaMenu, SaasMegaMenu, BlogMegaMenu } from "./HeaderMegaMenus";

// Icônes en ligne, même style que les pictos déjà à main levée dans ce fichier (burger,
// compte) — pas de dépendance d'icônes dans ce projet, inutile d'en ajouter une pour 7 pictos.
function IconAccueil(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 10.5L12 4l8 6.5" />
      <path d="M6 9.5V20h5v-5h2v5h5V9.5" />
    </svg>
  );
}
function IconServices(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 005.4-5.4l-2.6 2.6-2-2 2.6-2.6z" />
    </svg>
  );
}
function IconSaas(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function IconBlog(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 3.5h7l4 4V20a1 1 0 01-1 1H7a1 1 0 01-1-1V4.5a1 1 0 011-1z" />
      <path d="M9 12h6M9 15.5h6M9 8.5h3" />
    </svg>
  );
}
function IconAPropos(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.8v.1" />
    </svg>
  );
}
function IconEspaceClient(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
    </svg>
  );
}
function IconContact(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7l7.5 6 7.5-6" />
    </svg>
  );
}

const links = [
  { to: "/", label: "Accueil", icon: IconAccueil },
  { to: "/services", label: "Services", icon: IconServices },
  { to: "/saas", label: "SaaS", icon: IconSaas },
  { to: "/blog", label: "Blog", icon: IconBlog },
  { to: "/a-propos", label: "À propos", icon: IconAPropos },
  { to: "/espace-client", label: "Espace client", icon: IconEspaceClient },
  { to: "/contact", label: "Contact", icon: IconContact },
];

// Nav desktop volontairement plus courte que la liste complète ci-dessus (utilisée telle
// quelle dans le menu mobile) : "Espace client" reste joignable via l'icône compte (elle ouvre
// un menu qui y renvoie, voir UserDrawer), et "Contact" fait déjà le travail du bouton
// "Démarrer un projet" juste à côté -- pas besoin des deux.
const navLinks = links.filter((l) => l.to !== "/espace-client" && l.to !== "/contact");

// Pages qui ouvrent sur un hero plein cadre en photo sombre (voir Home.jsx, About.jsx) : sur
// ces pages seulement, le header démarre transparent par-dessus la photo puis devient une barre
// pleine au scroll. Ailleurs, le hero est clair -- un header transparent y serait illisible.
const HERO_ROUTES = ["/", "/a-propos"];

// Les liens qui ouvrent un mega-menu au survol -- panneau toujours en bg-surface (carte
// opaque), quel que soit l'état transparent/plein du header lui-même.
const MEGA_MENUS = {
  "/services": ServicesMegaMenu,
  "/saas": SaasMegaMenu,
  "/blog": BlogMegaMenu,
};

function navLinkClasses({ isActive, transparent }) {
  if (isActive) {
    return transparent
      ? "bg-on-panel/15 font-semibold text-on-panel"
      : "bg-lagune/10 font-semibold text-lagune-dark";
  }
  return transparent
    ? "text-on-panel/75 hover:bg-on-panel/10 hover:text-on-panel"
    : "text-ink/60 hover:bg-ink/5 hover:text-ink";
}

// Enveloppe un lien de nav avec un mega-menu. Ouverture/fermeture pilotées en JS plutôt qu'en
// pur CSS (`group-hover`) : un enchaînement de survols imbriqués est trop fragile dès que le
// panneau est positionné en `fixed` loin de son déclencheur dans la mise en page -- la moindre
// perte de survol d'une fraction de seconde le referme avant qu'on ait pu l'atteindre pour
// cliquer dedans. Un petit délai à la fermeture (`closeSoon`) laisse le temps à la souris de
// passer du lien au panneau.
function NavMenuItem({ to, label, transparent, isActive, Panel }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const { pathname } = useLocation();

  // Ferme le panneau après un clic sur un de ses liens, même si la souris n'a pas bougé.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function openNow() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  }

  function closeSoon() {
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  }

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onFocus={openNow}
      onBlur={closeSoon}
    >
      <NavLink
        to={to}
        aria-expanded={open}
        className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${navLinkClasses({ isActive, transparent })}`}
      >
        {label}
        <svg
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 opacity-60 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 7.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </NavLink>

      <div
        className={`fixed inset-x-0 top-16 z-40 flex justify-center transition-opacity duration-150 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="w-[min(94vw,60rem)] pt-3">
          <div className="overflow-hidden rounded-xl border border-ink/10 bg-surface shadow-xl shadow-ink/10">
            <Panel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { openAuthModal } = useAuthModal();
  const { user } = useSession();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleAccountClick() {
    if (user) {
      setDrawerOpen(true);
    } else {
      openAuthModal("login");
    }
  }

  const transparent = HERO_ROUTES.includes(pathname) && !scrolled;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-ink/10 bg-canvas/90 shadow-sm shadow-ink/5 backdrop-blur"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <NavLink to="/" className="shrink-0">
          <Logo variant={transparent ? "light" : "adaptive"} />
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Panel = MEGA_MENUS[link.to];
            const isActive = link.to === "/" ? pathname === "/" : pathname.startsWith(link.to);

            if (Panel) {
              return (
                <NavMenuItem
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  transparent={transparent}
                  isActive={isActive}
                  Panel={Panel}
                />
              );
            }

            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${navLinkClasses({ isActive, transparent })}`}
              >
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle className={transparent ? "!text-on-panel hover:!bg-on-panel/10" : ""} />

          <button
            type="button"
            onClick={handleAccountClick}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
              transparent ? "text-on-panel hover:bg-on-panel/10" : "text-ink hover:bg-ink/5"
            }`}
            aria-label={user ? "Mon compte" : "Se connecter"}
            title={user ? "Mon compte" : "Se connecter"}
          >
            {user ? (
              <Avatar user={user} className="h-7 w-7 text-xs" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
              </svg>
            )}
          </button>

          <div className="hidden md:block">
            <Button to="/contact" variant="accent" className="!px-5 !py-2.5">
              Démarrer un projet
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg md:hidden ${
              transparent ? "text-on-panel" : "text-ink"
            }`}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <SideDrawer
        open={open}
        onClose={() => setOpen(false)}
        labelledBy="mobile-menu-title"
        widthClassName="w-[80%] max-w-sm"
      >
        <div className="flex items-center justify-between">
          <span id="mobile-menu-title" className="font-display text-lg font-bold text-ink">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors ${
                    isActive ? "bg-lagune/10 text-lagune-dark" : "text-ink/75 hover:bg-ink/5"
                  }`
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-ink/10 pt-5">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              handleAccountClick();
            }}
            className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold text-ink/75 transition-colors hover:bg-ink/5"
          >
            <IconEspaceClient className="h-5 w-5 shrink-0" />
            {user ? "Mon compte" : "Se connecter"}
          </button>
          <Button to="/contact" variant="accent" className="w-full" onClick={() => setOpen(false)}>
            Démarrer un projet
          </Button>
        </div>
      </SideDrawer>

      <UserDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
