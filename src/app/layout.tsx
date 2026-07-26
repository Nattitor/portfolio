import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Freddy Guerra | Web Developer",
  description: "Portfolio of Freddy Guerra, Web Developer based in Merlo, Buenos Aires, Argentina.",
};

import { I18nProvider } from "@/context/I18nContext";
import { ConsoleEasterEgg } from "@/components/ui/ConsoleEasterEgg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-body bg-darkBg text-zinc-100 antialiased select-none overflow-x-hidden max-w-[100vw] selection:bg-accentCyan selection:text-black">
        {/* Noise Overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none mix-blend-overlay">
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
        {/* Vignette / Radial Gradient */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]" />

        <I18nProvider>
          <ConsoleEasterEgg />
          <Navbar />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
