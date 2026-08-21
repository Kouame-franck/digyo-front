import { useState } from "react";
import Modal from "./Modal";
import { apiFetch } from "../lib/api";
import { pillarOptions } from "../lib/diagnostic";

const emptyForm = { title: "", pillar: "", description: "", budgetRange: "", deadline: "" };

export default function ProjectModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await apiFetch("/api/projects", { method: "POST", body: JSON.stringify(form) });
      onCreated(data.project);
      setForm(emptyForm);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="project-modal-title">
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

      <h2 id="project-modal-title" className="font-display text-xl font-bold text-ink">
        Soumettre un projet
      </h2>
      <p className="mt-1 text-sm text-ink/60">Décrivez votre besoin, notre équipe revient vers vous rapidement.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-ink">Titre du projet</span>
          <input
            type="text"
            required
            value={form.title}
            onChange={set("title")}
            placeholder="Ex. Refonte du site vitrine"
            className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-ink">Catégorie</span>
          <select
            value={form.pillar}
            onChange={set("pillar")}
            className="mt-2 w-full rounded-xl border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
          >
            <option value="">Sélectionner…</option>
            {pillarOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-ink">Description</span>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={set("description")}
            placeholder="Contexte, objectifs, contraintes…"
            className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-ink">Budget indicatif (optionnel)</span>
            <input
              type="text"
              value={form.budgetRange}
              onChange={set("budgetRange")}
              placeholder="Ex. 500 000 FCFA"
              className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ink">Échéance souhaitée (optionnel)</span>
            <input
              type="text"
              value={form.deadline}
              onChange={set("deadline")}
              placeholder="Ex. Sous 2 mois"
              className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
            />
          </label>
        </div>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark disabled:opacity-60"
        >
          {submitting ? "Envoi…" : "Soumettre le projet"}
        </button>
      </form>
    </Modal>
  );
}
