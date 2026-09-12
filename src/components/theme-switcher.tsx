"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useThemeStore, type ThemePreference } from "@/store/use-theme-store";

const themeOptions = [
  { value: "system", label: "Sistem", icon: Laptop },
  { value: "light", label: "Açık", icon: Sun },
  { value: "dark", label: "Koyu", icon: Moon },
] as const;

export function ThemeSwitcher() {
  const preference = useThemeStore((state) => state.preference);
  const setPreference = useThemeStore((state) => state.setPreference);
  const activeOption =
    themeOptions.find((option) => option.value === preference) ?? themeOptions[0];
  const Icon = activeOption.icon;

  return (
    <label className="theme-switcher" title={`Tema: ${activeOption.label}`}>
      <Icon aria-hidden="true" />
      <span className="sr-only">Tema</span>
      <select
        aria-label="Tema seçimi"
        value={preference}
        onChange={(event) => setPreference(event.target.value as ThemePreference)}
      >
        {themeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
