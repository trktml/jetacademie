import { createLucideIcon, type LucideIcon } from "lucide-react";

/**
 * Gonca Gül (Rosebud) İkonu
 * Peygamber Efendimiz (s.a.v.) kategorisi için özel tasarlanmış zarif gonca gül motifi.
 * Lucide standartları (24x24 viewBox, 2px stroke, currentColor) ile tam uyumludur.
 */
export const GoncaGulIcon: LucideIcon = createLucideIcon("GoncaGul", [
  // Arka taç yaprak (açık gül kırmızısı - #dd6472)
  [
    "path",
    {
      d: "M8.1 0.63 L6.54 6.78 L6.54 7.35 L6.69 8.22 L7.02 9.15 L7.35 9.75 L7.86 10.44 L8.58 11.13 L9.39 11.67 L10.47 12.12 L11.37 12.3 L12.66 12.3 L13.65 12.09 L14.13 11.91 L14.73 11.61 L15.57 11.01 L16.14 10.44 L16.59 9.84 L17.04 9 L17.19 8.61 L17.37 7.95 L17.46 7.38 L17.46 6.75 L15.93 0.69 L14.91 1.71 L13.65 2.67 L13.53 2.7 L13.17 2.4 L12.6 2.04 L11.37 1.47 L9.66 0.93 L8.43 0.66 Z",
      fill: "#dd6472",
      stroke: "none",
      key: "rose-petal-back",
    },
  ],
  // Ön taç yaprak (canlı gül kırmızısı - #d1525c)
  [
    "path",
    {
      d: "M15.93 0.69 L15.15 1.5 L13.95 2.46 L12.6 3.36 L11.04 4.29 L9.3 5.52 L8.49 6.21 L7.86 6.84 L7.11 7.83 L6.78 8.52 L7.17 9.45 L7.53 10.02 L7.86 10.44 L8.58 11.13 L9.09 11.49 L9.96 11.94 L10.95 12.24 L12.15 12.33 L13.2 12.21 L14.13 11.91 L14.73 11.61 L15.15 11.34 L15.57 11.01 L16.14 10.44 L16.59 9.84 L17.04 9 L17.25 8.43 L17.46 7.38 L17.46 6.75 Z",
      fill: "#d1525c",
      stroke: "none",
      key: "rose-petal-front",
    },
  ],
  // Çiçek sapı ve yeşil yapraklar (zümrüt yeşili - #1daa6a)
  [
    "path",
    {
      d: "M16.77 13.29 L16.26 13.26 L15.27 13.41 L14.49 13.65 L14.01 13.89 L13.29 14.49 L12.9 14.94 L12.51 15.51 L12.48 12.36 L11.46 12.36 L11.43 17.97 L11.07 17.49 L10.59 16.98 L10.2 16.68 L9.66 16.41 L8.97 16.17 L8.07 15.99 L7.29 15.96 L7.08 15.99 L6.93 16.08 L6.93 16.2 L7.02 16.38 L7.23 16.65 L7.92 17.34 L8.82 18.06 L9.24 18.33 L10.11 18.72 L10.98 18.99 L11.37 19.05 L11.46 19.11 L11.46 23.1 A0.51 0.51 0 0 0 12.48 23.1 L12.48 16.71 L13.56 16.32 L14.4 15.9 L15.15 15.42 L16.05 14.55 L16.35 14.19 L16.83 13.44 L16.83 13.32 Z",
      fill: "#1daa6a",
      stroke: "none",
      key: "rose-stem-leaves",
    },
  ],
]);
