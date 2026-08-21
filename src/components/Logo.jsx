import { useTheme } from "../context/ThemeContext";

const sources = {
  light: "/digyo-logo-fond-clair.png",
  dark: "/digyo-logo-fond-sombre.png",
};

export default function Logo({ variant = "adaptive", className = "" }) {
  const { theme } = useTheme();
  const src = variant === "light" ? sources.dark : sources[theme];

  return <img src={src} alt="digyo" className={`h-9 w-auto ${className}`} />;
}
