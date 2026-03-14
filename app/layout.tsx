import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import SchemaMarkup from "@/components/SchemaMarkup";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Phonective — Cek Kesehatan HP Langsung dari Browser",
    template: "%s | Phonective",
  },
  description:
    "Platform diagnostik smartphone online. Cek layar, speaker, mikrofon, kamera, sensor, dan lebih banyak lagi langsung dari browser tanpa install aplikasi.",
  keywords: [
    "cek hp bekas",
    "tes layar hp",
    "dead pixel checker",
    "speaker test",
    "kamera test",
    "diagnostik smartphone",
    "phonective",
  ],
  authors: [{ name: "Phonective" }],
  creator: "Phonective",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://phonective.app",
    siteName: "Phonective",
    title: "Phonective — Cek Kesehatan HP Langsung dari Browser",
    description:
      "Tools diagnostik smartphone online. Cek kondisi HP sebelum beli atau jual tanpa install aplikasi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phonective — Cek Kesehatan HP",
    description: "Tools diagnostik smartphone langsung dari browser.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script defer data-domain="phonective.app" src="https://plausible.io/js/script.js"></script>
      </head>
      <body className={inter.variable}>
        <SchemaMarkup />
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <PWAInstallPrompt />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
