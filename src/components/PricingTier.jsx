import { Link } from "react-router-dom";

export default function PricingTier({ tier }) {
  return (
    <div
      className={`flex flex-col rounded-2xl p-7 ${
        tier.featured
          ? "bg-panel text-on-panel shadow-xl shadow-panel/20 ring-1 ring-panel"
          : "bg-surface text-ink ring-1 ring-ink/10"
      }`}
    >
      {tier.featured && (
        <span className="mb-3 inline-flex w-fit items-center rounded-full bg-lagune px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Le plus choisi
        </span>
      )}
      <h4 className="font-display text-lg font-bold">{tier.name}</h4>
      <p className={`mt-1 text-sm ${tier.featured ? "text-on-panel/70" : "text-ink/60"}`}>
        {tier.description}
      </p>
      <div className="mt-5">
        <div className="font-display text-2xl font-bold">{tier.price}</div>
        <div className={`text-xs ${tier.featured ? "text-on-panel/60" : "text-ink/50"}`}>
          {tier.period}
        </div>
      </div>
      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <svg
              viewBox="0 0 20 20"
              className={`mt-0.5 h-4 w-4 shrink-0 ${tier.featured ? "text-lagune-panel" : "text-lagune-dark"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 10l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={tier.featured ? "text-on-panel/90" : "text-ink/75"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <Link
        to="/contact"
        className={`mt-7 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
          tier.featured
            ? "bg-lagune text-white hover:bg-lagune-dark"
            : "bg-ink/5 text-ink hover:bg-ink/10"
        }`}
      >
        Demander un devis
      </Link>
    </div>
  );
}
