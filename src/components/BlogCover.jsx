const icons = {
  signal: <path d="M4 20V10 M10 20V4 M16 20v-7 M22 20V8" />,
  layers: <path d="M12 3l9 5-9 5-9-5 9-5Z M3 14l9 5 9-5 M3 8l9 5 9-5" />,
  "layers-up": <path d="M12 4l7 4-7 4-7-4 7-4Z M5 14l7 4 7-4" />,
  compass: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M15 9l-2 5-5 2 2-5 5-2Z" />,
  warning: <path d="M12 3l10 18H2L12 3Z M12 10v4 M12 17h.01" />,
  spark: <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />,
};

const categoryAccent = {
  "Transformation digitale": "lagune",
  "Création web & app": "ambre",
  "Formation & coaching digital": "lagune",
  "Actualités digyo": "ambre",
};

const accentGradients = {
  lagune: "from-lagune/25 via-lagune/10 to-transparent",
  ambre: "from-ambre/25 via-ambre/10 to-transparent",
};

const accentIconColor = {
  lagune: "text-lagune-panel-dark",
  ambre: "text-ambre-dark",
};

export default function BlogCover({ icon = "signal", category, image, className = "" }) {
  const accent = categoryAccent[category] || "lagune";

  if (image) {
    return (
      <div className={`overflow-hidden bg-panel ${className}`}>
        <img src={image} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-panel ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${accentGradients[accent]}`} />
      <svg
        viewBox="0 0 24 24"
        className={`relative h-12 w-12 ${accentIconColor[accent]}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icons[icon] || icons.signal}
      </svg>
    </div>
  );
}
