"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import type { Song, PlaylistState, LyricData } from "@/lib/types"
import { loadLRCFile } from "@/lib/utils/lrcParser"

const defaultSongs: Song[] = [
  
  {
    id: "Love Story",
    title: "Love Story",
    artist: "Indila",
    lrcFile: "/lyrics/Love_Story_Indila.lrc",
    audioFile: "/sound/Love_Story_Indila.mp3"
  },

  {
    id: "Next To You",
    title: "Next To You",
    artist: "Parasyte",
    lrcFile: "/lyrics/Next_To_You_Parasyte.lrc",
    audioFile: "/sound/Next_To_You_Parasyte.mp3"
  },

  {
    id: "Flowers",
    title: "Flowers",
    artist: "Christian Basso & Haien Qiu",
    audioFile: "/sound/Flowers_Christian_Basso_&_Haien_Qiu.mp3",
    lrcFile: "/lyrics/Flowers_Christian_Basso_&_Haien_Qiu.lrc",
  },
/*   {
    id: "Il bambino che contava le stelle",
    title: "Il bambino che contava le stelle",
    artist: "Ultimo",
    audioFile: "/sound/Il_bambino_che_contava_le_stelle_Ultimo.mp3",
    lrcFile: "/lyrics/Esp_Il_bambino_che_contava_le_stelle_Ultimo.lrc",
  },
  {
    id: "Flaca",
    title: "Flaca",
    artist: "Andrés Calamaro",
    audioFile: "/sound/Flaca_Andres_Calamaro.mp3",
    lrcFile: "/lyrics/Flaca_Andres_Calamaro.lrc",
  }, */
]

export function usePlaylist(audioRef: React.RefObject<HTMLAudioElement>) {
  const [playlist, setPlaylist] = useState<PlaylistState>({
    songs: defaultSongs,
    currentIndex: 0,
    currentSong: defaultSongs[0] || null,
    isPlaying: false,
    isLoading: false,
  })

  const [currentLyrics, setCurrentLyrics] = useState<LyricData[]>([])
  const [hasValidAudio, setHasValidAudio] = useState(false)
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Carga las letras del tema que toque
  const loadCurrentLyrics = useCallback(async (song: Song) => {
    setPlaylist((prev) => ({ ...prev, isLoading: true }))

    try {
      // console.log("Cargando letras desde:", song.lrcFile) // Para debug
      const lyrics = await loadLRCFile(song.lrcFile)
      // console.log("Letras cargadas:", lyrics) // Para debug
      setCurrentLyrics(lyrics)
    } catch (error) {
      console.error("Error loading lyrics:", error)
      setCurrentLyrics([])
    } finally {
      // Pa' que no parpadee el load, espera un toque
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
      loadingTimeoutRef.current = setTimeout(() => {
        setPlaylist((prev) => ({ ...prev, isLoading: false }))
      }, 300)
    }
  }, [])

  // Cambia la rola, y si toca, la pone a sonar
  const changeSong = useCallback(
    async (index: number, shouldAutoPlay = false) => {
      if (index < 0 || index >= playlist.songs.length) return

      const newSong = playlist.songs[index]
      const wasPlaying = playlist.isPlaying

      // Paramos la que estaba sonando
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      setPlaylist((prev) => ({
        ...prev,
        currentIndex: index,
        currentSong: newSong,
        isPlaying: false,
      }))

      // Traemos las letras nuevas
      await loadCurrentLyrics(newSong)

      // Ponemos la nueva fuente de audio
      if (audioRef.current) {
        audioRef.current.src = newSong.audioFile
        audioRef.current.load()

        // La reproducimos si tocaba o si se pidió
        if (shouldAutoPlay || wasPlaying) {
          // Esperamos que esté listo pa’ tocar
          const playWhenReady = () => {
            audioRef.current?.play().catch(console.error)
          }

          if (audioRef.current.readyState >= 2) {
            playWhenReady()
          } else {
            audioRef.current.addEventListener("canplay", playWhenReady, { once: true })
          }
        }
      }
    },
    [playlist.songs, playlist.isPlaying, audioRef, loadCurrentLyrics],
  )

  // Pasar a la próxima rola con onda
  const nextSong = useCallback(() => {
    const nextIndex = (playlist.currentIndex + 1) % playlist.songs.length
    const wasPlaying = playlist.isPlaying
    changeSong(nextIndex, wasPlaying)
  }, [playlist.currentIndex, playlist.songs.length, playlist.isPlaying, changeSong])

  // Volver a la rola anterior sin perder el ritmo
  const previousSong = useCallback(() => {
    const prevIndex = playlist.currentIndex === 0 ? playlist.songs.length - 1 : playlist.currentIndex - 1
    const wasPlaying = playlist.isPlaying
    changeSong(prevIndex, wasPlaying)
  }, [playlist.currentIndex, playlist.songs.length, playlist.isPlaying, changeSong])

  // Pa’ pausar o reproducir
  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !hasValidAudio) return

    if (playlist.isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(console.error)
    }
  }, [audioRef, hasValidAudio, playlist.isPlaying])

  // Escuchar qué pasa con el audio
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setPlaylist((prev) => ({ ...prev, isPlaying: true }))
    const handlePause = () => setPlaylist((prev) => ({ ...prev, isPlaying: false }))
    const handleLoadedData = () => {
      console.log("Audio cargado y listo para reproducir")
      setHasValidAudio(true)
    }
    const handleError = () => {
      console.error("Error al cargar el audio")
      setHasValidAudio(false)
    }
    const handleEnded = () => {
      setPlaylist((prev) => ({ ...prev, isPlaying: false }))
      // Cuando termina, pasa a la próxima rola
      nextSong()
    }

    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("loadeddata", handleLoadedData)
    audio.addEventListener("error", handleError)
    audio.addEventListener("ended", handleEnded)

    // Establecer hasValidAudio a true si el audio ya está cargado
    if (audio.readyState >= 2) {
      console.log("Audio ya está listo al montar el componente")
      setHasValidAudio(true)
    }

    return () => {
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("loadeddata", handleLoadedData)
      audio.removeEventListener("error", handleError)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [audioRef, nextSong])

  // Al montar, cargar letras iniciales y configurar audio
  useEffect(() => {
    if (playlist.currentSong) {
      loadCurrentLyrics(playlist.currentSong)

      // Asegurarse de que el audio esté configurado correctamente
      if (audioRef.current) {
        audioRef.current.src = playlist.currentSong.audioFile
        audioRef.current.load()

        // Verificar si el audio ya está listo
        if (audioRef.current.readyState >= 2) {
          setHasValidAudio(true)
        }
      }
    }
  }, [playlist.currentSong, loadCurrentLyrics, audioRef])

  // Limpiar timers al final
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [])

  return {
    playlist,
    currentLyrics,
    hasValidAudio,
    changeSong,
    nextSong,
    previousSong,
    togglePlayPause,
  }
}
