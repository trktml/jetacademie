import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import { AppHeader } from "@/components/app-header";
import { BottomNav } from "@/components/bottom-nav";
import { ThemeManager } from "@/components/theme-manager";
import { ThemeScript } from "@/components/theme-script";
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
    { media: "(prefers-color-scheme: light)", color: "#f4f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#07111d" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "JetAcademie | Müfredat Takibi",
    template: "%s | JetAcademie",
  },
  description:
    "Aylık ve haftalık manevi gelişim müfredatınızı sırayla takip edin, okuduklarınızı kaydedin.",
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
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <QueryProvider>
          <ThemeManager />
          <div className="app-frame">
            <AppHeader />
            {children}
            <BottomNav />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
