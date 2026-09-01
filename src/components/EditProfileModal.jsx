import { useEffect, useState } from "react";
import Modal from "./Modal";
import { apiFetch } from "../lib/api";
import { useSession } from "../context/SessionContext";
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

// Formulaire d'édition du profil de compte (nom, entreprise, secteur) -- séparé du panneau
// "Mon compte" (UserDrawer), qui n'affiche ces informations qu'en lecture pour rester une
// présentation, pas un formulaire ouvert en permanence.
export default function EditProfileModal({ open, onClose }) {
  const { user, login } = useSession();
  const [form, setForm] = useState(formFromUser(user));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(formFromUser(user));
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
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
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="edit-profile-title">
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
        </svg>
      </button>

      <h2 id="edit-profile-title" className="font-display text-xl font-bold text-ink">
        Modifier mes informations
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-ink">Nom complet</span>
          <input
            type="text"
            required
            value={form.name}
            onChange={set("name")}
            className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Nom de l'entreprise</span>
          <input
            type="text"
            value={form.companyName}
            onChange={set("companyName")}
            placeholder="Ex. Boutique Awa, Cabinet Kouassi…"
            className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Secteur d'activité</span>
          <select
            value={form.sector}
            onChange={set("sector")}
            className="mt-2 w-full rounded-xl border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
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
              className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
            />
          )}
        </label>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark disabled:opacity-60"
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </form>
    </Modal>
  );
}
