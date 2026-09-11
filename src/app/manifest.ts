import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JetAcademie | Modern Full-Stack Starter",
    short_name: "JetAcademie",
    description:
      "Next.js, Bun, Tailwind CSS v4, Zustand, TanStack Query, Zod, Better-Auth, and Docker/Dokploy production starter.",
    start_url: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#0b0d12",
    theme_color: "#0b0d12",
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
