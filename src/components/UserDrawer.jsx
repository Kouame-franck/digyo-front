import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import Avatar from "./Avatar";
import { useSession } from "../context/SessionContext";
import { apiFetch } from "../lib/api";
import { sectorOptions } from "../lib/diagnostic";

function formFromUser(user) {
  const isCustomSector = user?.sector && !sectorOptions.includes(user.sector);
  return {
    name: user?.name || "",
    companyName: user?.companyName || "",
    sector: isCustomSector ? "Autre" : user?.sector || "",
    sectorOther: isCustomSector ? user.sector : "",
  };
}

export default function UserDrawer({ open, onClose }) {
  const { user, login, logout } = useSession();
  const [form, setForm] = useState(formFromUser(user));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setForm(formFromUser(user));
    setMessage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.name, user?.companyName, user?.sector, open]);

  if (!user) return null;

  const initial = formFromUser(user);
  const isDirty =
    form.name !== initial.name ||
    form.companyName !== initial.companyName ||
    form.sector !== initial.sector ||
    form.sectorOther !== initial.sectorOther;

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleLogout() {
    logout();
    onClose();
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const data = await apiFetch("/api/auth/me", {
        method: "PATCH",
        body: JSON.stringify({
          name: form.name,
          companyName: form.companyName,
          sector: form.sector,
          sectorOther: form.sectorOther,
        }),
      });
      login(data.user);
      setMessage({ type: "success", text: "Profil mis à jour." });
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

      <div className="mt-7 flex items-center gap-4 rounded-2xl border border-ink/10 bg-canvas p-4">
        <Avatar user={user} className="h-14 w-14 shrink-0 font-display text-lg" />
        <div className="min-w-0">
          <p className="truncate font-display text-base font-bold text-ink">{user.name}</p>
          <p className="truncate text-sm text-ink/55">{user.email}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="mt-7 flex-1 space-y-5 overflow-y-auto">
        <fieldset className="space-y-3">
          <legend className="text-xs font-bold uppercase tracking-widest text-lagune-dark">Identité</legend>
          <label className="block">
            <span className="text-xs font-semibold text-ink/60">Nom complet</span>
            <input
              type="text"
              required
              value={form.name}
              onChange={set("name")}
              className="mt-1.5 w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
            />
          </label>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
            Informations professionnelles
          </legend>
          <label className="block">
            <span className="text-xs font-semibold text-ink/60">Nom de l'entreprise</span>
            <input
              type="text"
              value={form.companyName}
              onChange={set("companyName")}
              placeholder="Ex. Boutique Awa, Cabinet Kouassi…"
              className="mt-1.5 w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-ink/60">Secteur d'activité</span>
            <select
              value={form.sector}
              onChange={set("sector")}
              className="mt-1.5 w-full rounded-xl border border-ink/15 bg-surface px-3.5 py-2 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
            >
              <option value="">Non renseigné</option>
              {sectorOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {form.sector === "Autre" && (
              <input
                type="text"
                value={form.sectorOther}
                onChange={set("sectorOther")}
                placeholder="Précisez votre secteur"
                className="mt-2 w-full rounded-xl border border-ink/15 px-3.5 py-2 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
              />
            )}
          </label>
        </fieldset>

        {message && (
          <p className={`text-xs font-semibold ${message.type === "success" ? "text-lagune-dark" : "text-red-600"}`}>
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={saving || !isDirty}
          className="w-full rounded-full bg-lagune px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark disabled:opacity-50"
        >
          {saving ? "Enregistrement…" : "Enregistrer les modifications"}
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-3 border-t border-ink/10 pt-6">
        <Link
          to="/espace-client"
          onClick={onClose}
          className="w-full rounded-full border border-ink/15 px-5 py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:border-ink/30"
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
