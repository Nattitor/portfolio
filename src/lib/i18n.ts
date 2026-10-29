import en from "@/locales/en.json";
import es from "@/locales/es.json";

export type Language = "en" | "es";
export type Dictionary = typeof en;

export const languageCookie = "portfolio-lang";
export const dictionaries: Record<Language, Dictionary> = { en, es };

export function resolveLanguage(value?: string): Language {
  return value === "en" ? "en" : "es";
}
