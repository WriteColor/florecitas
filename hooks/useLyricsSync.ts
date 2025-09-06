"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import type { LyricData } from "@/lib/types"

export function useLyricsSync(
  audioRef: React.RefObject<HTMLAudioElement>,
  lyricsData: LyricData[],
  isPlaying: boolean,
) {
  const [currentLyric, setCurrentLyric] = useState<string>("")
  const [lyricOpacity, setLyricOpacity] = useState<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Quitamos cualquier intervalo anterior pa’ no hacer bulto
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Solo le metemos si hay letras y la rola está sonando
    if (lyricsData.length === 0 || !isPlaying) {
      setCurrentLyric("")
      setLyricOpacity(0)
      return
    }

    console.log(`Sincronizando letras: ${lyricsData.length} líneas disponibles`)

    const updateLyrics = () => {
      if (!audioRef.current) return

      const currentTime = audioRef.current.currentTime
      // Buscamos qué letra toca pa’ mostrar
      let currentLine: LyricData | null = null

      for (let i = 0; i < lyricsData.length; i++) {
        const line = lyricsData[i]
        const nextLine = lyricsData[i + 1]

        if (currentTime >= line.time && (!nextLine || currentTime < nextLine.time)) {
          currentLine = line
          break
        }
      }

      if (currentLine) {
        console.log(`Mostrando letra: "${currentLine.text}" en tiempo ${currentLine.time.toFixed(2)}s`)

        // Calculamos opacidad pa’ que la letra no salga de volada
        const timeInLine = currentTime - currentLine.time
        const fadeInDuration = 0.3
        const opacity = Math.min(1, timeInLine / fadeInDuration)

        setLyricOpacity(Math.max(0.7, opacity))
        setCurrentLyric(currentLine.text)
      } else {
        setLyricOpacity(0)
        setCurrentLyric("")
      }
    }

    // Actualizamos ya mismo, sin esperar
    updateLyrics()

    // Ponemos intervalo pa’ que vaya actualizando sin perder ritmo
    intervalRef.current = setInterval(updateLyrics, 100) // Más rápido pa’ que pegue justo

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [audioRef, lyricsData, isPlaying])

  // Limpiamos cuando se desmonta, no vaya a quedar regado
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return { currentLyric, lyricOpacity }
}
