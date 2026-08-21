import { useEffect, useState } from "react";
import Modal from "./Modal";
import GoogleSignInButton from "./GoogleSignInButton";
import { useSession } from "../context/SessionContext";
import { apiFetch } from "../lib/api";

const initialLogin = { email: "", password: "" };
const initialSignup = { name: "", email: "", password: "" };

export default function AuthModal({ open, initialTab = "login", onClose }) {
  const { login: startSession } = useSession();
  const [tab, setTab] = useState(initialTab);
  const [login, setLogin] = useState(initialLogin);
  const [signup, setSignup] = useState(initialSignup);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setTab(initialTab);
      setError("");
    }
  }, [open, initialTab]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data =
        tab === "login"
          ? await apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify(login) })
          : await apiFetch("/api/auth/register", { method: "POST", body: JSON.stringify(signup) });
      startSession(data.user);
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleCredential(credential) {
    setError("");
    try {
      const data = await apiFetch("/api/auth/google", {
        method: "POST",
        body: JSON.stringify({ credential }),
      });
      startSession(data.user);
      handleClose();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleClose() {
    setLogin(initialLogin);
    setSignup(initialSignup);
    setError("");
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} labelledBy="auth-modal-title">
      <button
        type="button"
        onClick={handleClose}
        aria-label="Fermer"
        className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
        </svg>
      </button>

      <h2 id="auth-modal-title" className="font-display text-xl font-bold text-ink">
        {tab === "login" ? "Accédez à votre espace" : "Créer votre espace client"}
      </h2>
      <p className="mt-1 text-sm text-ink/60">
        {tab === "login"
          ? "Connectez-vous pour suivre l'avancement de vos projets."
          : "Quelques informations pour créer votre accès."}
      </p>

      <div className="mt-6 inline-flex rounded-full bg-ink/5 p-1">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
            tab === "login" ? "bg-surface text-ink shadow-sm" : "text-ink/60"
          }`}
        >
          Connexion
        </button>
        <button
          type="button"
          onClick={() => setTab("signup")}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
            tab === "signup" ? "bg-surface text-ink shadow-sm" : "text-ink/60"
          }`}
        >
          Créer un compte
        </button>
      </div>

      <div className="mt-6">
        <GoogleSignInButton onCredential={handleGoogleCredential} />
      </div>

      <div className="mt-6 flex items-center gap-3 text-xs font-medium text-ink/40">
        <div className="h-px flex-1 bg-ink/10" />
        ou
        <div className="h-px flex-1 bg-ink/10" />
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      {tab === "login" ? (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-ink">Email</span>
            <input
              type="email"
              required
              value={login.email}
              onChange={(e) => setLogin((f) => ({ ...f, email: e.target.value }))}
              className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
              placeholder="vous@exemple.com"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ink">Mot de passe</span>
            <input
              type="password"
              required
              value={login.password}
              onChange={(e) => setLogin((f) => ({ ...f, password: e.target.value }))}
              className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
              placeholder="••••••••"
            />
          </label>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs font-semibold text-lagune-dark hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark disabled:opacity-60"
          >
            {submitting ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-ink">Nom complet</span>
            <input
              type="text"
              required
              value={signup.name}
              onChange={(e) => setSignup((f) => ({ ...f, name: e.target.value }))}
              className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
              placeholder="Votre nom"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ink">Email</span>
            <input
              type="email"
              required
              value={signup.email}
              onChange={(e) => setSignup((f) => ({ ...f, email: e.target.value }))}
              className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
              placeholder="vous@exemple.com"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ink">Mot de passe</span>
            <input
              type="password"
              required
              minLength={8}
              value={signup.password}
              onChange={(e) => setSignup((f) => ({ ...f, password: e.target.value }))}
              className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-lagune focus:ring-2 focus:ring-lagune/20"
              placeholder="8 caractères minimum"
            />
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-lagune px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagune-dark disabled:opacity-60"
          >
            {submitting ? "Création…" : "Créer mon compte"}
          </button>
        </form>
      )}
    </Modal>
  );
}
