import { Link } from "react-router-dom";
import { ACCENTS, ACCENT_DEFAUT } from "../data/pillarAccents";
import { pillarPhotos } from "../data/content";

export default function PillarCard({ pillar, index }) {
  const accent = ACCENTS[pillar.slug] ?? ACCENT_DEFAUT;
  const photo = pillarPhotos[pillar.slug];

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl bg-surface p-3 shadow-sm shadow-ink/5 ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
      <div className={`relative h-36 overflow-hidden rounded-2xl ${accent.fond}`}>
        <span className={`absolute left-4 top-4 z-10 font-display text-xs font-bold ${accent.badge} flex h-7 w-7 items-center justify-center rounded-full`}>
          {index + 1}
        </span>
        <img
          src={photo?.src}
          alt={photo?.alt ?? pillar.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-6">
        <h3 className="font-display text-xl font-bold text-ink">{pillar.name}</h3>
        <p className={`mt-2 text-sm font-medium ${accent.trait}`}>{pillar.tagline}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/70">
          {pillar.description}
        </p>
        <Link
          to={`/services#${pillar.slug}`}
          className={`mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-ink/5 px-4 py-2 text-sm font-semibold text-ink transition-colors ${accent.survol}`}
        >
          Voir les offres
          <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
