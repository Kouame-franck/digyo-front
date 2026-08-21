import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";
import UserDrawer from "./UserDrawer";
import SideDrawer from "./SideDrawer";
import Avatar from "./Avatar";
import { useAuthModal } from "../context/AuthModalContext";
import { useSession } from "../context/SessionContext";

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

export default function Header() {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  const { openAuthModal } = useAuthModal();
  const { user } = useSession();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function handleAccountClick() {
    if (user) {
      setDrawerOpen(true);
    } else {
      openAuthModal("login");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-canvas/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <NavLink to="/" className="shrink-0">
          <Logo />
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative flex items-center gap-1.5 py-1 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:transition-colors ${
                    isActive
                      ? "font-semibold text-lagune-dark after:bg-lagune-dark"
                      : "text-ink/60 after:bg-transparent hover:text-ink"
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          <button
            type="button"
            onClick={handleAccountClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-ink/5"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink md:hidden"
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
