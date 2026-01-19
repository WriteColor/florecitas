import { useMemo } from "react"
import { translations } from "@/lib/translations"

type TranslationKeys = keyof typeof translations // "es" | "en"

export function useTranslate() {
  const userLang = useMemo<TranslationKeys>(() => {
    if (typeof window !== "undefined") {
      return navigator.language.startsWith("es") ? "es" : "en"
    }
    return "es"
  }, [])

  const t = (path: string): string => {
    const [section, key] = path.split(".")
    // TS ya reconoce que userLang puede indexar translations
    return (translations[userLang] as any)[section]?.[key] ?? path
  }

  return { t, lang: userLang }
}
