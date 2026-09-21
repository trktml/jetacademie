import { createLucideIcon, type LucideIcon } from "lucide-react";

/**
 * Esmâü'l-Hüsnâ İkonu (Kalp ve Sonsuzluk Motifi)
 * Esmâ kategorisi için özel tasarlanmış belirgin, canlı kırmızı dolgulu kalp ve zarif sonsuzluk motifi.
 * Kalp motifi, sonsuzluk sembolünden ferah bir boşlukla ayrılarak üst kısımda dengelenmiştir.
 * Lucide standartları (24x24 viewBox, currentColor stroke) ile tam uyumludur.
 */
export const EsmaIcon: LucideIcon = createLucideIcon("Esma", [
  // Üstte yer alan kırmızı dolgulu, belirgin kalp motifi (sonsuzluktan ayrı, dengeli boşluklu)
  [
    "path",
    {
      d: "M 12 2.6 C 10.8 0.9 8.6 0.7 7.2 2.3 C 5.8 3.9 7.0 6.6 12 9.6 C 17.0 6.6 18.2 3.9 16.8 2.3 C 15.4 0.7 13.2 0.9 12 2.6 Z",
      fill: "#ef4444",
      stroke: "#dc2626",
      strokeWidth: "1.2",
      strokeLinejoin: "round",
      key: "esma-heart",
    },
  ],
  // Altta yer alan açık sonsuzluk (ribbon) kıvrımı
  [
    "path",
    {
      d: "M 10.4 14.0 C 9.2 12.6 7.6 11.6 6.2 11.6 C 3.8 11.6 2.0 13.4 2.0 15.6 C 2.0 17.8 3.8 20.4 5.9 20.4 C 8.2 20.4 10.4 18.2 12.0 16.0 C 13.6 13.8 15.8 11.6 17.4 11.6 C 19.8 11.6 22.0 13.4 22.0 15.6 C 22.0 17.8 19.8 20.4 17.0 20.4 C 15.4 20.4 14.2 19.4 13.5 17.8",
      fill: "none",
      stroke: "currentColor",
      key: "esma-infinity",
    },
  ],
]);
