"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/use-theme-store";

function resolveTheme(preference: "system" | "light" | "dark") {
  if (preference !== "system") return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeManager() {
  const preference = useThemeStore((state) => state.preference);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      document.documentElement.dataset.theme = resolveTheme(preference);
      document.documentElement.style.colorScheme = resolveTheme(preference);
    };

    applyTheme();
    media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, [preference]);

  return null;
}
