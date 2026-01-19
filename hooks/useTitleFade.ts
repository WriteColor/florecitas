"use client"

import { useState } from "react"

// Hook pa' el fade del título (aunque ahora no se usa mucho XD)
export function useTitleFade() {
  const [titleVisible, setTitleVisible] = useState(true)
  const [titleOpacity, setTitleOpacity] = useState(1)

  // Por ahora solo devuelve valores fijos
  return { titleVisible, titleOpacity }
}
