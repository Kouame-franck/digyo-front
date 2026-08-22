const icons = {
  graduation: (
    <path d="M4 10l8-4 8 4-8 4-8-4Z M8 12v4.5c0 1.4 1.8 2.5 4 2.5s4-1.1 4-2.5V12 M20 10v6" />
  ),
  grid: (
    <path d="M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z" />
  ),
};

const accentGradients = {
  lagune: "from-lagune/25 via-lagune/10 to-transparent",
  ambre: "from-ambre/25 via-ambre/10 to-transparent",
};

const accentIconColor = {
  lagune: "text-lagune-panel-dark",
  ambre: "text-ambre-dark",
};

export default function SaasCover({ icon = "grid", accent = "lagune", className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-panel ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accentGradients[accent]}`} />
      <svg
        viewBox="0 0 24 24"
        className={`relative h-14 w-14 ${accentIconColor[accent]}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icons[icon] || icons.grid}
      </svg>
    </div>
  );
}
