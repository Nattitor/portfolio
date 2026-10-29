import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { cookies } from "next/headers";
import { Navbar } from "@/components/layout/Navbar";
import { LyraConstellation } from "@/components/ui/VegaSky";
import { I18nProvider } from "@/context/I18nContext";
import { dictionaries, languageCookie, resolveLanguage } from "@/lib/i18n";
import { portfolioData } from "@/constants/portfolioData";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["500", "600", "700"], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const language = resolveLanguage(cookieStore.get(languageCookie)?.value);
  const { title, description } = dictionaries[language].metadata;
  return {
    metadataBase: new URL(portfolioData.profile.url),
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: { title, description, url: "/", type: "website", locale: language === "es" ? "es_AR" : "en_US" },
    twitter: { card: "summary", title, description },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0e1e",
  viewportFit: "cover",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const language = resolveLanguage(cookieStore.get(languageCookie)?.value);

  return (
    <html lang={language} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="relative isolate font-body antialiased">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] overflow-hidden">
          <div className="vega-starfield absolute inset-0 opacity-25" />
          <LyraConstellation className="absolute top-64 right-[8%] hidden h-80 w-80 text-vegaCyan/30 md:block" />
        </div>
        <I18nProvider initialLanguage={language}>
          <Navbar />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
