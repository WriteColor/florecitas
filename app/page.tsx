"use client"

import { useState } from "react"
import { WelcomePage } from "@/components/WelcomePage"
import { FlowerPage } from "@/components/FlowerPage"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"welcome" | "transition" | "flowers">("welcome")

  // Transición entre páginas
  const handleTransition = () => {
    setCurrentPage("transition")
    // Después de la animación,cambiar a flores
    setTimeout(() => {
      setCurrentPage("flowers")
    }, 1500)
  }

  // Si ya estamos en flores, mostrar esa página
  if (currentPage === "flowers") {
    return <FlowerPage />
  }

  // Sino, mostrar bienvenida con posible transición
  return <WelcomePage onTransition={handleTransition} isTransitioning={currentPage === "transition"} />
}
