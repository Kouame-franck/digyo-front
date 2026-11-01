import { useEffect, useState } from "react";
import { trackEvent } from "../../lib/analytics";

// Téléchargement de l'appli de caisse digyo-pos (Windows). La version publiée est lue dans le
// latest.yml que lit aussi la mise à jour automatique de l'appli : le bouton suit chaque nouvelle
// version sans redéployer le site. Si ce fichier est injoignable (réseau, CORS), on propose la
// version connue au moment de la construction du site.
const DEPOT = "https://pos.digyo.pro/mises-a-jour/";
const REPLI = { version: "0.2.3", fichier: "digyo-pos-caisse-0.2.3.exe", taille: 121892788, date: "2026-11-01" };

function lireLatestYml(texte) {
  const champ = (cle) => texte.match(new RegExp(`^${cle}:\\s*'?([^'\\n]+)'?`, "m"))?.[1]?.trim();
  const taille = Number(texte.match(/^\s+size:\s*(\d+)/m)?.[1]);
  const version = champ("version");
  const fichier = champ("path");
  if (!version || !fichier) return null;
  return { version, fichier, taille: Number.isFinite(taille) ? taille : null, date: champ("releaseDate")?.slice(0, 10) || null };
}

const mo = (octets) => `${Math.round(octets / 1024 / 1024)} Mo`;
const dateFr = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default function TelechargementCaisse() {
  const [publiee, setPubliee] = useState(REPLI);

  useEffect(() => {
    let annule = false;
    fetch(`${DEPOT}latest.yml`, { cache: "no-store" })
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((t) => {
        const v = lireLatestYml(t);
        if (v && !annule) setPubliee(v);
      })
      .catch(() => {});
    return () => {
      annule = true;
    };
  }, []);

  const etapes = [
    "Téléchargez et lancez l'installateur sur l'ordinateur de caisse.",
    "Dans votre espace de gestion, Paramètres › Postes, créez un code d'appairage pour ce poste.",
    "Saisissez ce code dans l'appli : la caisse est reliée à votre boutique, les caissiers se connectent par PIN.",
  ];

  return (
    <section id="telecharger" className="scroll-mt-20 border-y border-ink/10 bg-surface py-20">
      <div className="container-page grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-lagune-dark">Appli de caisse</span>
          <h2 className="mt-3 font-display text-2xl font-bold text-ink md:text-4xl">Téléchargez la caisse digyo-pos</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-ink/70">
            L'appli s'installe sur les ordinateurs de caisse et se met à jour toute seule. La gestion (articles, stock,
            achats, rapports) se fait depuis n'importe quel navigateur, sur{" "}
            <a href="https://pos.digyo.pro" className="font-semibold text-lagune-dark underline-offset-2 hover:underline">
              pos.digyo.pro
            </a>
            .
          </p>
          <ol className="mt-8 space-y-4">
            {etapes.map((e, i) => (
              <li key={e} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-lagune/15 font-display text-sm font-bold text-lagune-dark">
                  {i + 1}
                </span>
                <span className="pt-1 text-sm leading-relaxed text-ink/75">{e}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-canvas p-6 md:p-8">
          <div className="flex items-center gap-4">
            <img src="/digyo-pos/digyo-pos-symbole-moyen-couleur.svg" alt="" className="h-14 w-14 rounded-xl bg-white p-2 ring-1 ring-ink/10" />
            <div>
              <p className="font-display text-lg font-bold text-ink">digyo-pos Caisse</p>
              <p className="text-sm text-ink/60">
                Version {publiee.version}
                {publiee.date && ` · ${dateFr(publiee.date)}`}
              </p>
            </div>
          </div>

          <a
            href={`${DEPOT}${encodeURIComponent(publiee.fichier)}`}
            onClick={() => trackEvent("telechargement_caisse", { product: "digyo-pos", version: publiee.version })}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-lagune px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-lagune/25 transition-colors hover:bg-lagune-hover"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M10 3v10 M6 9l4 4 4-4 M4 16h12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Télécharger pour Windows{publiee.taille ? ` · ${mo(publiee.taille)}` : ""}
          </a>

          <dl className="mt-6 space-y-2 text-sm">
            {[
              ["Système", "Windows 10 ou 11, 64 bits"],
              ["Mises à jour", "Automatiques, au démarrage"],
              ["Utilisation", "Compte digyo-pos et code d'appairage"],
            ].map(([t, d]) => (
              <div key={t} className="flex justify-between gap-4 border-b border-ink/5 pb-2 last:border-0">
                <dt className="text-ink/55">{t}</dt>
                <dd className="text-right font-medium text-ink">{d}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 rounded-lg bg-ambre/10 px-4 py-3 text-xs leading-relaxed text-ink/70">
            Au premier lancement, Windows peut afficher « Windows a protégé votre ordinateur ». Cliquez sur{" "}
            <strong className="text-ink">Informations complémentaires</strong>, puis{" "}
            <strong className="text-ink">Exécuter quand même</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
