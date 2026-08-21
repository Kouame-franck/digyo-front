import { useState } from "react";
import { contactInfo, pillars } from "../data/content";

const initialForm = { name: "", email: "", service: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Une erreur est survenue, réessayez dans un instant.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="py-20">
      <div className="container-page grid gap-14 md:grid-cols-[1fr_1.2fr]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">
            Contact
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink">
            Parlons de votre projet.
          </h1>
          <p className="mt-5 leading-relaxed text-ink/70">
            Décrivez-nous votre besoin — on revient vers vous sous 48h avec
            un premier retour concret.
          </p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-ink/40">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-display text-lg font-bold text-ink hover:text-lagune-dark"
                >
                  {contactInfo.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-ink/40">
                Localisation
              </dt>
              <dd className="mt-1 font-display text-lg font-bold text-ink">
                {contactInfo.city}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-ink/40">
                Réseaux
              </dt>
              <dd className="mt-2 flex gap-4">
                {contactInfo.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="text-sm font-semibold text-ink/70 hover:text-lagune-dark"
                  >
                    {s.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-3xl border border-ink/10 bg-surface p-8 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-start gap-3 py-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lagune/10 text-lagune-dark">
                <svg viewBox="0 0 20 20" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h2 className="font-display text-xl font-bold text-ink">
                Message bien reçu.
              </h2>
              <p className="text-ink/70">
                Merci {form.name || ""}, on revient vers vous très vite à{" "}
                {form.email || "votre adresse"}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Nom complet</span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                    placeholder="Votre nom"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-ink">Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                    placeholder="vous@exemple.com"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-ink">Service concerné</span>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                >
                  <option value="">Sélectionner…</option>
                  {pillars.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                  <option value="autre">Autre / je ne sais pas encore</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-ink">Votre projet</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="mt-2 w-full resize-none rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
                  placeholder="Décrivez votre besoin en quelques lignes…"
                />
              </label>

              {error && (
                <p className="text-sm font-semibold text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Envoi…" : "Envoyer le message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
