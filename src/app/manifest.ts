import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JetAcademie | Müfredat Takibi",
    short_name: "JetAcademie",
    description: "Aylık ve haftalık manevi gelişim müfredatı ve ilerleme takibi.",
    start_url: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#07111d",
    theme_color: "#07111d",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
