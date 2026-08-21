import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-panel text-on-panel hover:opacity-90 focus-visible:outline-panel",
  accent:
    "bg-lagune text-white hover:bg-lagune-dark focus-visible:outline-lagune",
  ghost:
    "bg-transparent text-ink border border-ink/20 hover:border-ink/50 focus-visible:outline-ink",
  ghostLight:
    "bg-transparent text-on-panel border border-on-panel/30 hover:border-on-panel/60 focus-visible:outline-on-panel",
};

export default function Button({
  as,
  to,
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
