export default function HeroIllustration() {
  return (
    <div
      className="relative mx-auto h-[280px] w-full max-w-sm md:h-[380px] md:max-w-md"
      aria-hidden="true"
    >
      <span className="absolute left-2 top-6 h-2 w-2 rounded-full bg-lagune/50 animate-pulse motion-reduce:animate-none" />
      <span className="absolute right-8 top-2 h-1.5 w-1.5 rounded-full bg-ambre/60 animate-pulse motion-reduce:animate-none [animation-delay:0.6s]" />
      <span className="absolute bottom-10 left-0 h-1.5 w-1.5 rounded-full bg-lagune/40 animate-pulse motion-reduce:animate-none [animation-delay:1.1s]" />

      {/* Visuel principal. Remplace l'ancienne maquette de navigateur dessinée en CSS : une
          photo réelle porte mieux le propos qu'un faux site. Pour changer d'image, il suffit
          de remplacer le fichier ci-dessous par /tech2.png. */}
      <div className="animate-float absolute left-1/2 top-6 w-[86%] -translate-x-1/2 rotate-2 overflow-hidden rounded-2xl border border-ink/10 shadow-sm shadow-ink/5">
        <img
          src="/tech1.png"
          alt=""
          width="612"
          height="408"
          loading="eager"
          decoding="async"
          draggable="false"
          className="block h-full w-full object-cover"
        />
      </div>

      {/* Badge croissance */}
      <div className="animate-float-delayed absolute bottom-4 left-0 flex -rotate-3 items-center gap-2 rounded-2xl bg-panel px-4 py-3 text-on-panel shadow-sm shadow-ink/10">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ambre/20 text-sm font-bold text-ambre">
          ↑
        </span>
        <div>
          <p className="text-[11px] uppercase tracking-wide text-on-panel/60">
            Croissance
          </p>
          <p className="font-display text-sm font-bold">+42% trafic</p>
        </div>
      </div>

      {/* Badge livraison */}
      <div className="animate-float absolute bottom-16 right-0 flex rotate-3 items-center gap-2 rounded-2xl border border-ink/10 bg-surface px-4 py-2.5 shadow-sm shadow-ink/10 [animation-delay:0.8s]">
        <span className="h-2 w-2 rounded-full bg-lagune animate-pulse motion-reduce:animate-none" />
        <p className="text-xs font-semibold text-ink/80">Projet livré ✓</p>
      </div>
    </div>
  );
}
