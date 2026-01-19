"use client"

import { NightBackground } from "./NightBackground"
import { useTranslate } from "@/hooks/useTranslate"

interface WelcomePageProps {
  onTransition: () => void
  isTransitioning: boolean
}

export function WelcomePage({ onTransition, isTransitioning }: WelcomePageProps) {
  const { t } = useTranslate()

  return (
    <div className="welcome-container">
      <div className={`welcome-content ${isTransitioning ? "welcome-content--exit" : ""}`}>
        <div className="greetings">
          <span>{t("welcome.hi")}</span>
        </div>
        <div className="description">
          <span>{t("welcome.desc")}</span>
        </div>
        <div className="button">
          <button onClick={onTransition} className="botones" disabled={isTransitioning}>
            {t("welcome.button")}
          </button>
        </div>
      </div>
      <NightBackground />
    </div>
  )
}
