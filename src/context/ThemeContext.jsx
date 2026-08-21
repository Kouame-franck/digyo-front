import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "digyo-theme";
const ThemeContext = createContext(null);

function applyTheme(isDark) {
  document.documentElement.classList.toggle("dark", isDark);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    // Suit le systeme tant que l'utilisateur n'a rien choisi explicitement.
    if (localStorage.getItem(STORAGE_KEY)) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      applyTheme(e.matches);
      setTheme(e.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next === "dark");
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // stockage indisponible (mode privé) -- on continue sans persister
      }
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme doit être utilisé sous ThemeProvider");
  }
  return ctx;
}
