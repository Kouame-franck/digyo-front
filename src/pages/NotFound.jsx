import Button from "../components/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <span className="font-display text-7xl font-bold text-lagune/20">404</span>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">
        Cette page n'existe pas (encore).
      </h1>
      <p className="mt-2 max-w-sm text-ink/60">
        Le lien que vous avez suivi est peut-être incorrect ou la page a été déplacée.
      </p>
      <Button to="/" variant="accent" className="mt-8">
        Retour à l'accueil
      </Button>
    </section>
  );
}
