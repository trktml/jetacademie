import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d12" },
  ],
};

export const metadata: Metadata = {
  title: "JetAcademie | Manevi Gelişim Müfredatı",
  description:
    "İslami ilimler ve manevi gelişim için kapsamlı müfredat platformu. Akaid, ibadet, ahlâk, siyer, tefsir ve tasavvuf dersleri.",
  applicationName: "JetAcademie",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "JetAcademie",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col selection:bg-rose-950/20 selection:text-rose-950 dark:selection:bg-rose-900/30 dark:selection:text-rose-200">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
