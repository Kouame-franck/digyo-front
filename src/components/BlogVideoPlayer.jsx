import { useEffect, useRef, useState } from "react";

// Lecteur de la vidéo principale d'un article. Le cadre prend le format réel de la vidéo
// (verticale 9:16 pour les contenus pensés smartphone, horizontale sinon) au lieu d'un
// bandeau recadré, et ne dépasse jamais 85 % de la hauteur d'écran.
// Les navigateurs n'autorisent la lecture automatique que sans le son : la vidéo démarre
// muette dès qu'elle est à moitié visible, un bouton propose d'activer le son. Elle se met
// en pause quand on la fait défiler hors de l'écran et reprend au retour, sauf si le
// visiteur l'a lui-même mise en pause.
// Le bouton « Télécharger » du lecteur natif et le clic droit (« Enregistrer la vidéo sous »)
// sont désactivés : simple frein, le fichier reste public sur le CDN.
export default function BlogVideoPlayer({ src }) {
  const videoRef = useRef(null);
  const pausedByScroll = useRef(false);
  const startedOnce = useRef(false);
  const [ratio, setRatio] = useState(16 / 9);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!startedOnce.current || pausedByScroll.current) {
            startedOnce.current = true;
            pausedByScroll.current = false;
            video.play().catch(() => {});
          }
        } else if (!video.paused) {
          pausedByScroll.current = true;
          video.pause();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  const enableSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {});
  };

  return (
    <div className="bg-black">
      <div
        className="relative mx-auto"
        style={{ aspectRatio: ratio, width: `min(100%, calc(85svh * ${ratio}))` }}
      >
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-contain"
          muted
          playsInline
          controls
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
          preload="metadata"
          onLoadedMetadata={(e) => {
            const { videoWidth, videoHeight } = e.currentTarget;
            if (videoWidth && videoHeight) setRatio(videoWidth / videoHeight);
          }}
          onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
        />
        {muted && (
          <button
            type="button"
            onClick={enableSound}
            className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-black/75"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5Z M23 9l-6 6 M17 9l6 6" />
            </svg>
            Activer le son
          </button>
        )}
      </div>
    </div>
  );
}
