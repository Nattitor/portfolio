import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { I18nProvider } from "@/context/I18nContext";
import { ConsoleEasterEgg } from "@/components/ui/ConsoleEasterEgg";
import { LyraConstellation, ShootingStar } from "@/components/ui/VegaSky";
import { cookies } from "next/headers";
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
  metadataBase: new URL("https://nattitor-portfolio.vercel.app"),
  title: "Freddy Guerra | Web Developer",
  description: "Portfolio of Freddy Guerra, Web Developer based in Merlo, Buenos Aires, Argentina.",
};

export const viewport: Viewport = {
  themeColor: "#0A0E1E",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("portfolio-lang")?.value as "en" | "es") || "es";

  return (
    <html lang={lang} className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-body bg-nightBg text-paper antialiased select-none selection:bg-vegaBlue/70 selection:text-paper">
        {/* Vega sky: starfield + Lyra constellation */}
        <div aria-hidden="true" className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 vega-starfield opacity-50" />
          <LyraConstellation className="absolute right-[7%] top-20 h-52 w-52 text-vegaCyan/40 md:h-72 md:w-72" />
          <ShootingStar />
        </div>
        {/* Noise Overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none mix-blend-overlay">
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <I18nProvider initialLanguage={lang}>
          <ConsoleEasterEgg />
          <Navbar />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
