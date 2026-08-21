import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import Avatar from "./Avatar";
import { useSession } from "../context/SessionContext";
import { apiFetch } from "../lib/api";

export default function UserDrawer({ open, onClose }) {
  const { user, login, logout } = useSession();
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setName(user?.name || "");
    setMessage(null);
  }, [user?.name, open]);

  if (!user) return null;

  function handleLogout() {
    logout();
    onClose();
  }

  async function handleSaveName(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const data = await apiFetch("/api/auth/me", { method: "PATCH", body: JSON.stringify({ name }) });
      login(data.user);
      setMessage({ type: "success", text: "Nom mis à jour." });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  return (
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

      <div className="mt-8 flex flex-col items-center text-center">
        <Avatar user={user} className="h-20 w-20 font-display text-2xl" />
        <p className="mt-3 text-sm text-ink/60">{user.email}</p>
      </div>

      <form onSubmit={handleSaveName} className="mt-6 space-y-3">
        <label className="block text-left">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink/50">Nom complet</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
          />
        </label>
        {message && (
          <p className={`text-xs font-semibold ${message.type === "success" ? "text-lagune-dark" : "text-red-600"}`}>
            {message.text}
          </p>
        )}
        <button
          type="submit"
          disabled={saving || name === user.name}
          className="rounded-full bg-ink/5 px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-ink/10 disabled:opacity-50"
        >
          {saving ? "Enregistrement…" : "Enregistrer le nom"}
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          to="/espace-client"
          onClick={onClose}
          className="w-full rounded-full bg-lagune px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-lagune-dark"
        >
          Espace client
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-full bg-ink/5 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/10"
        >
          Se déconnecter
        </button>
      </div>

    </SideDrawer>
  );
}
