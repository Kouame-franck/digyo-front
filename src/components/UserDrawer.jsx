import { useState } from "react";
import { Link } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import Avatar from "./Avatar";
import EditProfileModal from "./EditProfileModal";
import { useSession } from "../context/SessionContext";

function IconBuilding(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
      <path d="M9 7.5h.01M12 7.5h.01M15 7.5h.01M9 11h.01M12 11h.01M15 11h.01M9 14.5h.01M12 14.5h.01M15 14.5h.01M10 20.5V17h4v3.5" />
    </svg>
  );
}

function IconTag(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11.5 3.5H5.5a2 2 0 00-2 2v6l9.3 9.3a2 2 0 002.83 0l6-6a2 2 0 000-2.83L12.33 3.5h-.83z" />
      <circle cx="8.5" cy="8.5" r="1.3" />
    </svg>
  );
}

function IconPencil(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M13.5 3.5l3 3L6 17H3v-3L13.5 3.5z" />
    </svg>
  );
}

function IconLogout(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 17H4.5A1.5 1.5 0 013 15.5v-11A1.5 1.5 0 014.5 3H8M13.5 14l3.5-4-3.5-4M17 10H8" />
    </svg>
  );
}

// Panneau "Mon compte" -- pure présentation (identité, entreprise, secteur), pas un formulaire
// : l'édition part dans sa propre modale (EditProfileModal), déclenchée par un bouton discret.
export default function UserDrawer({ open, onClose }) {
  const { user, logout } = useSession();
  const [editOpen, setEditOpen] = useState(false);

  if (!user) return null;

  function handleLogout() {
    logout();
    onClose();
  }

  return (
    <>
      <SideDrawer open={open} onClose={onClose} labelledBy="user-drawer-title">
        <div className="flex items-center justify-between">
          <span id="user-drawer-title" className="font-display text-lg font-bold text-ink">
            Mon compte
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-7 flex items-center gap-4 rounded-2xl border border-ink/10 bg-canvas p-4">
          <Avatar user={user} className="h-14 w-14 shrink-0 font-display text-lg" />
          <div className="min-w-0">
            <p className="truncate font-display text-base font-bold text-ink">{user.name}</p>
            <p className="truncate text-sm text-ink/55">{user.email}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2.5">
          <div className="flex items-center gap-3 rounded-xl border border-ink/10 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lagune/10 text-lagune-dark">
              <IconBuilding className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-ink/40">Entreprise</div>
              <div className="truncate text-sm font-medium text-ink">
                {user.companyName || <span className="font-normal text-ink/40">Non renseigné</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-ink/10 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ambre/15 text-ambre-dark">
              <IconTag className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-ink/40">Secteur d'activité</div>
              <div className="truncate text-sm font-medium text-ink">
                {user.sector || <span className="font-normal text-ink/40">Non renseigné</span>}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setEditOpen(true)}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-ink/50 transition-colors hover:text-lagune-dark"
        >
          <IconPencil className="h-3.5 w-3.5" />
          Modifier mes informations
        </button>

        <div className="mt-auto flex flex-col gap-3 border-t border-ink/10 pt-6">
          <Link
            to="/espace-client"
            onClick={onClose}
            className="w-full rounded-full bg-lagune px-5 py-3 text-center text-sm font-semibold text-white shadow-sm shadow-lagune/30 transition-colors hover:bg-lagune-dark"
          >
            Espace client
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            <IconLogout className="h-4 w-4" />
            Se déconnecter
          </button>
        </div>
      </SideDrawer>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </>
  );
}
